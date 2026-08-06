import { useState } from "react"
import { toast } from "react-toastify"
import { useSavedPrompts } from "shell/savedPromptsStore"
import ConfirmModal from "shell/ConfirmModal"
import { getCurrentVersion, sortVersions } from "shell/utils"
import "./SavedPromptDetail.scss"
type Props = {
    id?: string
    onDelete: () => void
    onEdit: (id: number) => void
}

const SavedPromptDetail = ({ id, onDelete, onEdit }: Props) => {
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
        onDelete()
    }

    return (
        <>
            <div className="saved-prompt-detail">
                <div style={{ padding: 20 }}>
                    <h2>Saved Prompt Detail</h2>
                    <p>Current Version:<strong>{" "}V{promptFound.currentVersion}</strong></p>
                    <pre>{currentVersion?.text || ""}</pre>
                    <div className="saved-prompt-detail__history">
                        <div className="saved-prompt-detail__history-content">
                            <div className="saved-prompt-detail__history-header">
                                <h3>Version History</h3>
                                <div className="saved-prompt-detail__actions">
                                    <button className="saved-prompt-detail__action-button" onClick={() => onEdit?.(promptFound.id)}>Edit</button>
                                    <button className="saved-prompt-detail__action-button saved-prompt-detail__action-button --danger"
                                        onClick={() => setShowDeleteModal(true)}>Delete</button>
                                </div>
                            </div>
                            <ul className="saved-prompt-detail__version-list">
                                {sortVersions(promptFound).map((version) => (
                                    <li key={version.id} className={version.version === promptFound.currentVersion ?
                                        "saved-prompt-detail__version-item active" : "saved-prompt-detail__version-item"}>
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
                        </div>
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
                </div>
            </div>
        </>
    )
}

export default SavedPromptDetail