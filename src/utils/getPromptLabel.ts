export const getPromptLabel = (text: string) => {
    if (!text) return "Untitled"

    const words = text
        .replace(/\n/g, " ")
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .split(" ")
        .filter(Boolean)

    return words.slice(0, 2).join(" ") || "Prompt"
}