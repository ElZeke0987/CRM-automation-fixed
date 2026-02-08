
// import { areasInterior } from './utils/areasInterior.js';


const areasInterior=[//Hacer que se auto aprenda retro alimentandose del input
    { region: "", codigos: ["3464", "2478", "3489", "3484", "2235", "2223"] },
    
    // Resto de las provincias 
    { region: "Córdoba", codigos: ["351", "3537","3516", "3513", "3544","3518", "3548","3543", "353", "358", "3525", "3541", "3543", "3524", "2336", "3382", "3385", "3387", "3463", "34637"] },
    { region: "Corrientes", codigos: ["379", "3777", "3756", "3795", "3758", "3772", "3773", "3774", "3775", "3777", "3781", "3782", "3786", "3832"]},
    { region: "Formosa", codigos: ["370", "3705", "3718"] },
    { region: "La Rioja", codigos: ["380", "3804", "2236", "3825"] },
    { region: "Mendoza", codigos: ["261", "260", "263", "2616"] },
    { region: "Neuquén", codigos: ["299", "2942"] },
    { region: "Entre Ríos", codigos: ["343", "345", "3454", "3446"] },
    { region: "Misiones", codigos: ["376", "3755", "3764", "3757"] },
    { region: "Chubut", codigos: ["2804", "280", "2945"] },
    { region: "Chaco", codigos: ["362", "364", "3735"] },
    { region: "Santa Cruz", codigos: ["2966", "291", "2902"] },
    { region: "Salta", codigos: ["387", "3877"] },
    { region: "Catamarca", codigos: ["383", "3834"] },
    { region: "San Juan", codigos: ["264", "2644"] },
    { region: "San Luis", codigos: ["266"] },
    { region: "Tucumán", codigos: ["381", "3863", "3816"] },
    { region: "Jujuy", codigos: ["388"] },
    { region: "Santa Fe", codigos: ["342", "3492", "3415", "3404", "341", "2353", "2473", "2477", "3382", "3401", "3405", "3483" ] },
    { region: "La Pampa", codigos: ["2954"] },
    { region: "Santiago del Estero", codigos: ["385", "3857", "3856"] },
    { region: "Río Negro", codigos: ["2920", "298"] },
    { region: "Tierra del Fuego", codigos: ["2901"] }
];
let copyFunction = true;

const optGroup = document.querySelectorAll(".md-check .has-value")
const optGroupIcon = document.querySelectorAll(".md-check i")
const deriRadio = optGroup[1]
const deriRadioIcon = optGroupIcon[1]
const pullRadio = optGroup[0]
const pullRadioIcon = optGroupIcon[0]

const pullElementSelect = document.getElementById("spullderi")
const leadCelInp=document.getElementById("leadcel")
const leadLocationInp=document.getElementById("leadloca")

const nnnButton = document.querySelectorAll("#nn1")


const deriGroupSelect = document.getElementById("sgrupoderi")


//class=".x1f6kntn.xjb2p0i.x8r4c90.xo1l8bm.x1ic7a3i.x12xpedu._ao3e._aupe.copyable-text"

const listMessagesInChat = document.querySelectorAll(".x1f6kntn.xjb2p0i.x8r4c90.xo1l8bm.x1ic7a3i.x12xpedu._ao3e._aupe.copyable-text")

function mostrarcampo(){//Es como un re-render normal, solo para verificar sobre algo que ya paso, que es el click automatico sobre un radio
    //Resetea todas las posibles selecciones anteriores
    document.getElementById("operasig").style.display = "none";
    document.getElementById("soperasig").removeAttribute('required');
    document.getElementById("grupoderi").style.display = "none";
    document.getElementById("sgrupoderi").removeAttribute('required');
    document.getElementById("pullderi").style.display = "none";
    document.getElementById("spullderi").removeAttribute('required');

    var radiovalue = document.getElementsByName('asignacion') ;
    for (var radio of radiovalue){
        if (radio.checked) {    
            var radioid = radio.value;
        }
    }
    //Itera y finalmente muestra automaticamente la que corresponda
    if(radioid == 'asignar'){
        document.getElementById("operasig").style.display = "flex";
        document.getElementById("soperasig").setAttribute("required","");
    }
    if(radioid == 'derivar'){
        document.getElementById("grupoderi").style.display = "flex";
        document.getElementById("sgrupoderi").setAttribute("required","");  
    }
    if(radioid == 'pull'){
        document.getElementById("pullderi").style.display = "flex";
        document.getElementById("spullderi").setAttribute("required","");  
    }
    
}

const leadInputs = document.querySelectorAll("#leadname , #leadloca");

const soloLetras = /^[a-záéíóúüñ\s]$/i;
leadInputs.forEach((inp) => {
  inp.addEventListener('keypress', (ev) => {
    if (!soloLetras.test(ev.key)) {
      ev.preventDefault();          // bloquea números y símbolos al tipear
    }
  });
  inp.addEventListener('input', (ev) => {
    const limpio = ev.target.value.replace(/[^a-záéíóúüñ\s]/gi, '');
    if (limpio !== ev.target.value) {
      ev.target.value = limpio;     // limpia texto que llegó por paste/autofill
    }
  });
});

const pullByKey = {
    "1": 103,//Varela 1
    "2": 100,//Agua 2
    "3": 102,//Caba 3 
    '4': 101,//Noroeste 4
    "5": 104,//Sur 5   
}

async function getCopiedText() {
    return await navigator.clipboard.readText()
}

function formatNumber(num){
    return num.replace(/\D+/g, '')
}

function getAreaByNumber(areaNumber){
    for(let area of areasInterior){
        if(area.codigos.includes(areaNumber)){
            return area.region
        }
    }
    nnnButton[1].dispatchEvent(new Event("click", {bubbles: true}))
    
    return "NNN"
    
}

function setToInterior(areaNumber, isNNNAction){
    if(areaNumbers[areaNumber]){
        return
    }

    const area = getAreaByNumber(areaNumber)
    console.log("Area found:", area, "isNNNAction:", isNNNAction);
    leadLocationInp.value = area !== "NNN" ? area : (isNNNAction ? "NNN" : "No encontre esa area telefonica");
    leadLocationInp.dispatchEvent(new Event("input", {bubbles: true}))
    
    
    deriRadio.checked = true;
    mostrarcampo()
    deriRadio.dispatchEvent(new Event("change", { bubbles: true }));
    deriGroupSelect.value = 27;
    deriGroupSelect.dispatchEvent(new Event("change", { bubbles: true }));
}

const areaNumbers={
    "11": "yes",
    "221": "yes",
    "2213": "yes",
    "2214": "yes",
    "2216": "yes",
    "230": "yes",
    "237": "yes",
    "3848": "yes",   
    "2226": "yes",  
    "2323": "yes",

}

function setupPullRadio() {
    pullRadio.checked = true;
    mostrarcampo();
    pullRadio.dispatchEvent(new Event("change", { bubbles: true }));
}
        

function setAsNNN(num, areaNumber){

    
    leadCelInp.value = "+" + formatNumber(num)
    
    

    leadCelInp.dispatchEvent(new Event("input", {bubbles: true}))

    nnnButton.forEach((btn, i)=>{
        btn.dispatchEvent(new Event("click", {bubbles: true}))
    })
    
    
    pullElementSelect.value = 100;
    setToInterior(areaNumber, true);
    localStorage.setItem("lastWasNNN", "true");
}
 console.log("Testing: ", window.location.hostname)
// Función para sumar
function plusToStorage(valor, storageKey) {

    if(localStorage.getItem("lastWasNNN") === "true"){

        let contador = Number(localStorage.getItem("NNN_" + storageKey)) || 0;
        contador += valor;
        localStorage.setItem("NNN_" + storageKey, contador);
        localStorage.setItem("lastWasNNN", "false");
        console.log("NNN " + storageKey + " actualizado:", contador);
        return;
    }

    let contador = Number(localStorage.getItem(storageKey)) || 0;
    contador += valor;
    localStorage.setItem(storageKey, contador);
    //console.log("Número actualizado:", contador);
}
window.addEventListener("load", () => {
    if(window.location.hostname=="crm.jeny.com.ar"){
        
        const contactUpdateResult = document.querySelector("#statusmsg")
        if(contactUpdateResult.textContent){
            const content = contactUpdateResult.textContent;
            console.log("Contact update result:", content);
            if(content=="Se actualizó contacto!"){
                plusToStorage(1, "actualizado");
            }
            if(content=="Se agregó contacto!"){
                plusToStorage(1, "agregado");
            }
            console.log("Actualizados:", localStorage.getItem("actualizado") || 0);
            console.log("Agregados:", localStorage.getItem("agregado") || 0);

        }
        const botSelector = document.querySelector("select[name='leadori']");
        console.log("Bot selector found:", botSelector);
        if(botSelector){
            botSelector.value = "Q";
            botSelector.dispatchEvent(new Event("change", {bubbles: true}));
        }


        window.scrollTo({
            top: 250,        // altura en píxeles
            left: 0,         // casi siempre 0
            behavior: "smooth" // "smooth" para animado, "auto" para instantáneo
        });

    }
})

document.addEventListener("keypress", async (ev)=>{
    
//Make that the key combination, doesn-t happen when you-r writting on an input

// "EScribe mensaje a: num:.x1hx0egp.x6ikm8r.x1odjw0f.x1k6rcq7.x6prxxf"

//         .x1c4vz4f.x3nfvp2.xuce83p.x1bft6iq.x1i7k8ik.xq9mrsl.x6s0dn4
//        .xuxw1ft.x6ikm8r.x10wlt62.xlyipyv.x78zum5
//class=".x1iyjqo2 .x6ikm8r .x10wlt62 .x1n2onr6 .xlyipyv .xuxw1ft .x1rg5ohu ._ao3e"


    if(ev.key=="+"&&window.location.hostname=="web.whatsapp.com"){
        console.log("Changing copy function to ", copyFunction)
        copyFunction=!copyFunction
    }
    if(window.location.hostname=="crm.jeny.com.ar"){
        
        const awaitTextoCopiado = await getCopiedText();
        const areaNumber = awaitTextoCopiado.split(" ")[2]
        if(ev.key=="}"){
            console.log("banana")
            setAsNNN(awaitTextoCopiado, areaNumber)
        }
        if(ev.key=="{"||ev.key=="|"){
            
            setupPullRadio();
            setToInterior(areaNumber, false);
            console.log("Copiando texto en el input de numero")
            leadCelInp.value = "+" + formatNumber(awaitTextoCopiado)
            leadCelInp.dispatchEvent(new Event("input", {bubbles: true}))
        }
        
        
        
        if(ev.key=="Enter"||ev.key=="°"){
            const submitFinalButton = document.querySelector(".box-body button[type='submit']")
            console.log("submitFinalButton", submitFinalButton)
            console.log("reloading")
            submitFinalButton.dispatchEvent(new Event("click", {bubbles: true}))
            submitFinalButton.dispatchEvent(
                new MouseEvent("click", {
                    view: window,
                    bubbles: true,
                    cancelable: true
                })
            );
        }
        if(ev.key=="6"){
            console.log("Derivando a interior")
            deriRadio.checked = true;
            mostrarcampo()
            deriRadio.dispatchEvent(new Event("change", { bubbles: true }));
            deriGroupSelect.value = 27;
            deriGroupSelect.dispatchEvent(new Event("change", { bubbles: true }));
        }
        if(pullByKey[ev.key]){
            setupPullRadio()
            console.log("Tecla + shift: ", ev.key)
            pullElementSelect.value = pullByKey[ev.key]
            pullElementSelect.dispatchEvent(new Event("change", { bubbles: true }));
        }   
    }
        
    
    
})

let whatsappNumber;

const observer = new MutationObserver(async(mutations, obs) => {

    if(mutations[0].target.id=="statusmsg"){
        console.log("This result papu: ", mutations[0].target)
        return
    }
    
    if(window.location.hostname!="web.whatsapp.com"){
        
        return
    }

    //console.log("Mutation detected: ", listMessagesInChat)
    const whatsappNumberElement = document.querySelectorAll('.x1iyjqo2 .x6ikm8r .x10wlt62')
    const inputTextWithNumber= document.querySelectorAll('.x1hx0egp.x6ikm8r.x1odjw0f.x1k6rcq7.x6prxxf')
    const allMessages = document.querySelectorAll('x1n2onr6 .x1f6kntn.xjb2p0i.x8r4c90.xo1l8bm.x1ic7a3i.x12xpedu._ao3e._aupe.copyable-text')
    // const elementsToClear = document.querySelectorAll(".x1c4vz4f.x2lah0s.xdl72j9.xlese2p")

    // if(elementsToClear.length > 0){
    //     elementsToClear.forEach(element => {
    //         element.innerHTML = ""
    //     })
    // }

    const actualVisibleProfileNumber = whatsappNumberElement[1]?.innerHTML
    const actualInvisibleInpNumber = "+" + inputTextWithNumber[1]?.getAttribute("aria-label").replace(/^\D+|\.$/g, '')

    console.log("Still working? on visible profile number: ", actualVisibleProfileNumber, " and: ", actualInvisibleInpNumber)

    if (whatsappNumber!=actualVisibleProfileNumber && copyFunction) {

        whatsappNumber = typeof actualVisibleProfileNumber === 'string' ? actualVisibleProfileNumber : actualVisibleProfileNumber.textContent ? actualVisibleProfileNumber.textContent : actualInvisibleInpNumber
        
         try {
            await navigator.clipboard.writeText(whatsappNumber)
        } catch (err) {
            console.error('Error al copiar: ', err);
            // Aquí puedes mostrar un mensaje amigable al usuario
        }
        
    }
});
observer.observe(document.body, { childList: true, subtree: true });