import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "@/components/auth-provider"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Lock, PlayCircle, FileText, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type Unit = {
    id: string
    title: string
    contents: Content[]
}

type Content = {
    id: string
    title: string
    slug: string
    is_free: boolean
}

export default function ModuleDetailPage() {
    const { id } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [units, setUnits] = useState<Unit[]>([])
    const [moduleTitle, setModuleTitle] = useState("")
    const [completedContentIds, setCompletedContentIds] = useState<Set<string>>(new Set())
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) fetchModuleData(id)
    }, [id])

    const fetchModuleData = async (moduleId: string) => {
        // 1. Get Module Info
        const { data: moduleData } = await supabase.from("modules").select("title").eq("id", moduleId).single()
        if (moduleData) setModuleTitle(moduleData.title)

        // 2. Get Units and Contents
        // Note: This requires a join. For simplicity, we fetch units then contents, 
        // or use Supabase relational queries if setup. 
        // Let's do a simple relational query assuming relations are detected, 
        // OR just manual for robustness if relations aren't auto-detected.

        // Attempt relational fetch
        const { data, error } = await supabase
            .from("units")
            .select(`
        id, 
        title, 
        contents (id, title, slug, is_free)
      `)
            .eq("module_id", moduleId)
            .order("order_index", { ascending: true })

        if (error) {
            console.error("Error fetching units:", error)
        } else {
            // Safe cast or mapping if needed
            setUnits(data as any || [])
        }

        // 3. Get User Progress
        if (user) {
            const { data: progressData } = await supabase
                .from("user_progress")
                .select("content_id")
                .eq("user_id", user.id)

            if (progressData) {
                const ids = new Set(progressData.map(p => p.content_id))
                setCompletedContentIds(ids)
            }
        }

        setLoading(false)
    }

    const toggleProgress = async (e: React.MouseEvent, contentId: string) => {
        e.stopPropagation() // Prevent card click
        if (!user) return

        const isCompleted = completedContentIds.has(contentId)
        const newSet = new Set(completedContentIds)

        if (isCompleted) {
            // Remove
            newSet.delete(contentId)
            setCompletedContentIds(newSet) // Optimistic update
            await supabase.from("user_progress").delete().eq("user_id", user.id).eq("content_id", contentId)
        } else {
            // Add
            newSet.add(contentId)
            setCompletedContentIds(newSet) // Optimistic update
            await supabase.from("user_progress").insert([{ user_id: user.id, content_id: contentId }])
        }
    }

    const handleContentClick = (content: Content) => {
        if (!user && !content.is_free) {
            // Show alert overlay or redirect to login
            alert("🔒 Este contenido es exclusivo para usuarios registrados.\n\nPor favor, inicia sesión para continuar.")
            navigate("/login")
            return
        }
        // Navigate to content viewer
        navigate(`/modulos/${id}/lesson/${content.id}`)
    }

    return (
        <div className="container py-8">
            <div className="mb-8">
                <Button variant="outline" onClick={() => navigate("/modulos")} className="mb-4">
                    ← Volver al catálogo
                </Button>
                <h1 className="text-3xl font-bold">{moduleTitle || "Cargando..."}</h1>
            </div>

            <div className="grid gap-6">
                {units.map((unit) => (
                    <div key={unit.id} className="space-y-4">
                        <h2 className="text-xl font-semibold border-b pb-2">{unit.title}</h2>
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                            {unit?.contents?.map((content: any) => (
                                <Card
                                    key={content.id}
                                    className="cursor-pointer hover:border-primary transition-colors group"
                                    onClick={() => handleContentClick(content)}
                                >
                                    <CardContent className="flex items-center justify-between p-4">
                                        <div className="flex items-center gap-3">
                                            {/* Completion Checkbox */}
                                            {user && (
                                                <div
                                                    onClick={(e) => toggleProgress(e, content.id)}
                                                    className={cn(
                                                        "h-8 w-8 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer hover:scale-105 shadow-sm",
                                                        completedContentIds.has(content.id)
                                                            ? "bg-green-100 border-green-500 text-green-600"
                                                            : "bg-background border-muted text-muted-foreground hover:border-primary hover:text-primary"
                                                    )}
                                                    title={completedContentIds.has(content.id) ? "Marcar como no visto" : "Marcar como visto"}
                                                >
                                                    {completedContentIds.has(content.id) && (
                                                        <CheckCircle className="h-5 w-5 fill-current" />
                                                    )}
                                                </div>
                                            )}

                                            <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                                            <span className={cn("font-medium", completedContentIds.has(content.id) && "text-muted-foreground line-through decoration-green-500/50")}>
                                                {content.title}
                                            </span>
                                        </div>
                                        {!user && !content.is_free ? (
                                            <Lock className="h-4 w-4 text-destructive" />
                                        ) : (
                                            <PlayCircle className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                            {(!unit.contents || unit.contents.length === 0) && (
                                <p className="text-sm text-muted-foreground italic col-span-3">No hay contenido en esta unidad.</p>
                            )}
                        </div>
                    </div>
                ))}

                {!loading && units.length === 0 && (
                    <div className="text-center py-10 border rounded-lg bg-muted/20">
                        <p className="text-muted-foreground">Este módulo aún no tiene contenido publicado.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
