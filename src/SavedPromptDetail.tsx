import { useState } from "react"
import { toast } from "react-toastify"
import { useSavedPrompts } from "shell/savedPromptsStore"
import ConfirmModal from "shell/ConfirmModal"
import { getCurrentVersion, sortVersions } from "shell/utils"
import "./SavedPromptDetail.scss"
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

    const currentVersion = getCurrentVersion(promptFound)

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
                <p>Current Version:<strong>{" "}V{promptFound.currentVersion}</strong></p>
                <pre>{currentVersion?.text || ""}</pre>
                <h3>Version History</h3>
                <ul className="version-list">
                    {sortVersions(promptFound).map((version) => (
                        <li key={version.id} className={version.version === promptFound.currentVersion ? "active" : ""}>
                            <div>
                                <strong>
                                    Version{version.version}
                                </strong>
                                {version.version === promptFound.currentVersion && "(Current)"}
                            </div>
                            <small>{new Date(version.createdAt).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
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