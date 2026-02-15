import { insertOnInputs, setAsNNN } from "./domActions"
import { CopiedText } from "./types"
import { resetLeadData } from "./dataToStorage"
import { plusToStorage } from "./utils"

export async function onWindowFocus(e: Event){
    console.log("focus event for back listeners: ", e)
    if(window.location.href.includes("crm.jeny.com.ar")){
        chrome.storage.local.get(["leadData"], (leadDResult) => {
            console.log("leadData ", window.location.href, leadDResult.leadData)
            const leadData = leadDResult.leadData as CopiedText | undefined
            if(leadData&&leadData.whatsappNumber&&leadData.recognized){
                insertOnInputs(leadData)
                plusToStorage(1, "copiedTexts")
                if(leadData.recognized.location){
                    console.log("resetting lead data")
                    localStorage.setItem("lastWasNNN", "false");
                    resetLeadData()
                } else{
                    const areaNumber = leadData.whatsappNumber.split(" ")[2] 
                    setAsNNN({num: leadData.whatsappNumber, areaNumber})
                }
            }
        })
    }
  
}