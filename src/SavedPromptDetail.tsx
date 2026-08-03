import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useSavedPrompts } from "shell/savedPromptsStore"

type Props = {
    id?: string
    onDeleteSuccess: () => void
}

const SavedPromptDetail = ({ id, onDeleteSuccess }: Props) => {
    const [prompt, setPrompt] = useState<any>(null)

    const savedPrompts = useSavedPrompts((state: any) => state.savedPrompts)
    const removePrompt = useSavedPrompts((state: any) => state.removePrompt)


    useEffect(() => {
        if (!id) return
        const saved = JSON.parse(localStorage.getItem("savedPrompts") || "[]")
        const found = saved.find((p: any) => String(p.id) === String(id))
        setPrompt(found || null)
    }, [id])

    const promptFound = savedPrompts.find((p: any) => p.id === Number(id)) || null

    if (!promptFound) {
        return <div style={{ padding: 20 }}>No prompt found</div>
    }

    const handleDelete = () => {
        removePrompt(Number(id))
        window.dispatchEvent(new Event("savedPromptsUpdated"))
        toast.success("Prompt deleted successfully")
        onDeleteSuccess()
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Saved Prompt</h2>
            <pre>{prompt?.text || ""}</pre>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default SavedPromptDetail