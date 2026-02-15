import { CopiedText } from "./types";
import { formatNumber } from "./utils";
import { crmRequest } from "./types";
import { getAreaByNumber } from "./domActions";


export async function revisionRequestUI() {
    const adviseSection = document.querySelector(".advises-section") as HTMLDivElement;
    if (!adviseSection) {
        console.error("No se encontró el section .advise-section");
        return;
    }else{
      
      chrome.storage.local.get(["leadData"], async (result) => {
        const searchRevisionRequestUI = document.querySelector(".revision-request-ui") as HTMLDivElement;
        if(searchRevisionRequestUI){
            searchRevisionRequestUI.remove();
        }
        const leadData = result.leadData as CopiedText;
        const revisionRequestUI = document.createElement("div")
        revisionRequestUI.className = "revision-request-ui"
        console.log("leadData", leadData)
        const pullValue = leadData.recognized.pull=="interior"?"":leadData.recognized.pull;
        const areaNumber = leadData.whatsappNumber.split(" ")[2];
        const interiorArea = getAreaByNumber(areaNumber);
        console.log("interiorArea", interiorArea)
        if((!leadData.recognized.pull||leadData.recognized.pull=="100")&&interiorArea!=="agua"&&!leadData.recognized.location){
            leadData.recognized.pull = "interior";
            leadData.recognized.location = interiorArea;
        }
        const groupValue = leadData.recognized.pull=="interior"?"27":
        leadData.recognized.pull=="recupero"?"9":
        leadData.recognized.pull=="remarketing"?"7":"";


        const selectPull = `
        <label for="spullderi">Pull</label>
        <select class="form-control c-select text-info" id="spullderi" value="${pullValue}" name="spullderi" required="">
            
          <option value="" disabled selected>Seleccione un pull</option>
          <option value="103"> PULL  Varela</option>
          <option value="100"> PULL AGUA</option>
          <option value="102"> PULL CABA</option>
          <option value="101"> PULL Noroeste</option>
          <option value="104"> PULL Sur</option>
        </select>`
        const selectGroup = `
        <label for="sgrupoderi">Grupo</label>
        <select class="form-control c-select text-info" id="sgrupoderi" value="${groupValue}" name="sgrupoderi" required="">
          <option value="" selected>Seleccione un grupo</option>
          <option value="27">INTERIOR</option>
          <option value="9">RECUPERO</option>
          <option value="7">REMARKETING</option>
        </select>`

        const formattedNumber = "+" + formatNumber(leadData.whatsappNumber)
        revisionRequestUI.className = "revision-request-ui"
        revisionRequestUI.innerHTML = `
          <div class="revision-request-ui-header">
            <h3>Revisión de Solicitud</h3>
            <h4>DefBot: Joha</h4>
          </div>
          <div class="revision-request-ui-body">
            <label for="leadname">Nombre</label>
            <input type="text" value="" id="leadname" placeholder="Default is NNN" /><br/>
            <label for="whatsappNumber">Numero</label>
            <input id="leadcel" type="text" placeholder="Por favor, revise la solicitud antes de enviarla al CRM." value="${leadData.whatsappNumber}"/>
            <label for="location">Localidad</label>
            <input id="leadloca" type="text" placeholder="sin localidad = Pull agua" value="${leadData.recognized.location}"/>
            ${selectPull}
            ${selectGroup}
          </div>
        `
        const revisionRequestUIBody = revisionRequestUI.querySelector('.revision-request-ui-body') as HTMLDivElement;
        
        const pullSelect = revisionRequestUIBody.querySelector('#spullderi') as HTMLSelectElement;
        const groupSelect = revisionRequestUIBody.querySelector('#sgrupoderi') as HTMLSelectElement;
        pullSelect.value = pullValue || (!groupValue ? "100" : "");
        groupSelect.value = groupValue;

        const asignacion = groupValue ? "derivar" : "pull";

        // if(!asignacion){
        //   console.error("No se pudo determinar la asignación");
        //   alert("No se pudo determinar la asignación (error de la extension)");
        //   return;
        // }
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate())
        
        const formattedTestDate = yesterday.toISOString().split("T")[0]
        
        const dataToSendToCRM: crmRequest = {
          form_token: "",
          leadori: "Q",//Joha es Q
          leadfecha: formattedTestDate,
          leadname: leadData.recognized.name || "NNN",
          leadcel: formattedNumber,
          leadloca: leadData.recognized.location || "NNN",
          asignacion: asignacion,//puede ser derivar(grupo) o pull
          spullderi: (leadData.recognized.pull&&asignacion==="pull") ? leadData.recognized.pull : "100",
          producto: "2",//Default es 2
          gestion: "1",//Default es 1
          comentario: "",//Default es ""
          cargar: ""//Default es ""
        }
        if(asignacion === "derivar"){
          dataToSendToCRM.sgrupoderi = groupValue || "";
        }
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Enviar';
        submitButton.className = 'btn btn-primary submit-revision';
        revisionRequestUIBody.appendChild(submitButton);
        adviseSection.appendChild(revisionRequestUI)
        function setOnChangeListener( key: keyof crmRequest, setPullToAgua: boolean= false, setDeriToNull: boolean= false){
          if(!revisionRequestUIBody) {
            console.error('revisionRequestUIBody no encontrado');
            return;
          }
          const element = revisionRequestUIBody.querySelector(`#${key}`) as HTMLInputElement;
          if(!element) {
            console.error(`Elemento #${key} no encontrado`);
            return;
          }
          const elementToSelectType = element.tagName.toLowerCase() === 'select' ? 'change' : 'input';
          element.addEventListener(elementToSelectType, async (e: Event) => {
            dataToSendToCRM[key] = (e.target as HTMLInputElement).value;
            const oldLeadData = await chrome.storage.local.get([key]);
            console.log('oldLeadData', oldLeadData);
            await chrome.storage.local.set({ [key]: dataToSendToCRM[key] });
            if(setPullToAgua){
              dataToSendToCRM.spullderi = "100";
              pullSelect.value = "100";
              await chrome.storage.local.set({ spullderi: "100" });
            }
            if(setDeriToNull){
              dataToSendToCRM.sgrupoderi = "";
              groupSelect.value = "";
              await chrome.storage.local.set({ sgrupoderi: "" });
            }
          });
        }
        setOnChangeListener('leadname');
        setOnChangeListener('leadcel');
        setOnChangeListener('leadloca');
        setOnChangeListener('spullderi', false, true);
        setOnChangeListener('sgrupoderi', true);

        submitButton.addEventListener('click', async () => {
          console.log('Enviar: ', dataToSendToCRM);
          chrome.runtime.sendMessage({data: dataToSendToCRM, type: 'SEND_TO_CRM'})
          
          // const response = await sendToCRM(dataToSendToCRM);
          // console.log('Response: ', response);
        });
      
      })
      
    }
    return revisionRequestUI;
}