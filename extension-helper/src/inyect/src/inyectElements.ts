import { inyElementsVars } from "./inyElementsVars";

export function advise(active: boolean, text: string){
    const appElement = document.querySelector("#app")
    if(appElement){
        const searchAndDelete = document.querySelector(".copy-function-advise")
        if(searchAndDelete){
            searchAndDelete.remove()
        }
        const copyFunctionAdviseElement = document.createElement("div")
        copyFunctionAdviseElement.className = `copy-function-advise ${active ? "active-copy" : "inactive-copy"}`
        copyFunctionAdviseElement.innerHTML = text
        // copyFunctionAdviseElement.style.position = "fixed"
        // copyFunctionAdviseElement.style.zIndex = "100000"
        // copyFunctionAdviseElement.style.top = "10px"
        // copyFunctionAdviseElement.style.left = "50vw"
        appElement.appendChild(copyFunctionAdviseElement)
        setTimeout(() => {
            copyFunctionAdviseElement.remove()
        }, 2500)
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