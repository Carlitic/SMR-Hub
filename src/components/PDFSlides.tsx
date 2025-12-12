
import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download, Loader2, ZoomIn, ZoomOut } from "lucide-react";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure worker - using standard CDN for Vite compatibility without config hell
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFSlidesProps {
    url: string;
    title?: string;
}

export function PDFSlides({ url }: PDFSlidesProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.0);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    function changePage(offset: number) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    // Reset pagination when URL changes
    useEffect(() => {
        setPageNumber(1);
    }, [url]);

    return (
        <div className="flex flex-col items-center w-full space-y-4">
            {/* Controls Header */}
            <div className="flex flex-wrap items-center justify-between w-full gap-4 p-4 bg-muted/20 rounded-lg border">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Prev
                    </Button>
                    <span className="text-sm font-medium min-w-[100px] text-center">
                        Página {pageNumber} de {numPages || '--'}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={pageNumber >= (numPages || 0)}
                        onClick={nextPage}
                    >
                        Next <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setScale(s => Math.max(0.5, s - 0.1))}>
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-xs text-muted-foreground w-12 text-center">{Math.round(scale * 100)}%</span>
                    <Button variant="ghost" size="icon" onClick={() => setScale(s => Math.min(2.0, s + 0.1))}>
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                </div>

                <a href={url} download target="_blank" rel="noreferrer">
                    <Button variant="secondary" size="sm">
                        <Download className="h-4 w-4 mr-2" /> Descargar PDF
                    </Button>
                </a>
            </div>

            {/* Document Viewer */}
            <div className="w-full flex justify-center bg-gray-100/50 dark:bg-gray-900/50 border rounded-lg p-8 min-h-[500px]">
                <Document
                    file={url}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={
                        <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
                            <Loader2 className="h-8 w-8 animate-spin mb-4" />
                            <p>Cargando presentación...</p>
                        </div>
                    }
                    error={
                        <div className="text-destructive p-8 text-center bg-destructive/10 rounded-lg">
                            <p className="font-semibold">Error al cargar el PDF.</p>
                            <p className="text-sm mt-2">Intenta descargarlo directamente.</p>
                        </div>
                    }
                    className="shadow-xl"
                >
                    <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="border bg-white"
                        width={Math.min(window.innerWidth * 0.7, 800)} // Responsive max width
                    />
                </Document>
            </div>

            {/* Bottom Navigation (Quick access) */}
            <div className="flex justify-center gap-4 w-full">
                <Button
                    variant="ghost"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                >
                    <ChevronLeft className="h-4 w-4 mr-2" /> Anterior
                </Button>
                <Button
                    variant="ghost"
                    disabled={pageNumber >= (numPages || 0)}
                    onClick={nextPage}
                >
                    Siguiente <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}
