import { inyElementsVars } from "./inyElementsVars";
const appElement = document.querySelector("#app")
export function copyFunctionAdvise(active: boolean){
    
    if(appElement){
        const searchAndDelete = document.querySelector(".copy-function-advise")
        if(searchAndDelete){
            searchAndDelete.remove()
        }
        const copyFunctionAdviseElement = document.createElement("div")
        copyFunctionAdviseElement.className = `copy-function-advise ${active ? "active-copy" : "inactive-copy"}`
        copyFunctionAdviseElement.innerHTML = active ? "AUTOCOPY ACTIVADO" : "AUTOCOPY DESACTIVADO"
        // copyFunctionAdviseElement.style.position = "fixed"
        // copyFunctionAdviseElement.style.zIndex = "100000"
        // copyFunctionAdviseElement.style.top = "10px"
        // copyFunctionAdviseElement.style.left = "50vw"
        console.log("copyFunctionAdviseElement", copyFunctionAdviseElement)
        appElement.appendChild(copyFunctionAdviseElement)
        setTimeout(() => {
            copyFunctionAdviseElement.remove()
        }, 2500)
    }
}

export function toolPanel(){
    if(appElement){
        const toolPanelElement = document.createElement("div")
        toolPanelElement.className = "tool-panel"
        toolPanelElement.innerHTML = "Tool Panel"
        appElement.appendChild(toolPanelElement)
    }
}