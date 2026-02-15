import { RecognitionResult } from "../types";
import { normalize } from "./normalizer";
import { greeting, firstQuestion, secondQuestion } from "../vars/messageVars";

export function recognizeOutMessages(inputOutMessages: string | string[], inputRecognition: RecognitionResult): string{
    let finalMessage = ""
    
    if(Array.isArray(inputOutMessages)){
        const inputOutMessagesString = inputOutMessages.join(" ")
        const normalizedInputOutMessages = normalize(inputOutMessagesString)
        if(inputRecognition.location&&!normalizedInputOutMessages.includes(normalize("muchas gracias por tu contacto"))){
            finalMessage = `Muchas gracias por tu contacto. Ya derive tu consulta a la sucursal correspondiente a ${inputRecognition.location}. Se van a estar contactando con vos para poder asesorarte y pasarte toda la información, promociones y formas de pago 😊`
            if(inputRecognition.pull==="interior"){
                finalMessage = `Somos de Buenos Aires AMBA y CABA por el momento no llegamos a ${inputRecognition.location} Gracias por contactarnos.`
            }
        }else if(!inputRecognition.location&&!normalizedInputOutMessages.includes(normalize("Buenas tardes. Por favor indicame la localidad"))){
            

            const finalQuestion = normalizedInputOutMessages.includes(normalize("Hola! Cómo estás? Mi nombre es Micaela. Para recibir más info por favor indicame:")) ? secondQuestion : firstQuestion
            finalMessage = `${greeting}. ${finalQuestion}`
            // if(inputRecognition.pull==="interior"){
            //     finalMessage += `Somos de Buenos Aires AMBA y CABA por el momento no llegamos a ${inputRecognition.location} Gracias por contactarnos.`
            // }
        }
    }
    return finalMessage
}