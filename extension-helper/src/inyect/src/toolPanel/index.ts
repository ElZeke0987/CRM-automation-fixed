export async function ToolPanel() {

    const toolPanelIsActive = localStorage.getItem("toolPanelIsActive")
    localStorage.setItem("toolPanelIsActive", toolPanelIsActive === "true" ? "false" : "true")
    if(toolPanelIsActive === "false") {
        const toolPanels = document.querySelectorAll(".tool-panel")
        toolPanels.forEach(toolPanel => {
            toolPanel.remove()
        })
        return
    }
    const appElement = document.querySelector("#app")
    const adviseSection = document.querySelector(".advises-section")
    if(appElement){
        
       
        if(adviseSection){
            const toolPanel = document.createElement("div")
            toolPanel.className = "tool-panel"
            toolPanel.innerHTML = "Tool Panel"
            adviseSection.appendChild(toolPanel)
            console.log("Advise section found ", adviseSection)
        }else{
            console.log("Advise section not found")
            const newAdviseSection = document.createElement("div")
            newAdviseSection.className = "advises-section"
            appElement.appendChild(newAdviseSection)
            const toolPanel = document.createElement("div")
            toolPanel.className = "tool-panel"
            toolPanel.innerHTML = "Tool Panel"
            newAdviseSection.appendChild(toolPanel)
        }
    }
}