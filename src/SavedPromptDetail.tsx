import { useState } from "react"
import { toast } from "react-toastify"
import { useSavedPrompts } from "shell/savedPromptsStore"
import ConfirmModal from "shell/ConfirmModal"

type Props = {
    id?: string
    onDeleteSuccess: () => void
}

const SavedPromptDetail = ({ id, onDeleteSuccess }: Props) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const savedPrompts = useSavedPrompts((state: any) => state.savedPrompts)
    const removePrompt = useSavedPrompts((state: any) => state.removePrompt)

    const promptFound = id
        ? savedPrompts.find((p: any) => p.id === Number(id)) || null
        : null

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
        <>
            <div style={{ padding: 20 }}>
                <h2>Saved Prompt</h2>
                <pre>{promptFound.text || ""}</pre>
                <button onClick={() => setShowDeleteModal(true)}>Delete</button>
                <ConfirmModal
                    open={showDeleteModal}
                    title="Confirm Delete"
                    message="Are you sure you want to delete this prompt?"
                    confirmText="Delete"
                    cancelText="Cancel"
                    type="danger"
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeleteModal(false)}
                />
            </div>
        </>
    )
}

export default SavedPromptDetail