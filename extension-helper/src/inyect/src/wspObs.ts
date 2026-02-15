
import { saveLeadData } from "./dataToStorage";
import { advise } from "./inyectElements";
import { CopiedText } from "./types";
import { allInMessagesSelector, domWsp } from "./vars/domVars";
import { copyFunctionAccessor } from "./vars/configVars";
import { initRecognizing } from "./word-recognizer/index";
import { recognizeOutMessages } from "./word-recognizer/recognizeOutMessages";
import { revisionRequestUI } from "./sendToCRM";

let whatsappNumber: string;

const observer = new MutationObserver(async(mutations, obs) => {
    const target = mutations[0].target as HTMLElement
    if(target.id=="statusmsg"){
        console.log("This result papu: ", target)
        return
    }
    
    if(window.location.hostname!="web.whatsapp.com"){
        
        return
    }

    //console.log("Mutation detected: ", listMessagesInChat)
    const whatsappNumberElement = domWsp?.whatsappNumberElement()
    const inputTextWithNumber= domWsp?.inputTextWithNumber()
    if(!whatsappNumberElement&&!inputTextWithNumber){
        console.log("No se encontro ningun elemento con el numero!!!! Cancelando operacion ")
        return
    }
    // const elementsToClear = document.querySelectorAll(".x1c4vz4f.x2lah0s.xdl72j9.xlese2p")

    // if(elementsToClear.length > 0){
    //     elementsToClear.forEach(element => {
    //         element.innerHTML = ""
    //     })
    // }
    //console.log("whatsappNumberElement: ", whatsappNumberElement, "inputTextWithNumber: ", inputTextWithNumber, "allMessages: ", allMessages)
    // if(!allMessages){
    //     console.log("No se encontro la lista de mensajes")

    // }
    // if(allMessages.length==0){
    //     console.log("La lista de mensajes no tiene elementos")
    // }


    const numberFromInput = inputTextWithNumber?.getAttribute("aria-label")
    if(!numberFromInput){
        //console.log("No se encontro el atributo del numero en el input, es posible que actualInvisibleInpNumber sea undefined")
    }
    const actualInvisibleInpNumber = `+${numberFromInput?.replace(/^\D+|\.$/g, '')}`
    const actualVisibleProfileNumber = whatsappNumberElement?.innerHTML || actualInvisibleInpNumber
    
    
   

    if(!actualVisibleProfileNumber){
       ///console.log("No se encontro el numero visible!!!!")
        //console.log("whatsappNumberElement: ", actualVisibleProfileNumber, "whatsappNumberElement: ", whatsappNumberElement)
        alert("No se encontro el numero visible!!!! (ver consola)")
    }
    if(!actualInvisibleInpNumber){
       //console.log("No se encontro el numero invisible del input!!!!")
        //console.log("numberFromInput: ", numberFromInput)
        alert("No se encontro el numero invisible del input!!!! (ver consola)")
    }

    //console.log("Still working? on visible profile number: ", actualVisibleProfileNumber, " and: ", actualInvisibleInpNumber)

    if (whatsappNumber!=actualVisibleProfileNumber && copyFunctionAccessor.val) {
        
        whatsappNumber = actualVisibleProfileNumber || actualInvisibleInpNumber
        //console.log("Copiando numero: ", whatsappNumber)
         try {
            const allInMessages = await domWsp.allInMessages()
            //console.log("allInMessages: ", allInMessages)
            const recognized = initRecognizing(allInMessages.join(" "))
            const allOutMessages = await domWsp.allOutMessages()
            const recognizedOut = recognizeOutMessages(allOutMessages, recognized[0])
            console.log("saving lead data: ", {whatsappNumber, recognized: recognized[0], messageToSend: recognizedOut})
            await saveLeadData({whatsappNumber, recognized: recognized[0], messageToSend: recognizedOut})
            const copiedText: CopiedText = {whatsappNumber, recognized: recognized[0], messageToSend: recognizedOut}
            
            
            let finalAdvise = `${copiedText.recognized.location || "No se reconocio LOCALIDAD"} (${copiedText.recognized.pull || "No se reconocio PULL"})`
            if(!copiedText.recognized.location||copiedText.recognized.location==''||copiedText.recognized.location==null){

                finalAdvise = "No se reconocio LOCALIDAD"
            }
            if((!copiedText.recognized.pull||copiedText.recognized.pull==''||copiedText.recognized.pull==null) && copiedText.recognized.location){
                finalAdvise = "No se reconocio PULL para: " + copiedText.recognized.location
            }
            advise({active: !copiedText.recognized.location||!copiedText.recognized.pull ? false : true, text: finalAdvise})
            console.log("copiedText", copiedText)
            revisionRequestUI()
            
            await navigator.clipboard.writeText(copiedText.messageToSend)

        } catch (err) {
            console.error('Error al copiar: ', err);
            // Aquí puedes mostrar un mensaje amigable al usuario
        }
        
    }
});

export function stopObserver(){
    observer.disconnect();
}

export function startObserver(){
    observer.observe(document.body, { childList: true, subtree: true });
}