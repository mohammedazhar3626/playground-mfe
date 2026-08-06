import { useSavedPrompts } from "shell/savedPromptsStore"
import { getPromptLabel } from "../../../utils/getPromptLabel"
import { usePlayground } from "../../../hooks/usePlayground"
import "./Evaluation.scss"

type PlaygrounState = ReturnType<typeof usePlayground>
type Props = {
    evaluation: {
        score: number
        accuracy: string
        tone: string
        feedback: string
        prompt: string
    } | null
    playground: PlaygrounState
    isEditMode: any
}

const Evaluation = ({ evaluation, playground, isEditMode }: Props) => {
    const { addPrompt, createVersion, savedPrompts } = useSavedPrompts()
    if (!evaluation) return null

    const stars = "★".repeat(Math.round(evaluation.score))

    const handleSavePrompt = () => {
        const normalizedText = playground.output.trim()
        const existingKeyText = savedPrompts.find((p: any) => p.versions.some((v: any) => v.text.trim() === normalizedText))
        const newPrompt = {
            id: Date.now(),
            key: existingKeyText?.key ?? `prompt-${Date.now()}`,
            label: getPromptLabel(normalizedText),
            icon: "SquarePlus",
            prompt: playground.prompt,
            systemPrompt: playground.systemPrompt,
            userPrompt: playground.userPrompt,
            output: playground.output,
            text: normalizedText,
        }
        const existingPrompt = savedPrompts.find((p: any) => p.key === newPrompt.key)
        if (existingPrompt) {
            createVersion(existingPrompt.id, {
                prompt: playground.prompt,
                systemPrompt: playground.systemPrompt,
                userPrompt: playground.userPrompt,
                output: playground.output,
                text: normalizedText,
            })
            playground.reset()
            window.dispatchEvent(
                new CustomEvent("prompt-version-created", {
                    detail: {
                        id: existingPrompt.id
                    }
                })
            )
        } else {
            addPrompt(newPrompt)
            playground.reset()
        }
        window.dispatchEvent(new Event("savedPromptsUpdated"))
    }

    return (
        <div className="playground__card evaluation">
            <div className="evaluation__header">
                <h3 className="evaluation__title">
                    Results & Evaluation
                </h3>
                <div className="evaluation__actions">
                    <button className="btn-primary" onClick={handleSavePrompt}>{isEditMode ? "Save Version" : "Save Prompt"}</button>
                    <button className="btn-secondary">A/B Test Prompt</button>
                </div>
            </div>
            <div className="evaluation__content">

                <div className="evaluation__row">
                    <span className="label">Evaluation Score:</span>
                    <span className="value score">
                        {evaluation.score} <span className="stars">{stars}</span>
                    </span>
                </div>
                <div className="evaluation__row">
                    <span className="label">Accuracy:</span>
                    <span className="value">{evaluation.accuracy}</span>
                </div>
                <div className="evaluation__row">
                    <span className="label">Tone:</span>
                    <span className="value">{evaluation.tone}</span>
                </div>
                <div className="evaluation__row">
                    <span className="label">Feedback:</span>
                    <span className="value feedback">
                        "{evaluation.feedback}"
                    </span>
                </div>

            </div>
        </div>
    )
}

export default Evaluation