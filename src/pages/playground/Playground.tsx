import { useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PlaygroundHeader from '../../modules/components/playground-header/PlaygroundHeader'
import PromptInput from '../../modules/components/prompt-input/PromptInput'
import SystemPrompt from '../../modules/components/prompts/SystemPrompt'
import UserPrompt from '../../modules/components/prompts/UserPrompt'

import "./Playground.scss"

import { usePlayground } from "../../hooks/usePlayground"
import OutputPreview from '../../modules/components/output-preview/OutputPreview'
import Evaluation from '../../modules/components/evaluation/Evaluation'

const Playground = () => {
    const playground = usePlayground()
    const evaluationRef = useRef<HTMLDivElement | null>(null)
    const prevStreamingRef = useRef(false)

    useEffect(() => {
        const wasStreaming = prevStreamingRef.current
        const isNowStopped = !playground.isStreaming

        if (wasStreaming && isNowStopped && playground.evaluation && evaluationRef.current) {
            setTimeout(() => {
                evaluationRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                })
            }, 100)
        }
        prevStreamingRef.current = playground.isStreaming
    }, [playground.isStreaming])

    const { id } = useParams()

    useEffect(() => {
        if (!id) return
        const saved = JSON.parse(localStorage.getItem("savedPrompts") || "[]")
        const found = saved.find((p: any) => String(p.id) === id)
        if (found) {
            playground.setPrompt(found.text)
        }
    }, [id])

    return (
        <div className="prompt-playground">
            <PlaygroundHeader {...playground} />
            <div className="prompt-playground__body">
                <div className="prompt-playground__left">
                    <PromptInput {...playground} />
                    <div className="prompt-playground__row">
                        <SystemPrompt systemPrompt={playground.systemPrompt} />
                        <UserPrompt userPrompt={playground.userPrompt} />
                    </div>
                    <div className="prompt-playground__row" ref={evaluationRef}>
                        <Evaluation evaluation={playground.evaluation}
                            output={playground.output}
                        />
                    </div>
                </div>
                <div className="prompt-playground__right">
                    <OutputPreview
                        output={playground.output}
                        loading={playground.loading}
                        isStreaming={playground.isStreaming}
                    />
                </div>
            </div>
        </div>

    )
}

export default Playground