declare module "shell/authStore" {
    export const useAuth: any
}
declare module "shell/savedPromptsStore" {
    export const useSavedPrompts: any
}
declare module "shell/ConfirmModal" {
    const ConfirmModal: any
    export default ConfirmModal
}

declare module "shell/utils" {

    export type PromptVersion = {
        id: number
        version: number
        prompt: string
        systemPrompt: string
        userPrompt: string
        output: string
        text: string
        createdAt: string
    }
    export const getNextVersion: (prompt: any) => any
    export const getCurrentVersion: (prompt: any) => PromptVersion | undefined
    export const isPromptChanged: (prompt: any, text: string) => boolean
    export const getVersionByNumber: (prompt: any, version: number) => any
    export const sortVersions: (prompt: any) => any[]
}