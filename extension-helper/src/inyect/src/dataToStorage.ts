import { CopiedText } from "./types";


export async function saveLeadData(data: CopiedText){
    if(chrome.storage){
        await chrome.storage.local.set({leadData: data});
    }
    
}

export async function resetLeadData(){
    if(chrome.storage&&window.location.hostname=="crm.jeny.com.ar"){
        await chrome.storage.local.set({leadData: {whatsappNumber: "", recognized: {location: "", pull: ""}}});
    }
}