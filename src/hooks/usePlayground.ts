import { useState } from "react"
import { runPromptAPI } from "../services/playground.api"

export const usePlayground = () => {
    const [model, setModel] = useState("gpt-4")
    const [temperature, setTemperature] = useState(0.7)
    const [tokens, setTokens] = useState(600)
    const [prompt, setPrompt] = useState("")
    const [systemPrompt, setSystemPrompt] = useState("")
    const [userPrompt, setUserPrompt] = useState("")
    const [output, setOutput] = useState("")
    const [loading, setLoading] = useState(false)
    const [isStreaming, setIsStreaming] = useState(false)
    const [evaluation, setEvaluation] = useState<any>(null)

    const streamText = async (text: string) => {
        let result = ""
        setIsStreaming(true)
        for (let i = 0; i < text.length; i++) {
            result += text[i]
            setOutput(result)
            await new Promise((res) => setTimeout(res, 20))
        }
        setIsStreaming(false)
    }

    const handleRun = async () => {
        if (!prompt) return
        setLoading(true)
        setOutput("")
        try {
            const res = await runPromptAPI({ prompt })
            setSystemPrompt(res.systemPrompt)
            setUserPrompt(res.userPrompt)
            await streamText(res.output)
            setEvaluation(res.evaluation)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const reset = () => {
        setPrompt("")
        setSystemPrompt("")
        setUserPrompt("")
        setOutput("")
        setEvaluation(null)
    }

    return {
        model,
        temperature,
        tokens,
        prompt,
        output,
        setOutput,
        setModel,
        setTemperature,
        setTokens,
        setPrompt,
        systemPrompt,
        setSystemPrompt,
        userPrompt,
        setUserPrompt,
        handleRun,
        loading,
        isStreaming,
        evaluation,
        reset
    }
}