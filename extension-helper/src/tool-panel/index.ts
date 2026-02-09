
export default function initToolPanel() {
    //if(!!window.location.hostname.includes("crm.jeny.com.ar")||window.location.hostname.includes("web.whatsapp.com"))return
    console.log("Tool panel initialized: ", chrome);
    console.log("HTML URL: ", chrome.runtime.getURL("tool-panel.html"));
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === "OPEN_TOOL_PANEL") {
            const htmlContent = chrome.runtime.getURL("tool-panel.html");
            const toolPanelWindow = window.open(htmlContent)
            toolPanelWindow?.focus()
        }
    });
    
}