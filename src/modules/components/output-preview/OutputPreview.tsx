import "./OutputPreview.scss"

type OutputPreviewProps = {
    output: string
    loading: boolean
    isStreaming: boolean
}

const OutputPreview = ({ output, loading, isStreaming }: OutputPreviewProps) => {
    return (
        <div className="playground__card output-preview">
            <div className="playground__card-header">
                <h3 className="playground__card-title">
                    <span>Output Preview</span>
                    <div className="playground__divider" />
                </h3>
            </div>
            <div className="output-preview__content">
                <div className="output-preview__box">
                    {loading && !output && (
                        <p className="output-preview__loading">
                            Generating response...
                        </p>
                    )}
                    {!loading && !output && (
                        <p className="output-preview__placeholder">
                            Run a prompt to see AI output
                        </p>
                    )}
                    {output && (
                        <pre className="output-preview__text">
                            {output}
                            {isStreaming && <span className="cursor">|</span>}
                        </pre>
                    )}
                </div>

            </div>
        </div>
    )
}

export default OutputPreview