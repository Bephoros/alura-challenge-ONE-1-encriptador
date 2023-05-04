/**
 * Variables globales
 */
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

/**
 * Función para encriptar un texto
 * @param {string} text - El texto a encriptar
 * @returns {string | Error} - El texto encriptado o un objeto Error en caso de error
 */
const encrypt = (text) => {
    let textToEncrypt = text.split("")
    let encryptedText = ""

    try {
        const isValidText = textToEncrypt.every((el) => /[a-zA-Z\s!]/.test(el) && !/[áéíóúÁÉÍÓÚüÜñÑ@#$%^&*()]/.test(el));

        if (!isValidText) {
            throw new Error(
                "El texto contiene letras con acentos, caracteres especiales o números."
            );
        }

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
    } catch (error) {
        return error
    }
    
}

/**
 * Función para desencriptar un texto
 * @param {string} text - El texto a desencriptar
 * @returns {string | Error} - El texto desencriptado o un objeto Error en caso de error
 */
const decrypt = (text) => {
    try {
        const patterns = /(enter|imes|ai|ober|ufat)/g
        const splitText = text.split("")

        const isValidText = splitText.every((el) => /[a-zA-Z\s!]/.test(el) && !/[áéíóúÁÉÍÓÚüÜñÑ@#$%^&*()]/.test(el));

        if (!isValidText) {
            throw new Error(
                "El texto contiene letras con acentos, caracteres especiales o números."
            );
        }

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
    } catch (error) {
        return error
    }
}

/**
 * Función para cambiar el estilo del contenedor del mensaje
 */
const styleChange = () => {
    messageContainer.classList.add("flex-between")
    messageContainer.classList.remove("box-shadow")
    image.classList.add("hidden")
    copyButton.classList.remove("hidden")
    copyButton.classList.add("margin-bottom")
}

/**
 * Evento cuando el DOM ha sido cargado
 */
d.addEventListener("DOMContentLoaded", e => {
    textField.value = ""
})

/**
 * Evento cuando el contenido del campo de texto ha sido modificado
 */
textField.addEventListener("input", e => {
    data = e.target.value.toLowerCase().trim()
})

/**
 * Evento para encriptar el texto
 */
encryptButton.addEventListener("click", e => {
    if(data.length > 0) {
        let encryptedMessage = encrypt(data)
        styleChange()
        messageBox.innerHTML = `<p class="final-message">${encryptedMessage}</p>`
    }
})

/**
 * Evento para desencriptar el texto
 */
decryptButton.addEventListener("click", e => {
    if(data.length > 0) {
        let decryptedMessage = decrypt(data)
        styleChange()
        messageBox.innerHTML = `<p class="final-message">${decryptedMessage}</p>`
    }
})

/**
 * Evento para copiar el mensaje al portapapeles
 */
copyButton.addEventListener("click", e => {
    navigator.clipboard.writeText(messageBox.textContent)
})

/**
 * Evento para cambiar estilos cuando el campo de texto es vaciado
 */
textField.addEventListener("change", e => {
    if (textField.value === "") {
        messageContainer.classList.remove("flex-between")
        messageContainer.classList.add("box-shadow")
        image.classList.remove("hidden")
        copyButton.classList.add("hidden")
        copyButton.classList.remove("margin-bottom")

        messageBox.innerHTML = `
        <div class="small-box">
            <p class="no-message">
                Ningún mensaje fue encontrado
            </p>
            <p class="message-text">
                Ingresa el texto que desees encriptar o desencriptar.
            </p>
        </div>
        `
    }
})