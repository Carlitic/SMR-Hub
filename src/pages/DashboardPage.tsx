import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, FolderOpen, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

type Module = {
    id: string
    title: string
    description: string
    created_at: string
}

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth()
    const navigate = useNavigate()
    const [modules, setModules] = useState<Module[]>([])
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [newModule, setNewModule] = useState({ title: "", description: "" })
    const [editingModule, setEditingModule] = useState<Module | null>(null)

    useEffect(() => {
        if (!authLoading && !user) {
            navigate("/login")
            return
        }

        if (user) {
            checkAdminStatus()
            fetchModules()
        }
    }, [user, authLoading])

    const checkAdminStatus = async () => {
        if (!user) return
        const { data } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single()

        if (data && data.role === "admin") {
            setIsAdmin(true)
        } else {
            navigate("/") // Redirect unauthorized users
        }
        setLoading(false)
    }

    const fetchModules = async () => {
        const { data, error } = await supabase
            .from("modules")
            .select("*")
            .order("created_at", { ascending: true })

        if (error) console.error("Error fetching modules:", error)
        else setModules(data || [])
    }

    const handleSaveModule = async () => {
        if (!newModule.title) return

        if (editingModule) {
            // Update existing
            const { error } = await supabase
                .from("modules")
                .update({ title: newModule.title, description: newModule.description })
                .eq("id", editingModule.id)

            if (error) console.error("Error updating:", error)
        } else {
            // Create new
            const { error } = await supabase
                .from("modules")
                .insert([{ title: newModule.title, description: newModule.description }])

            if (error) console.error("Error creating:", error)
        }

        setNewModule({ title: "", description: "" })
        setEditingModule(null)
        setIsDialogOpen(false)
        fetchModules()
    }

    const handleDeleteModule = async (id: string) => {
        if (!confirm("¿Seguro que quieres borrar este módulo? Se borrarán todas sus unidades.")) return;

        const { error } = await supabase.from("modules").delete().eq("id", id)
        if (error) console.error("Error deleting", error)
        else fetchModules()
    }

    const openEditDialog = (module: Module) => {
        setEditingModule(module)
        setNewModule({ title: module.title, description: module.description })
        setIsDialogOpen(true)
    }

    const openNewDialog = () => {
        setEditingModule(null)
        setNewModule({ title: "", description: "" })
        setIsDialogOpen(true)
    }

    if (authLoading || loading) {
        return <div className="flex h-[50vh] items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>
    }

    return (
        <div className="container py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
                    <p className="text-muted-foreground">Gestiona los módulos y contenidos de SMR-Hub.</p>
                </div>
                {isAdmin && (
                    <Dialog open={isDialogOpen} onOpenChange={(open) => {
                        setIsDialogOpen(open)
                        if (!open) {
                            setEditingModule(null)
                            setNewModule({ title: "", description: "" })
                        }
                    }}>
                        <DialogTrigger asChild>
                            <Button onClick={openNewDialog}>
                                <Plus className="mr-2 h-4 w-4" /> Nuevo Módulo
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editingModule ? "Editar Módulo" : "Crear Nuevo Módulo"}</DialogTitle>
                                <DialogDescription>
                                    {editingModule ? "Modifica los datos de la asignatura." : "Añade una nueva asignatura o bloque temático."}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Título</Label>
                                    <Input
                                        id="title"
                                        value={newModule.title}
                                        onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                                        placeholder="ej. Montaje y Mantenimiento de Equipos"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="desc">Descripción</Label>
                                    <Textarea
                                        id="desc"
                                        value={newModule.description}
                                        onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                                        placeholder="Breve descripción de la asignatura..."
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={handleSaveModule}>{editingModule ? "Guardar Cambios" : "Crear Módulo"}</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Módulo</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead className="w-[100px]">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {modules.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center">
                                    No hay módulos creados.
                                </TableCell>
                            </TableRow>
                        ) : (
                            modules.map((module) => (
                                <TableRow key={module.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center">
                                            <FolderOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                                            {module.title}
                                        </div>
                                    </TableCell>
                                    <TableCell>{module.description}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm" onClick={() => navigate(`/dashboard/module/${module.id}`)}>
                                                Gestionar Contenido
                                            </Button>
                                            <Button variant="ghost" size="icon" disabled={!isAdmin} onClick={() => openEditDialog(module)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteModule(module.id)} disabled={!isAdmin}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {!isAdmin && (
                <div className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800 dark:border-yellow-900/50 dark:bg-yellow-900/20 dark:text-yellow-200">
                    <p><strong>Modo Lectura:</strong> No tienes permisos de administrador para editar contenido.</p>
                </div>
            )}
        </div>
    )
}
