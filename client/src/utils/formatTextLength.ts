type formatTextLength = {
    text: string,
    minLength: number,
    addDots?: boolean
}

export const formatTextLength = ({text, minLength, addDots = true} : formatTextLength) => {
    const textLength = text.length

    if (textLength > minLength) {
        const newText = text.slice(0, minLength) + "..."
        return newText
    }
    
    return text
}
