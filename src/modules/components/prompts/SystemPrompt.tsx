import "./Prompts.scss"

const SystemPrompt = ({ systemPrompt }: any) => {
    return (
        <div className="prompts__card">
            <div className="prompts__card-header">
                <h3 className="prompts__card-title">
                    <span>System Prompt</span>
                    <div className="prompts__divider" />
                </h3>
            </div>
            <div className="prompts__content-box">
                {systemPrompt || "No System prompt yet"}
            </div>
        </div>
    )
}

export default SystemPrompt