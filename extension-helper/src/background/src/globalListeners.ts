import { handleTab } from "./handleTabUpdate";
import { sendToCRMListener } from "./handleSendToCRM";

export async function onTabUpdate() {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status === "complete") {
            handleTab(tab);
        }
    });

}
export async function onMessage() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse)=>{
        console.log("Message received: ", message)
        sendToCRMListener(message, sender, sendResponse);    
    })
    
}