
import { formatNumber } from "./utils";
import { areaNumbers, areasInterior } from "./vars/areasVars";
import { domCRM } from "./vars/domVars";
import { CopiedText } from "./types";
export function setupPullRadio() {
    const pullRadioEl = domCRM.pullRadio() as HTMLInputElement;
    pullRadioEl.checked = true;
    mostrarcampo();
    pullRadioEl.dispatchEvent(new Event("change", { bubbles: true }));
}
        

interface SetAsNNNProps {
    num: string;
    areaNumber: string;
}

export function setAsNNN({num, areaNumber}: SetAsNNNProps){
    const leadCelInp = domCRM.leadCelInp() as HTMLInputElement;
    const nnnButton = domCRM.nnnButton();
    const pullElementSelect = domCRM.pullElementSelect() as HTMLSelectElement;
    
    leadCelInp.value = "+" + formatNumber(num)
    
    

    leadCelInp.dispatchEvent(new Event("input", {bubbles: true}))

    nnnButton.forEach((btn)=>{
        btn.dispatchEvent(new Event("click", {bubbles: true}))
    })
    
    
    pullElementSelect.value = "100";
    setToInterior({areaNumber, isNNNAction: true});
    localStorage.setItem("lastWasNNN", "true");
}

interface SetToInteriorProps {
    areaNumber: string;
    isNNNAction: boolean;
}

export function setToInterior({areaNumber, isNNNAction}: SetToInteriorProps){
    if(areaNumbers[areaNumber]){
        return
    }

    const area = getAreaByNumber(areaNumber)
    console.log("Area found:", area, "isNNNAction: ", isNNNAction);
    const leadLocationInpEl = domCRM.leadLocationInp() as HTMLInputElement;
    leadLocationInpEl.value = area !== "NNN" ? area : (isNNNAction ? "NNN" : "No encontre esa area telefonica");
    leadLocationInpEl.dispatchEvent(new Event("input", {bubbles: true}))
    
    
    const deriRadioEl = domCRM.deriRadio() as HTMLInputElement;
    deriRadioEl.checked = true;
    mostrarcampo()
    deriRadioEl.dispatchEvent(new Event("change", { bubbles: true }));
    const deriGroupSelectEl = domCRM.deriGroupSelect() as HTMLSelectElement;
    deriGroupSelectEl.value = "27";
    deriGroupSelectEl.dispatchEvent(new Event("change", { bubbles: true }));
}

export function getAreaByNumber(areaNumber: string){
    for(let area of areasInterior){
        if(area.codigos.includes(areaNumber)){
            return area.region
        }
    }
    const nnnButtonEl = domCRM.nnnButton();
    if(nnnButtonEl.length > 1){
        (nnnButtonEl[1] as HTMLButtonElement).dispatchEvent(new Event("click", {bubbles: true}))
        
    }
    if(areaNumbers[areaNumber]=="yes"){
        return "agua"
    }
    return "NNN"
}

export function mostrarcampo(){//Es como un re-render normal, solo para verificar sobre algo que ya paso, que es el click automatico sobre un radio
    //Resetea todas las posibles selecciones 
    
    const operasigEl = domCRM.operasig();
    const soperasigEl = domCRM.soperasig();
    const grupoderiEl = domCRM.grupoderi();
    const sgrupoderiEl = domCRM.sgrupoderi();
    const pullderiEl = domCRM.pullderi();
    const spullderiEl = domCRM.spullderi();
    
    
    if(!operasigEl||!soperasigEl||!grupoderiEl||!sgrupoderiEl||!pullderiEl||!spullderiEl){
        return
    }

    operasigEl.style.display = "none";
    soperasigEl.removeAttribute('required');
    grupoderiEl.style.display = "none";
    sgrupoderiEl.removeAttribute('required');
    pullderiEl.style.display = "none";
    spullderiEl.removeAttribute('required');

    const radiovalues = domCRM.asignacionRadio();
    let radioid: string | undefined;
    if(!radiovalues||radiovalues.length==0)return
    radiovalues.forEach((radio)=>{
        if(radio.checked){
            radioid = radio.value;
        }
    })
    //Itera y finalmente muestra automaticamente la que corresponda
    if(radioid == 'asignar'){
        operasigEl.style.display = "flex";
        soperasigEl.setAttribute("required","");
    }
    if(radioid == 'derivar'){
        grupoderiEl.style.display = "flex";
        sgrupoderiEl.setAttribute("required","");  
    }
    if(radioid == 'pull'){
        pullderiEl.style.display = "flex";
        spullderiEl.setAttribute("required","");  
    }
    
}


export function insertOnInputs(leadData: CopiedText){
    console.log("insertOnInputs", leadData)
    const areaNumber = leadData.whatsappNumber.split(" ")[2]
    setupPullRadio();
    setToInterior({areaNumber, isNNNAction: false});
    console.log("Copiando texto en el input de numero y de localidad")
    const leadCelInp = domCRM.leadCelInp();
    const leadLocInp = domCRM.leadLocationInp();

    if(leadCelInp){
        leadCelInp.value = "+" + formatNumber(leadData.whatsappNumber)
        leadCelInp.dispatchEvent(new Event("input", {bubbles: true}))
    }
    if(leadLocInp){
        
        leadLocInp.value = leadData.recognized.location
        console.log("leadLocInp.value", leadLocInp.value)
        leadLocInp.dispatchEvent(new Event("input", {bubbles: true}))
    }
    if(!leadData.recognized.pull){
        //alert("No hay PULL para: " + leadData.recognized.location)
    }else if(leadData.recognized.pull && leadData.recognized.pull != "interior"){
        setupPullRadio()
        const pullElementSelect = domCRM.pullElementSelect() as HTMLSelectElement
        
        pullElementSelect.value = leadData.recognized.pull
        pullElementSelect.dispatchEvent(new Event("change", { bubbles: true }));
        console.log("leadData.recognized.pull", leadData.recognized.pull)
    }
}