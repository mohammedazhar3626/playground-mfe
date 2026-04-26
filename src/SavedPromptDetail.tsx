import { useEffect, useState } from "react"

type Props = {
    id?: string
}

const SavedPromptDetail = ({ id }: Props) => {
    const [prompt, setPrompt] = useState<any>(null)

    useEffect(() => {
        if (!id) return
        const saved = JSON.parse(localStorage.getItem("savedPrompts") || "[]")
        const found = saved.find((p: any) => String(p.id) === String(id))
        setPrompt(found || null)
    }, [id])

    if (!prompt) {
        return <div style={{ padding: 20 }}>No prompt found</div>
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Saved Prompt</h2>
            <pre>{prompt.text}</pre>
        </div>
    )
}

export default SavedPromptDetail