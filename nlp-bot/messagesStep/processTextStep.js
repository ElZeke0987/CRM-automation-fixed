import { filteringText } from "../getters/getText.js";
import { loadNlp, processText, setupNlp, trainNlp } from "../nlpConfs/nlpMods.js";


let userMessages = {};
let cooldownToProcces = false;
let userTimers={};//El sistema de cooldown aqui sirve para esperar a que un usuario termine de enviar todos los mensajes
let userData={};
const cooldownTime=5000;

function getResponseData(responseNLP){
    let dataObj={
        nombres: "",
        localidades: "",
        pulls: ""
    }
    responseNLP.entities.forEach(entity => {
        dataObj[entity.entity]=entity.option
    });
    return dataObj
}


export async function processStep(textMsg){
    
    const regex = /\b(?:(?:[A-ZÁÉÍÓÚÑ][a-záéíóúüñ]+)|(?:[A-ZÁÉÍÓÚÑ]+))(?:-(?:(?:[A-ZÁÉÍÓÚÑ][a-záéíóúüñ]+)|(?:[A-ZÁÉÍÓÚÑ]+)))*(?:(?:\s+(?:(?:de|del|la|las|los)|(?:DE|DEL|LA|LAS|LOS))\s+)?\s*(?:(?:[A-ZÁÉÍÓÚÑ][a-záéíóúüñ]+)|(?:[A-ZÁÉÍÓÚÑ]+))(?:-(?:(?:[A-ZÁÉÍÓÚÑ][a-záéíóúüñ]+)|(?:[A-ZÁÉÍÓÚÑ]+)))*?)*\b/g
    const manager = await loadNlp();
    const response = await processText(manager, textMsg);

    if(!textMsg|| textMsg==null||filteringText(textMsg)||textMsg==" ") {
        console.log("El usuario envio un mensaje poco entendible")
        return
    }
    const data = getResponseData(response)
    console.log("DATA: ", data)
    if(response?.classifications[0].intent==="cliente.multi.info"){//Si se obtienen los dos datos, recien ahi se resetea el proceso de preguntas
        
    }
    console.log("No hay nada mas: ")
    
    return data

}


