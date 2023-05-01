const d = document,
      encryptButton = d.querySelector('.encriptar'),
      decryptButton = d.querySelector('.desencriptar'),
      textField = d.querySelector('.textarea'),
      message = d.querySelector('.message'),
      messageContainer = d.querySelector('.message-box'),
      messageBox = d.querySelector('.small-box'),
      image = d.querySelector(".image"),
      copyButton = d.querySelector('.copy')

let data = ""

const encrypt = (text) => {
    let textToEncrypt = text.split("")
    let encryptedText = ""

    encryptedText = textToEncrypt.map(el => {
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

    return encryptedText
    
}

const decrypt = (text) => {
    const patterns = /(enter|imes|ai|ober|ufat)/g

    const decryptedText = text.replace(patterns, match => {
        switch (match) {
            case "enter":
                return "e"
            case "imes":
                return "i"
            case "ai":
                return "a"
            case "ober":
                return "o"
            case "ufat":
                return "u"
            default:
                return match
        }
    })

    return decryptedText
}

d.addEventListener("DOMContentLoaded", e => {
    textField.value = ""
})

textField.addEventListener("input", e => {
    data = e.target.value.toLowerCase().trim()
})

encryptButton.addEventListener("click", e => {
    if(data.length > 0) {
        let encryptedMessage = encrypt(data)
        messageContainer.classList.add("flex-between")
        messageContainer.classList.remove("box-shadow")
        image.classList.add("hidden")
        copyButton.classList.remove("hidden")
        copyButton.classList.add("margin-bottom")
        messageBox.innerHTML = `<p>${encryptedMessage}</p>`
    }
})

decryptButton.addEventListener("click", e => {
    if(data.length > 0) {
        let decryptedMessage = decrypt(data)
        messageBox.innerHTML = `<p>${decryptedMessage}</p>`
    }
})

copyButton.addEventListener("click", e => {
    navigator.clipboard.writeText(messageBox.textContent)
})