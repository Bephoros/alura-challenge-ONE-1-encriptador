const encrypt = (text) => {
    let lowercase_text = text.toLowerCase()
    let split_text = lowercase_text.split("")
    let encrypted_text = split_text.map(el => {
        switch (el) {
            case "e":
                return "enter"
            case "i":
                return "imes"
            case "a":
                return "ai"
            case "o":
                return "ober"
            case "u":
                return "ufat"
            default:
                return el
        }
    }).join("")

    return encrypted_text
}