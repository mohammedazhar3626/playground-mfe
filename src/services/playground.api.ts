const cache = new Map<string, any>()
export const runPromptAPI = async ({ prompt }: { prompt: string }) => {
    try {
        if (cache.has(prompt)) {
            return cache.get(prompt)
        }
        await new Promise((res) => setTimeout(res, 800))

        const lowerPrompt = prompt.toLowerCase()

        let output = ""
        let systemPrompt = ""

        if (lowerPrompt.includes("email")) {
            systemPrompt = "You are a professional email assistant."
            output = `Hi Team,

I hope you're doing well. I wanted to follow up regarding the recent update. Please let me know if you need any additional information.

Best regards,
[Your Name]`
        }
        else if (lowerPrompt.includes("summary")) {
            systemPrompt = "You summarize content into concise bullet points."
            output = `Summary:
Key point 1
Key point 2
Final takeaway`
        }
        else if (lowerPrompt.includes("code")) {
            systemPrompt = "You are a senior software engineer writing clean code."
            output = `function greet(name) {
  return \`Hello, \${name}!\`
}`
        }
        else {
            systemPrompt = "You are a helpful assistant."
            output = `AI Response for: "${prompt}"`
        }

        return {
            systemPrompt,
            userPrompt: prompt,
            output,
            evaluation: {
                score: 4.5,
                accuracy: "Highly Relevant",
                tone: "Professional & Polite",
                feedback: "Clear and concise message,Client will appreciate this."
            }
        }
    } catch (error) {
        console.error("Error in runPromptAPI:", error)
        throw error
    }
}