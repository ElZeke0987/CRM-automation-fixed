import { inyElementsVars } from "./inyElementsVars";

interface adviseParams {
    active: boolean,
    text: string,
    timeout?: number
}


export function advise({active, text, timeout=2500}: adviseParams){
    const appElement = document.querySelector("#app")
    if(appElement){
        // const searchAndDelete = document.querySelector(".copy-function-advise")
        // if(searchAndDelete){
        //     searchAndDelete.remove()
        // }
        const advisesSection = document.querySelector(".advises-section")
        if(advisesSection){
            const copyFunctionAdviseElement = document.createElement("div")
            copyFunctionAdviseElement.className = `copy-function-advise ${active ? "active-copy" : "inactive-copy"}`
            copyFunctionAdviseElement.innerHTML = text || "HOLA ES UNDIFINID"
            // copyFunctionAdviseElement.style.position = "fixed"
            // copyFunctionAdviseElement.style.zIndex = "100000"
            // copyFunctionAdviseElement.style.top = "10px"
            // copyFunctionAdviseElement.style.left = "50vw"
            advisesSection.appendChild(copyFunctionAdviseElement)
            setTimeout(() => {
                copyFunctionAdviseElement.remove()
            }, timeout)
        }else{
            const copyFunctionAdviseElement = document.createElement("div")
            copyFunctionAdviseElement.className = `copy-function-advise ${active ? "active-copy" : "inactive-copy"}`
            copyFunctionAdviseElement.innerHTML = "No se encontro el elemento advises-section, creandolo..."
            // copyFunctionAdviseElement.style.position = "fixed"
            // copyFunctionAdviseElement.style.zIndex = "100000"
            // copyFunctionAdviseElement.style.top = "10px"
            // copyFunctionAdviseElement.style.left = "50vw"
            appElement.appendChild(copyFunctionAdviseElement)
            setTimeout(() => {
                copyFunctionAdviseElement.remove()
            }, timeout)
            const advisesSection = document.createElement("div")
            advisesSection.className = "advises-section"
    
            appElement.appendChild(advisesSection)
        }
    }else{
        console.log("No se encontro el elemento app")

    }
}

// export function toolPanel(){
//     if(appElement){
//         const toolPanelElement = document.createElement("div")
//         toolPanelElement.className = "tool-panel"
//         toolPanelElement.innerHTML = "Tool Panel"
//         appElement.appendChild(toolPanelElement)
//     }
// }