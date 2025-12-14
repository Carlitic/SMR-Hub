/**
 * HomePage.tsx
 * 
 * PROPÓSITO:
 * Página de aterrizaje (Landing Page) que ve todo el mundo al entrar.
 * 
 * CONTENIDO:
 * - Sección Hero: Título grande, botones de llamada a la acción.
 * - Grid de Módulos (Cards): Resumen visual de las asignaturas.
 * - Sección "Por qué elegirnos": Marketing.
 * 
 * ESTILO:
 * Usa muchas clases de Tailwind para diseño responsivo y efectos visuales (fondos, gradientes).
 */

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, Server, Cpu, Wifi, BookOpen, Terminal, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden bg-background">
                <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                </div>

                <div className="container relative z-10 flex flex-col items-center text-center gap-8">
                    <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                        <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                        Sistemas Microinformáticos y Redes
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl">
                        Tu Camino al Éxito <br />
                        en <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">SMR</span>
                    </h1>

                    <p className="max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
                        Domina el montaje de equipos, redes, seguridad y sistemas operativos.
                        Una plataforma integral diseñada por y para estudiantes.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Link to="/modulos">
                            <Button size="lg" className="h-12 px-8 text-lg gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                                Empezar Ahora <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button variant="outline" size="lg" className="h-12 px-8 text-lg">
                                Saber más
                            </Button>
                        </Link>
                    </div>

                    {/* Floating Code Visual */}
                    <div className="mt-12 w-full max-w-3xl rounded-xl border bg-card/50 backdrop-blur shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/50">
                            <div className="flex gap-1.5">
                                <div className="h-3 w-3 rounded-full bg-red-500" />
                                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                                <div className="h-3 w-3 rounded-full bg-green-500" />
                            </div>
                            <div className="mx-auto text-xs font-mono text-muted-foreground">terminal.tsx</div>
                        </div>
                        <div className="p-6 text-left font-mono text-sm sm:text-base overflow-x-auto">
                            <div className="text-pink-500">import <span className="text-foreground">Skills</span> from <span className="text-green-500">'./SMR-Hub'</span></div>
                            <br />
                            <div className="text-blue-500">const <span className="text-yellow-500">student</span> = <span className="text-purple-500">await</span> Skills.learn({'{'}</div>
                            <div className="pl-4 text-foreground">modules: [<span className="text-green-500">'MME'</span>, <span className="text-green-500">'SOM'</span>, <span className="text-green-500">'RL'</span>, <span className="text-green-500">'SOR'</span>],</div>
                            <div className="pl-4 text-foreground">tools: [<span className="text-green-500">'Hardware'</span>, <span className="text-green-500">'Linux'</span>, <span className="text-green-500">'Cisco'</span>]</div>
                            <div className="text-foreground">{'}'})</div>
                            <br />
                            <div className="text-foreground"><span className="text-blue-500">console</span>.log(<span className="text-green-500">"¡Futuro Técnico!"</span>)</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-muted/30">
                <div className="container">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Todo lo que necesitas aprender</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Estructurado en módulos oficiales para cubrir todo el currículo formativo.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card className="group hover:shadow-lg transition-all hover:border-primary/50 cursor-default bg-background/60 backdrop-blur">
                            <CardHeader>
                                <Cpu className="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform" />
                                <CardTitle>Montaje de Equipos</CardTitle>
                                <CardDescription>Hardware y Mantenimiento</CardDescription>
                            </CardHeader>
                            <CardContent>
                                Aprende a ensamblar ordenadores, diagnosticar averías y conocer cada componente al detalle.
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-lg transition-all hover:border-primary/50 cursor-default bg-background/60 backdrop-blur">
                            <CardHeader>
                                <Server className="h-10 w-10 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                                <CardTitle>Sistemas Operativos</CardTitle>
                                <CardDescription>Windows y Linux</CardDescription>
                            </CardHeader>
                            <CardContent>
                                Administración de sistemas monopuesto. Comandos, usuarios, permisos y configuración.
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-lg transition-all hover:border-primary/50 cursor-default bg-background/60 backdrop-blur">
                            <CardHeader>
                                <Wifi className="h-10 w-10 text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                                <CardTitle>Redes Locales</CardTitle>
                                <CardDescription>Infraestructuras de Red</CardDescription>
                            </CardHeader>
                            <CardContent>
                                Diseño de LANs, cableado estructurado, TCP/IP, direccionamiento y configuración de routers.
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-lg transition-all hover:border-primary/50 cursor-default bg-background/60 backdrop-blur">
                            <CardHeader>
                                <Shield className="h-10 w-10 text-red-500 mb-2 group-hover:scale-110 transition-transform" />
                                <CardTitle>Seguridad</CardTitle>
                                <CardDescription>Protección y Ciberseguridad</CardDescription>
                            </CardHeader>
                            <CardContent>
                                Hacking ético básico, protección de datos, antivirus y copias de seguridad.
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-lg transition-all hover:border-primary/50 cursor-default bg-background/60 backdrop-blur">
                            <CardHeader>
                                <BookOpen className="h-10 w-10 text-orange-500 mb-2 group-hover:scale-110 transition-transform" />
                                <CardTitle>Aplicaciones Web</CardTitle>
                                <CardDescription>Ofimática y Web</CardDescription>
                            </CardHeader>
                            <CardContent>
                                Uso avanzado de suites ofimáticas, gestores de correo y publicación de contenidos web.
                            </CardContent>
                        </Card>

                        <Card className="group hover:shadow-lg transition-all hover:border-primary/50 cursor-default bg-background/60 backdrop-blur">
                            <CardHeader>
                                <Terminal className="h-10 w-10 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
                                <CardTitle>Servicios en Red</CardTitle>
                                <CardDescription>Servidores y Servicios</CardDescription>
                            </CardHeader>
                            <CardContent>
                                Configuración de DNS, DHCP, Web, Correo y Transferencia de archivos en servidores.
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 border-t">
                <div className="container md:flex items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight">¿Por qué SMR-Hub?</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                                <div>
                                    <h3 className="font-semibold">Actualizado al día</h3>
                                    <p className="text-muted-foreground text-sm">Contenidos revisados y adaptados a las tecnologías actuales del mercado.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                                <div>
                                    <h3 className="font-semibold">Práctica Interactiva</h3>
                                    <p className="text-muted-foreground text-sm">Tests y actividades prácticas para reforzar lo aprendido, no solo teoría.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                                <div>
                                    <h3 className="font-semibold">Gratis y Accesible</h3>
                                    <p className="text-muted-foreground text-sm">Plataforma Open Source pensada para ayudar a la comunidad educativa.</p>
                                </div>
                            </li>
                        </ul>
                        <div className="pt-4">
                            <Button onClick={() => window.location.href = "/login?mode=register"}>Únete a la Comunidad</Button>
                        </div>
                    </div>
                    <div className="flex-1 mt-10 md:mt-0 relative">
                        <div className="aspect-square rounded-full bg-primary/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-3xl -z-10"></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 pt-8">
                                <div className="rounded-xl bg-card border p-4 shadow-xl -rotate-3 hover:rotate-0 transition-transform duration-500">
                                    <div className="h-20 w-full bg-muted rounded-md mb-3 animate-pulse"></div>
                                    <div className="h-4 w-2/3 bg-muted rounded mb-2"></div>
                                    <div className="h-4 w-1/2 bg-muted rounded"></div>
                                </div>
                                <div className="rounded-xl bg-card border p-4 shadow-xl rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <div className="h-4 w-full bg-muted rounded mb-3"></div>
                                    <div className="h-4 w-full bg-muted rounded mb-3"></div>
                                    <div className="h-20 w-full bg-muted rounded-md animate-pulse"></div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="rounded-xl bg-card border p-4 shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
                                    <div className="h-8 w-8 rounded-full bg-primary/20 mb-3"></div>
                                    <div className="h-4 w-full bg-muted rounded mb-2"></div>
                                    <div className="h-4 w-3/4 bg-muted rounded"></div>
                                </div>
                                <div className="rounded-xl bg-card border p-4 shadow-xl -rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <div className="h-20 w-full bg-primary/10 rounded-md mb-3 flex items-center justify-center text-primary font-bold">100%</div>
                                    <div className="h-4 w-full bg-muted rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
