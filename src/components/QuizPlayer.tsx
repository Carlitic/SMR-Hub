/**
 * QuizPlayer.tsx
 * 
 * PROPÓSITO:
 * Motor para realizar los exámenes tipo test dentro de la aplicación.
 * 
 * FUNCIONAMIENTO:
 * - Recibe una lista de preguntas (questions) donde cada una tiene opciones y el índice de la correcta.
 * - Muestra una pregunta a la vez.
 * - Permite seleccionar respuesta, comprobar si está bien (feedback inmediato) y pasar a la siguiente.
 * - Al final muestra una pantalla de resumen con la nota.
 */

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

type Question = {
    q: string
    options: string[]
    correct: number
}

interface QuizPlayerProps {
    questions: Question[]
    onComplete: (score: number) => void
}

export function QuizPlayer({ questions, onComplete }: QuizPlayerProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)
    const [score, setScore] = useState(0)
    const [showResults, setShowResults] = useState(false)

    const handleCheck = () => {
        if (selectedAnswer === null) return

        const isCorrect = selectedAnswer === questions[currentQuestion].correct
        if (isCorrect) setScore(s => s + 1)
        setIsAnswered(true)
    }

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1)
            setSelectedAnswer(null)
            setIsAnswered(false)
        } else {
            setShowResults(true)
            onComplete(score + (questions[currentQuestion].correct === selectedAnswer ? 1 : 0))
        }
    }

    const handleRetry = () => {
        setCurrentQuestion(0)
        setSelectedAnswer(null)
        setIsAnswered(false)
        setScore(0)
        setShowResults(false)
    }

    if (showResults) {
        const percentage = Math.round((score / questions.length) * 100)
        return (
            <Card className="max-w-xl mx-auto text-center py-8">
                <CardHeader>
                    <CardTitle className="text-3xl">¡Test Completado!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-6xl font-bold text-primary">{percentage}%</div>
                    <p className="text-muted-foreground">
                        Has acertado {score} de {questions.length} preguntas.
                    </p>
                </CardContent>
                <CardFooter className="justify-center gap-4">
                    <Button onClick={handleRetry} variant="outline">
                        <RotateCcw className="mr-2 h-4 w-4" /> Repetir Test
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    const q = questions[currentQuestion]

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Pregunta {currentQuestion + 1} de {questions.length}</span>
                    <span className="text-sm font-medium">Puntuación: {score}</span>
                </div>
                <CardTitle>{q.q}</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup value={selectedAnswer?.toString()} onValueChange={(v) => !isAnswered && setSelectedAnswer(parseInt(v))}>
                    {q.options.map((option, index) => (
                        <div key={index} className={cn(
                            "flex items-center space-x-2 border p-4 rounded-lg transition-colors",
                            selectedAnswer === index && "border-primary bg-primary/5",
                            isAnswered && index === q.correct && "border-green-500 bg-green-500/10",
                            isAnswered && selectedAnswer === index && selectedAnswer !== q.correct && "border-destructive bg-destructive/10"
                        )}>
                            <RadioGroupItem value={index.toString()} id={`opt-${index}`} disabled={isAnswered} />
                            <Label htmlFor={`opt-${index}`} className="flex-1 cursor-pointer">{option}</Label>
                            {isAnswered && index === q.correct && <CheckCircle className="h-5 w-5 text-green-500" />}
                            {isAnswered && selectedAnswer === index && selectedAnswer !== q.correct && <XCircle className="h-5 w-5 text-destructive" />}
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
            <CardFooter className="justify-end">
                {!isAnswered ? (
                    <Button onClick={handleCheck} disabled={selectedAnswer === null}>Comprobar</Button>
                ) : (
                    <Button onClick={handleNext}>{currentQuestion === questions.length - 1 ? "Ver Resultados" : "Siguiente Pregunta"}</Button>
                )}
            </CardFooter>
        </Card>
    )
}
