import "./PromptInput.scss"

type Props = {
    prompt: string
    setPrompt: (value: string) => void
    handleRun: () => void
    loading: boolean
}

const PromptInput = ({ prompt, setPrompt, handleRun, loading }: Props) => {
    return (
        <div className="prompt-input__card">
            <div className="prompt-input__card-header">
                <h3 className="prompt-input__card-title">
                    <span>Prompt Input</span>
                    <div className="prompt-input__divider"></div>
                </h3>
            </div>
            <textarea
                id="textarea"
                className="prompt-input__textarea"
                value={prompt}
                onChange={(e) => {
                    setPrompt(e.target.value)
                }}
                placeholder="Enter your prompt..."
            />
            <div className="prompt-input__actions">
                <button onClick={handleRun} disabled={loading}>
                    {loading ? "Running..." : "Run Test"}
                </button>
            </div>
            <span className="prompt-input__divider-btm"></span>
        </div>
    )
}

export default PromptInput