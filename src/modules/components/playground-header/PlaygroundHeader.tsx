import "./PlaygroundHeader.scss"

type Props = {
    model: string
    temperature: number
    tokens: number
    setModel: (value: string) => void
    setTemperature: (value: number) => void
    setTokens: (value: number) => void
}

const PlaygroundHeader = ({
    model,
    temperature,
    tokens,
    setModel,
    setTemperature,
    setTokens
}: Props) => {
    return (
        <div className="playground__header">
            <div className="playground__controls">

                <div className="playground__control">
                    <label>Model:</label>
                    <select
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    >
                        <option value="gpt-4">GPT-4</option>
                        <option value="gpt-3.5">GPT-3.5</option>
                    </select>
                </div>

                <div className="playground__control">
                    <label>Temperature:</label>
                    <select
                        value={temperature}
                        onChange={(e) => setTemperature(Number(e.target.value))}
                    >
                        <option value={0.3}>0.3</option>
                        <option value={0.5}>0.5</option>
                        <option value={0.7}>0.7</option>
                        <option value={1}>1.0</option>
                    </select>
                </div>
                <div className="playground__control">
                    <label>Max Tokens:</label>
                    <select
                        value={tokens}
                        onChange={(e) => setTokens(Number(e.target.value))}
                    >
                        <option value={600}>600</option>
                        <option value={500}>500</option>
                        <option value={400}>400</option>
                        <option value={300}>300</option>
                    </select>
                </div>

            </div>
        </div>
    )
}

export default PlaygroundHeader