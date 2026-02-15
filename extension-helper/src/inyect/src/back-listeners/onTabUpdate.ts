import { insertOnInputs, setAsNNN } from "../domActions"
import { resetLeadData } from "../dataToStorage"

export async function onTabUpdate(){
    chrome.runtime.onMessage.addListener(async(message, sender, sendResponse) => {
        if (message.type === "READY_FOR_MESSAGE" && window.location.href.includes("web.whatsapp.com")) {
            await navigator.clipboard.writeText(message.payload)
        }else if (message.type === "READY_FOR_JSON" && window.location.href.includes("crm.jeny.com.ar")) {
            console.log("message.payload on jenny", message.payload)
            const parsedJson = JSON.parse(message.payload)
            console.log("adding to inputs directly", parsedJson)
            if(parsedJson&&parsedJson.whatsappNumber&&parsedJson.recognized){
                insertOnInputs(parsedJson)
                if(parsedJson.recognized.location){
                    console.log("resetting lead data")
                    resetLeadData()
                } else{
                    const areaNumber = parsedJson.whatsappNumber.split(" ")[2] 
                    setAsNNN({num: parsedJson.whatsappNumber, areaNumber})
                }
            }
            
            
        }else if (message.type === "GET_LEAD_DATA" && window.location.href.includes("crm.jeny.com.ar")) {
            console.log("GET_LEAD_DATA")
        }
    })
    

}