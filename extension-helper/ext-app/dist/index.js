const domCRM = {
  operasig: () => document.getElementById("operasig"),
  soperasig: () => document.getElementById("soperasig"),
  grupoderi: () => document.getElementById("grupoderi"),
  sgrupoderi: () => document.getElementById("sgrupoderi"),
  pullderi: () => document.getElementById("pullderi"),
  spullderi: () => document.getElementById("spullderi"),
  deriGroupSelect: () => document.getElementById("sgrupoderi"),
  pullElementSelect: () => document.getElementById("spullderi"),
  nnnButton: () => document.querySelectorAll("#nn1"),
  leadInputs: () => document.querySelectorAll("#leadname, #leadloca"),
  leadLocationInp: () => document.getElementById("leadloca"),
  contactUpdateResult: () => document.querySelector("#statusmsg"),
  botSelector: () => document.querySelector("select[name='leadori']"),
  leadCelInp: () => document.getElementById("leadcel"),
  optGroup: () => document.querySelectorAll(".md-check .has-value"),
  optGroupIcon: () => document.querySelectorAll(".md-check i"),
  deriRadio: () => document.querySelectorAll(".md-check .has-value")[1],
  deriRadioIcon: () => document.querySelectorAll(".md-check i")[1],
  pullRadio: () => document.querySelectorAll(".md-check .has-value")[0],
  pullRadioIcon: () => document.querySelectorAll(".md-check i")[0],
  asignacionRadio: () => document.getElementsByName("asignacion")
};
const whatsappNumberSelector = `header 
.xuxw1ft.x6ikm8r.x10wlt62.xlyipyv.x78zum5 
.x1iyjqo2.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft.x1rg5ohu._ao3e`;
const inputTextWithNumberSelector = `.x1hx0egp.x6ikm8r.x1odjw0f.x1k6rcq7.x6prxxf`;
const allInMessagesSelector = `.message-in .x9f619.x1hx0egp.x1yrsyyn.xizg8k.xu9hqtb.xwib8y2 .copyable-text .copyable-text span`;
const allOutMessagesSelector = `.message-out .x9f619.x1hx0egp.x1yrsyyn.xizg8k.xu9hqtb.xwib8y2 .copyable-text .copyable-text span`;
const elementsToClearSelector = `.x1c4vz4f.x2lah0s.xdl72j9.xlese2p`;
function mergeMessages(messages) {
  const result = [];
  let buffer = "";
  let merging = false;
  let shouldContinueNext = false;
  for (let i = 0; i < messages.length; i++) {
    if (shouldContinueNext) {
      shouldContinueNext = false;
      continue;
    }
    const current = messages[i];
    const isOnlyNewline = current.trim() === "";
    const endsWithNewline = /\n\s*$/.test(current);
    if (endsWithNewline || isOnlyNewline || merging) {
      merging = true;
      if (!isOnlyNewline) {
        buffer += current.trim();
        buffer += " ";
      }
      const next = messages[i + 1];
      const nextContinues = next && (/\n\s*$/.test(next) || next.trim() === "");
      if (!nextContinues && next) {
        buffer += next.trim();
        shouldContinueNext = true;
        result.push(buffer.trim());
        buffer = "";
        merging = false;
      }
    } else {
      result.push(current.trim());
    }
  }
  return result;
}
function extractMessagesFromElement(selector) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      const el = document.querySelectorAll(selector);
      if (el) {
        const messages = Array.from(el).map((element) => element.textContent);
        console.log("crude messages", messages);
        const mergedMessages = mergeMessages(messages);
        clearInterval(interval);
        resolve(mergedMessages);
      }
      if (Date.now() - start > 1e4) {
        clearInterval(interval);
        reject(null);
      }
    }, 200);
  });
}
const domWsp = {
  whatsappNumberElement: () => document.querySelector(whatsappNumberSelector),
  inputTextWithNumber: () => document.querySelectorAll(inputTextWithNumberSelector)[1],
  allInMessages: async () => await extractMessagesFromElement(allInMessagesSelector),
  allOutMessages: async () => await extractMessagesFromElement(allOutMessagesSelector),
  elementsToClear: () => document.querySelectorAll(elementsToClearSelector)
};
const pullByKey = {
  "1": "103",
  //Varela 1
  "2": "100",
  //Agua 2
  "3": "102",
  //Caba 3 
  "4": "101",
  //Noroeste 4
  "5": "104"
  //Sur 5   
};
const copyFunctionAccessor = {
  val: true,
  set: (value) => copyFunctionAccessor.val = value
};
function formatNumber(num) {
  return num.replace(/\D+/g, "");
}
async function getCopiedText() {
  const crudeJSON = await navigator.clipboard.readText();
  try {
    return JSON.parse(crudeJSON);
  } catch {
    return void 0;
  }
}
async function plusToStorage(valor, storageKey, forceNNN = false) {
  const lastWasNNN = await chrome.storage.local.get("lastWasNNN");
  if (lastWasNNN.lastWasNNN === "true" || forceNNN) {
    let contador2 = parseInt(localStorage.getItem("NNN_" + storageKey) || "0");
    contador2 += valor;
    chrome.storage.local.set({ [`NNN_${storageKey}`]: contador2.toString() });
    chrome.storage.local.set({ "lastWasNNN": "false" });
    console.log("NNN " + storageKey + " actualizado:", contador2);
    return;
  }
  let contador = Number(localStorage.getItem(storageKey)) || 0;
  contador += valor;
  chrome.storage.local.set({ [storageKey]: contador.toString() });
}
const areaNumbers = {
  "11": "yes",
  "221": "yes",
  "2213": "yes",
  "2214": "yes",
  "2215": "yes",
  "2216": "yes",
  "2217": "yes",
  "230": "yes",
  "237": "yes",
  "3848": "yes",
  "2226": "yes",
  "2323": "yes"
};
const areasInterior = [
  //Hacer que se auto aprenda retro alimentandose del input
  { region: "", codigos: ["3464", "2478", "3489", "3484", "2235", "2223"] },
  // Resto de las provincias 
  { region: "Córdoba", codigos: ["351", "3537", "3516", "3513", "3544", "3518", "3548", "3543", "353", "358", "3525", "3541", "3543", "3524", "2336", "3382", "3385", "3387", "3463", "34637"] },
  { region: "Corrientes", codigos: ["379", "3777", "3756", "3795", "3758", "3772", "3773", "3774", "3775", "3777", "3781", "3782", "3786", "3832"] },
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
  { region: "San Luis", codigos: ["266", "2665", "2664"] },
  { region: "Tucumán", codigos: ["381", "3863", "3816"] },
  { region: "Jujuy", codigos: ["388"] },
  { region: "Santa Fe", codigos: ["342", "3492", "3415", "3404", "341", "2353", "2473", "2477", "3382", "3401", "3405", "3483"] },
  { region: "La Pampa", codigos: ["2954", "2334"] },
  { region: "Santiago del Estero", codigos: ["385", "3857", "3856"] },
  { region: "Río Negro", codigos: ["2920", "298"] },
  { region: "Tierra del Fuego", codigos: ["2901"] }
];
function setupPullRadio() {
  const pullRadioEl = domCRM.pullRadio();
  pullRadioEl.checked = true;
  mostrarcampo();
  pullRadioEl.dispatchEvent(new Event("change", { bubbles: true }));
}
function setAsNNN({ num, areaNumber }) {
  const leadCelInp = domCRM.leadCelInp();
  const nnnButton = domCRM.nnnButton();
  const pullElementSelect = domCRM.pullElementSelect();
  leadCelInp.value = "+" + formatNumber(num);
  leadCelInp.dispatchEvent(new Event("input", { bubbles: true }));
  nnnButton.forEach((btn) => {
    btn.dispatchEvent(new Event("click", { bubbles: true }));
  });
  pullElementSelect.value = "100";
  setToInterior({ areaNumber, isNNNAction: true });
  localStorage.setItem("lastWasNNN", "true");
}
function setToInterior({ areaNumber, isNNNAction }) {
  if (areaNumbers[areaNumber]) {
    return;
  }
  const area = getAreaByNumber(areaNumber);
  console.log("Area found:", area, "isNNNAction: ", isNNNAction);
  const leadLocationInpEl = domCRM.leadLocationInp();
  leadLocationInpEl.value = area !== "NNN" ? area : isNNNAction ? "NNN" : "No encontre esa area telefonica";
  leadLocationInpEl.dispatchEvent(new Event("input", { bubbles: true }));
  const deriRadioEl = domCRM.deriRadio();
  deriRadioEl.checked = true;
  mostrarcampo();
  deriRadioEl.dispatchEvent(new Event("change", { bubbles: true }));
  const deriGroupSelectEl = domCRM.deriGroupSelect();
  deriGroupSelectEl.value = "27";
  deriGroupSelectEl.dispatchEvent(new Event("change", { bubbles: true }));
}
function getAreaByNumber(areaNumber) {
  for (let area of areasInterior) {
    if (area.codigos.includes(areaNumber)) {
      return area.region;
    }
  }
  const nnnButtonEl = domCRM.nnnButton();
  if (nnnButtonEl.length > 1) {
    nnnButtonEl[1].dispatchEvent(new Event("click", { bubbles: true }));
  }
  if (areaNumbers[areaNumber] == "yes") {
    return "agua";
  }
  return "NNN";
}
function mostrarcampo() {
  const operasigEl = domCRM.operasig();
  const soperasigEl = domCRM.soperasig();
  const grupoderiEl = domCRM.grupoderi();
  const sgrupoderiEl = domCRM.sgrupoderi();
  const pullderiEl = domCRM.pullderi();
  const spullderiEl = domCRM.spullderi();
  if (!operasigEl || !soperasigEl || !grupoderiEl || !sgrupoderiEl || !pullderiEl || !spullderiEl) {
    return;
  }
  operasigEl.style.display = "none";
  soperasigEl.removeAttribute("required");
  grupoderiEl.style.display = "none";
  sgrupoderiEl.removeAttribute("required");
  pullderiEl.style.display = "none";
  spullderiEl.removeAttribute("required");
  const radiovalues = domCRM.asignacionRadio();
  let radioid;
  if (!radiovalues || radiovalues.length == 0) return;
  radiovalues.forEach((radio) => {
    if (radio.checked) {
      radioid = radio.value;
    }
  });
  if (radioid == "asignar") {
    operasigEl.style.display = "flex";
    soperasigEl.setAttribute("required", "");
  }
  if (radioid == "derivar") {
    grupoderiEl.style.display = "flex";
    sgrupoderiEl.setAttribute("required", "");
  }
  if (radioid == "pull") {
    pullderiEl.style.display = "flex";
    spullderiEl.setAttribute("required", "");
  }
}
function insertOnInputs(leadData) {
  console.log("insertOnInputs", leadData);
  const areaNumber = leadData.whatsappNumber.split(" ")[2];
  setupPullRadio();
  setToInterior({ areaNumber, isNNNAction: false });
  console.log("Copiando texto en el input de numero y de localidad");
  const leadCelInp = domCRM.leadCelInp();
  const leadLocInp = domCRM.leadLocationInp();
  if (leadCelInp) {
    leadCelInp.value = "+" + formatNumber(leadData.whatsappNumber);
    leadCelInp.dispatchEvent(new Event("input", { bubbles: true }));
  }
  if (leadLocInp) {
    leadLocInp.value = leadData.recognized.location;
    console.log("leadLocInp.value", leadLocInp.value);
    leadLocInp.dispatchEvent(new Event("input", { bubbles: true }));
  }
  if (!leadData.recognized.pull) ;
  else if (leadData.recognized.pull && leadData.recognized.pull != "interior") {
    setupPullRadio();
    const pullElementSelect = domCRM.pullElementSelect();
    pullElementSelect.value = leadData.recognized.pull;
    pullElementSelect.dispatchEvent(new Event("change", { bubbles: true }));
    console.log("leadData.recognized.pull", leadData.recognized.pull);
  }
}
function advise({ active, text, timeout = 2500 }) {
  const appElement = document.querySelector("#app");
  if (appElement) {
    const advisesSection = document.querySelector(".advises-section");
    if (advisesSection) {
      const copyFunctionAdviseElement = document.createElement("div");
      copyFunctionAdviseElement.className = `copy-function-advise ${active ? "active-copy" : "inactive-copy"}`;
      copyFunctionAdviseElement.innerHTML = text || "HOLA ES UNDIFINID";
      advisesSection.appendChild(copyFunctionAdviseElement);
      setTimeout(() => {
        copyFunctionAdviseElement.remove();
      }, timeout);
    } else {
      const copyFunctionAdviseElement = document.createElement("div");
      copyFunctionAdviseElement.className = `copy-function-advise ${active ? "active-copy" : "inactive-copy"}`;
      copyFunctionAdviseElement.innerHTML = "No se encontro el elemento advises-section, creandolo...";
      appElement.appendChild(copyFunctionAdviseElement);
      setTimeout(() => {
        copyFunctionAdviseElement.remove();
      }, timeout);
      const advisesSection2 = document.createElement("div");
      advisesSection2.className = "advises-section";
      appElement.appendChild(advisesSection2);
    }
  } else {
    console.log("No se encontro el elemento app");
  }
}
async function saveLeadData(data) {
  if (chrome.storage) {
    await chrome.storage.local.set({ leadData: data });
  }
}
async function resetLeadData() {
  if (chrome.storage && window.location.hostname == "crm.jeny.com.ar") {
    await chrome.storage.local.set({ leadData: { whatsappNumber: "", recognized: { location: "", pull: "" } } });
  }
}
async function ToolPanel() {
  const toolPanelIsActive = localStorage.getItem("toolPanelIsActive");
  localStorage.setItem("toolPanelIsActive", toolPanelIsActive === "true" ? "false" : "true");
  if (toolPanelIsActive === "false") {
    const toolPanels = document.querySelectorAll(".tool-panel");
    toolPanels.forEach((toolPanel) => {
      toolPanel.remove();
    });
    return;
  }
  const appElement = document.querySelector("#app");
  const adviseSection = document.querySelector(".advises-section");
  if (appElement) {
    if (adviseSection) {
      const toolPanel = document.createElement("div");
      toolPanel.className = "tool-panel";
      toolPanel.innerHTML = "Tool Panel";
      adviseSection.appendChild(toolPanel);
      console.log("Advise section found ", adviseSection);
    } else {
      console.log("Advise section not found");
      const newAdviseSection = document.createElement("div");
      newAdviseSection.className = "advises-section";
      appElement.appendChild(newAdviseSection);
      const toolPanel = document.createElement("div");
      toolPanel.className = "tool-panel";
      toolPanel.innerHTML = "Tool Panel";
      newAdviseSection.appendChild(toolPanel);
    }
  }
}
async function handleKeyInyected(ev) {
  console.log("Key pressed: ", ev.key);
  if (window.location.hostname == "web.whatsapp.com") {
    if (ev.key == "F8") {
      ToolPanel();
    }
    if (ev.key == "-") {
      console.log("Changing copy function to false");
      copyFunctionAccessor.set(false);
      advise({ active: false, text: "Copy function disabled" });
    }
    if (ev.key == "+") {
      console.log("Changing copy function to true");
      copyFunctionAccessor.set(true);
      advise({ active: true, text: "Copy function enabled" });
    }
  }
  if (window.location.hostname == "crm.jeny.com.ar") {
    if (ev.key == "-") {
      console.log("Resetting lead data");
      resetLeadData();
      return;
    }
    const awaitTextoCopiado = await getCopiedText();
    if (awaitTextoCopiado) {
      const areaNumber = awaitTextoCopiado.whatsappNumber.split(" ")[2];
      if (ev.key == "}") {
        console.log("awaitTextoCopiado", awaitTextoCopiado);
        setAsNNN({ num: awaitTextoCopiado.whatsappNumber, areaNumber });
      }
      if (ev.key == "{" || ev.key == "|") {
        insertOnInputs(awaitTextoCopiado);
      }
    }
    if (ev.key == "Enter" || ev.key == "°") {
      const submitFinalButton = document.querySelector(".box-body button[type='submit']");
      console.log("submitFinalButton", submitFinalButton);
      console.log("reloading");
      const submitFinalButtonEl = submitFinalButton;
      submitFinalButtonEl.dispatchEvent(new Event("click", { bubbles: true }));
      submitFinalButtonEl.dispatchEvent(
        new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true
        })
      );
      console.log("resetting lead data");
      resetLeadData();
    }
    if (ev.key == "6") {
      console.log("Derivando a interior");
      const deriRadio = domCRM.deriRadio();
      const deriGroupSelect = domCRM.deriGroupSelect();
      if (deriRadio) {
        deriRadio.checked = true;
        mostrarcampo();
        deriRadio.dispatchEvent(new Event("change", { bubbles: true }));
      }
      if (deriGroupSelect) {
        deriGroupSelect.value = "27";
        deriGroupSelect.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
    if (pullByKey[ev.key]) {
      setupPullRadio();
      console.log("Tecla + shift: ", ev.key);
      const pullElementSelect = domCRM.pullElementSelect();
      pullElementSelect.value = pullByKey[ev.key];
      pullElementSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
}
function onWindowLoadInyected(e) {
  if (window.location.hostname == "crm.jeny.com.ar") {
    const contactUpdateResult = domCRM.contactUpdateResult();
    const lastWasNNN = localStorage.getItem("lastWasNNN") === "true";
    if (contactUpdateResult?.textContent && !lastWasNNN) {
      const content = contactUpdateResult.textContent;
      console.log("Contact update result:", content);
      if (content == "Se actualizó contacto!") {
        plusToStorage(1, "actualizado");
      }
      if (content == "Se agregó contacto!") {
        plusToStorage(1, "agregado");
      }
      console.log("Actualizados:", localStorage.getItem("actualizado") || 0);
      console.log("Agregados:", localStorage.getItem("agregado") || 0);
    }
    const botSelector = domCRM.botSelector();
    console.log("Bot selector found:", botSelector);
    if (botSelector) {
      botSelector.value = "Q";
      botSelector.dispatchEvent(new Event("change", { bubbles: true }));
    }
    window.scrollTo({
      top: 250,
      // altura en píxeles
      left: 0,
      // casi siempre 0
      behavior: "smooth"
      // "smooth" para animado, "auto" para instantáneo
    });
  }
}
async function onWindowFocus(e) {
  console.log("focus event for back listeners: ", e);
  if (window.location.href.includes("crm.jeny.com.ar")) {
    chrome.storage.local.get(["leadData"], (leadDResult) => {
      console.log("leadData ", window.location.href, leadDResult.leadData);
      const leadData = leadDResult.leadData;
      if (leadData && leadData.whatsappNumber && leadData.recognized) {
        insertOnInputs(leadData);
        plusToStorage(1, "copiedTexts");
        if (leadData.recognized.location) {
          console.log("resetting lead data");
          localStorage.setItem("lastWasNNN", "false");
          resetLeadData();
        } else {
          const areaNumber = leadData.whatsappNumber.split(" ")[2];
          setAsNNN({ num: leadData.whatsappNumber, areaNumber });
        }
      }
    });
  }
}
function setupListeners({ catchNumbersOnInputs = true, onWindowLoadFunc = onWindowLoadInyected, keyHandlerFunc = handleKeyInyected }) {
  domCRM.leadInputs()?.forEach((inp) => {
    if (!catchNumbersOnInputs) return;
    const soloLetras = /^[a-záéíóúüñ\s]$/i;
    inp.addEventListener("keypress", (ev) => {
      if (!soloLetras.test(ev.key)) {
        ev.preventDefault();
      }
    });
    inp.addEventListener("input", (ev) => {
      const limpio = ev.target.value.replace(/[^a-záéíóúüñ\s]/gi, "");
      if (limpio !== ev.target.value) {
        ev.target.value = limpio;
      }
    });
  });
  window.addEventListener("load", onWindowLoadFunc);
  document.addEventListener("keydown", async (ev) => await keyHandlerFunc(ev));
  window.addEventListener("focus", async (ev) => await onWindowFocus(ev));
}
function normalize(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}
const nameDict = {
  "name": "nombres",
  "options": {
    "Carolina": ["caro", "caroulin", "carolina"],
    "Nicol": ["nicki", "nikki", "niki"],
    "Martina": ["martu"],
    "Benjamín": ["benja"],
    "Luciano": ["lucho"],
    "Agustín": ["agus"],
    "Oscar": ["oski"],
    "Adriana": ["adri"],
    "Lautaro": ["lauti", "taro"],
    "Brian": ["bri", "briancho"],
    "Brayan": ["bray", "brayanton", "brayi"],
    "Brenda": ["bren", "brendi"],
    "Axel": ["axe", "ax"],
    "Micaela": ["mica", "miki"],
    "Delfina": ["delfi", "fina"],
    "Lucas": ["lucas", "luquitas"],
    "Gustavo": ["tavo", "gus"],
    "Alan": ["alancito", "alancho"],
    "Ariel": ["ari", "arielito"],
    "Omar": ["omarcito", "omarito"],
    "Romina": ["romi", "rominita"],
    "Susana": ["susi", "susanita"],
    "Candelaria": ["cande", "candela"],
    "Simón": ["simoncito", "simi"],
    "Damián": ["dami", "dame"],
    "Néstor": ["nes", "nestorcito"],
    "Hernán": ["nano", "her"],
    "Grasiela": ["grasi", "grasiela"],
    "Luciana": ["luchu", "luchita"],
    "Abril": ["abri", "abrilita"],
    "Antonella": ["antona", "antonella"],
    "Milagros": ["mili", "milas"],
    "Yamila": ["yami", "yamila"],
    "Melina": ["meli", "mel"],
    "Aldana": ["aldanita", "dana"],
    "Celeste": ["cele", "celes"],
    "Érica": ["eri", "eric"],
    "Samanta": ["sami", "sam"],
    "Tamara": ["tami", "tam"],
    "Gino": ["ginito", "gi"],
    "Ciro": ["ciru", "cirilo"],
    "Mario": ["marito", "mari"],
    "Cristóbal": ["cris", "cristo"],
    "Gregorio": ["grego", "goyo"],
    "Dante": ["danti", "dantecito"],
    "Ismael": ["isma", "ismi"],
    "Baltasar": ["baltas", "balti"],
    "Lorenzo": ["lenzo", "loren"],
    "William": ["willi", "wuilli", "wlli"],
    "Willian": ["williannn"],
    "Wiliam": ["wili", "wuili"],
    "Wilian": ["wiliann"],
    "Aldo": ["aldito", "aldín"],
    "Amador": ["amad", "amadorcito"],
    "Aníbal": ["aní", "balito"],
    "Armando": ["arman", "mandito"],
    "Azucena": ["azus", "cena"],
    "Amparo": ["ampa", "paro"],
    "Asunción": ["asun", "chon"],
    "Aroa": ["aro", "aroa"],
    "Aina": ["aini", "ainita"],
    "Abigaíl": ["abi", "abigail"],
    "Gaston": ["gasty", "gastucho"],
    "Adrián": ["adri", "rian"],
    "Alba": ["albi", "albita"],
    "Alberto": ["beto", "alber"],
    "Alejandra": ["ale", "jandra"],
    "Alejandro": ["jandro", "alex"],
    "Alicia": ["lici", "licha"],
    "Alonso": ["onso", "alonsito"],
    "Amalia": ["mali", "amalita"],
    "Ana": ["anita", "ani"],
    "Andrés": ["andy", "dres"],
    "André": ["andreh", "andre"],
    "Ángel": ["angelito", "gel", "angel"],
    "Antonia": ["toni", "tonita"],
    "Antonio": ["tonio", "toño"],
    "Araceli": ["ara", "celi"],
    "Arturo": ["turo", "arturito"],
    "Aurora": ["auro", "rora"],
    "Amadeo": ["amade", "deo"],
    "Aarón": ["aroncito", "aaron"],
    "Agostina": ["agos", "tina"],
    "Anabel": ["ana", "bel"],
    "Annabel": ["anna"],
    "Anacleto": ["cleto", "anac"],
    "Arnaldo": ["arna", "naldo"],
    "Arnold": ["Arni", "arnol"],
    "Beatriz": ["bea", "triz"],
    "Berta": ["berti", "bertita"],
    "Blanca": ["blanqui", "blanquita"],
    "Bruno": ["bru", "brunito"],
    "Bárbara": ["barbi", "barbarita"],
    "Bayron": ["Bay"],
    "Bairon": ["Bairon"],
    "Belén": ["bele", "belu"],
    "Benito": ["beni", "bencho"],
    "Bernardino": ["bernard", "dino"],
    "Bautista": ["bauti", "taista"],
    "Brigida": ["brigi", "gida"],
    "Blas": ["blasito", "blasi"],
    "Basilio": ["basi", "silio"],
    "Bernardo": ["berna", "nardito"],
    "Benicio": ["beni", "nicio"],
    "Brandon": ["bran", "brandin"],
    "Candelario": ["lario"],
    "Candela": ["cande"],
    "Claudio": ["clau", "claudito"],
    "Camila": ["cami", "mila"],
    "Carlos": ["carlitos", "charli"],
    "Carmen": ["carmencita", "menchu"],
    "Carola": ["carol"],
    "Carla": ["car", "carli"],
    "Camilo": ["milo"],
    "Catalina": ["cata", "catali"],
    "Cecilia": ["ceci", "cecita"],
    "Celia": ["celi", "celita"],
    "Clara": ["clari", "clarita"],
    "Claudia": ["clau", "claudita"],
    "Concepción": ["conchi", "conchita"],
    "Cristina": ["cristina"],
    "Cristian": ["cristian"],
    "Cristofer": ["Cristof", "Cristo"],
    "César": ["cesarito", "sesa"],
    "Cirilo": ["ciri", "rilo"],
    "Crisanto": ["crisan", "santo"],
    "Cruz": ["crucita", "cruzi"],
    "Celestino": ["celes", "tino"],
    "Clemente": ["clemen", "mento"],
    "Consuelo": ["consu", "suelo"],
    "Priscila": ["pri"],
    "Elizabeth": ["elizabet", "beth", "elisabeth"],
    "Dacio": ["dacito", "daci"],
    "Dámaso": ["dama", "masito"],
    "Demetrio": ["deme", "metrio"],
    "Donato": ["don", "donatito"],
    "Dorotea": ["doro", "teita"],
    "Daniel": ["dan", "danielito"],
    "Dayana": ["daya"],
    "Dayara": ["dayar"],
    "Dayra": ["day"],
    "Daira": ["dai"],
    "Daiana": ["daiana", "daianita"],
    "Daniela": ["dani", "danita"],
    "David": ["davi", "davidcito"],
    "Diana": ["didi", "dianita"],
    "Diego": ["dieguito", "diegote"],
    "Dolores": ["lola", "lolita"],
    "Damian": ["Dami", "Damiansito"],
    "Dardo": ["dardi", "dardito"],
    "Débora": ["debi", "bora"],
    "Diamela": ["diame", "mela"],
    "Dionisio": ["dioni", "nisio"],
    "Dorila": ["dori", "rila"],
    "Edgar": ["ed", "edgarcito"],
    "Elena": ["elenita", "lele"],
    "Eliana": ["eli", "eliana"],
    "Elsa": ["elsita", "elsi"],
    "Emilia": ["emi", "emilita"],
    "Enrique": ["quique", "enri"],
    "Ernesto": ["neto", "ernestito"],
    "Esperanza": ["esper", "pera"],
    "Esteban": ["este", "teban"],
    "Eva": ["evita", "evi"],
    "Emiliano": ["emi", "miliano"],
    "Enzo": ["enzito", "enzo"],
    "Ezequiel": ["eze", "zeke"],
    "Elías": ["eliasito", "elias"],
    "Eduardo": ["eddie", "lalo"],
    "Emanuel": ["manu", "ema"],
    "Efraín": ["efra", "frai"],
    "Eladio": ["elad", "ladio"],
    "Mayra": ["may", "mayrita"],
    "Fabián": ["fabi", "fabo"],
    "Fabiola": ["fabi", "fiola"],
    "Federico": ["fede", "federi"],
    "Felipe": ["feli", "pipe"],
    "Fernanda": ["fer", "nanda"],
    "Fernando": ["fer", "nando"],
    "Francisco": ["paco", "pancho"],
    "Francisca": ["franci", "cisca"],
    "Florencia": ["flore", "floren"],
    "Flor": ["florsi", "flr", "for"],
    "Facundo": ["facu", "facus"],
    "Fermín": ["fermi", "mincho"],
    "Fidel": ["fidelito", "fide"],
    "Florencio": ["flor", "rencio"],
    "Franco": ["fran", "franquito", "fran", "franky", "franki"],
    "Fabricio": ["fabri", "fabro"],
    "Fausto": ["faus", "faustito"],
    "Gabriel": ["gabo", "gabrielito"],
    "Gabriela": ["gabi", "gabita"],
    "Gerardo": ["gera", "gerry"],
    "Germán": ["germanito", "manín"],
    "Gloria": ["glori", "glorita"],
    "Gonzalo": ["gonza", "gonzalo"],
    "Guadalupe": ["lupe", "lupita"],
    "Guillermo": ["memo", "guille", "guillermito", "gille", "guille"],
    "Héctor": ["hectorcito", "tor", "hector", "ector"],
    "Helena": ["helenita", "lena"],
    "Horacio": ["hora", "racio"],
    "Hugo": ["huguito", "hugón"],
    "Ignacio": ["nacho", "ignacio"],
    "Iker": ["ike", "ikerito"],
    "Inés": ["inesita", "nesi"],
    "Irene": ["ire", "irenita"],
    "Isabel": ["isa", "bel"],
    "Isabella": ["bella", "isa"],
    "Israel": ["isra", "rael"],
    "Iván": ["ivancito", "ivancho"],
    "Inocencio": ["inocen", "cencio"],
    "Indalecio": ["inda", "lecio"],
    "Irineo": ["iri", "rineo"],
    "Isidro": ["isi", "sidro"],
    "Ivo": ["ivito", "ivón"],
    "Isaías": ["Isaí", "Saías"],
    "Jacky": ["jacki"],
    "Jacinto": ["cinto", "jacincito"],
    "Javier": ["javi", "javo"],
    "Jimena": ["jime", "mena"],
    "Joaquín": ["joaco", "quin"],
    "Jorge": ["jor", "georgie"],
    "José": ["pepe", "joselito"],
    "Josué": ["josu", "sue"],
    "Juan": ["juancito", "juancho", "juan"],
    "Juana": ["juana", "juanita"],
    "Julia": ["juli", "julita"],
    "Julio": ["julito", "julión"],
    "Justo": ["justito", "tito"],
    "Jeremías": ["jere", "mías"],
    "Jesús": ["jesu", "chus"],
    "Jonás": ["joni", "jonasito"],
    "Karen": ["kari", "karencita"],
    "Kevin": ["kev", "kevito"],
    "Karola": ["karola"],
    "Karol": ["karol"],
    "Laura": ["lauri", "laurita"],
    "Leonardo": ["leo", "leonardito"],
    "Leticia": ["leti", "letic"],
    "Lidia": ["lidi", "lidita"],
    "Liliana": ["lili", "lilianita"],
    "Lorena": ["lore", "lorenita"],
    "Lourdes": ["lourditas", "lulú"],
    "Lucía": ["luci", "lucita"],
    "Luis": ["lucho", "luisito"],
    "Luisa": ["lui", "luisita"],
    "Leandro": ["lean", "drito"],
    "Lionel": ["lion", "lio"],
    "Lisandro": ["lisan", "sandrito"],
    "Lázaro": ["laza", "zarito"],
    "Ludovico": ["ludo", "vico"],
    "Marco": ["marquito", "marcol"],
    "Margarita": ["marga", "margarit"],
    "María": ["marita", "mari"],
    "Marta": ["martita", "marti"],
    "Mauricio": ["mau", "mauris"],
    "Maximiliano": ["max", "maxi"],
    "Mercedes": ["meche", "merche"],
    "Mónica": ["moni", "moniquita"],
    "Mateo": ["mate", "teo"],
    "Matías": ["mati", "tías"],
    "Martín": ["tin", "martincito"],
    "Máximo": ["maxi", "max"],
    "Marcos": ["marquitos", "marcol"],
    "Manuel": ["manu", "manuelito"],
    "Mauro": ["mauri", "maurito"],
    "Mariano": ["marian", "riano"],
    "Miguel": ["migue", "miguelito"],
    "Marcelo": ["chelito", "marce"],
    "Nadia": ["nadi", "nadia"],
    "Natalia": ["nata", "talita"],
    "Nicolás": ["nico", "nicolasito"],
    "Noelia": ["noe", "noelita"],
    "Nora": ["norita", "nori"],
    "Octavio": ["octa", "tavio"],
    "Olga": ["olguita", "olgi"],
    "Óscar": ["oski", "oscarcito"],
    "Osvaldo": ["osva", "valdo"],
    "Pablo": ["pablito", "pablete"],
    "Patricia": ["patri", "paty"],
    "Patricio": ["pato", "patrio"],
    "Paula": ["pau", "paulita"],
    "Pedro": ["pedrito", "perico", "pedro"],
    "Pilar": ["pili", "pilarcita"],
    "Rafael": ["rafa", "rafaelito"],
    "Ramón": ["moncho", "ramoncito"],
    "Raquel": ["raque", "quel"],
    "Rebeca": ["rebe", "beca"],
    "Renata": ["ren", "nata"],
    "Ricardo": ["richi", "riky"],
    "Roberto": ["beto", "robert"],
    "Rodrigo": ["rodri", "ro"],
    "Rocío": ["ro", "roci"],
    "Rosa": ["rosi", "rosita"],
    "Rosario": ["charo", "chari"],
    "Rubén": ["rubencito", "rub"],
    "Renato": ["ren", "nato"],
    "Ramiro": ["rami", "ramirito"],
    "Raúl": ["raulito", "rau"],
    "Rogelio": ["roge", "rogel"],
    "Román": ["roman", "romancito"],
    "Rufino": ["rufi", "finito"],
    "Ruth": ["ruty", "ruti", "rut"],
    "Salvador": ["salva", "chava"],
    "Samuel": ["samu", "samuelito"],
    "Sandra": ["sandi", "sandrita"],
    "Santiago": ["santi", "yago"],
    "Sara": ["sarita", "sari"],
    "Sebastián": ["seba", "sebas"],
    "Serafín": ["sera", "fino"],
    "Sergio": ["serch", "sergito"],
    "Silvia": ["silvi", "silvita"],
    "Sofía": ["sofi", "sofis"],
    "Soledad": ["sole", "soled"],
    "Santino": ["santi", "santino"],
    "Silvio": ["silvi", "silvito"],
    "Saúl": ["saulito", "sauli"],
    "Santos": ["santitos", "santos"],
    "Samira": ["sami"],
    "Sunilda": ["suni", "suny", "sunil"],
    "Teresa": ["tere", "teresita"],
    "Timoteo": ["tim", "teo"],
    "Tomás": ["tomi", "tomasito"],
    "Trinidad": ["trini", "nidad"],
    "Thiago": ["tiago", "tiaguito"],
    "Teodoro": ["teo", "doro"],
    "Tadeo": ["tade", "tadito"],
    "Tobías": ["tobi", "bías", "tob"],
    "Tristán": ["tris", "triste"],
    "Toribio": ["tori", "bío"],
    "Tarsicio": ["tarso", "sicio"],
    "Telmo": ["tel", "telmito"],
    "Úrsula": ["ursi", "urula"],
    "Uriel": ["uri", "rielito"],
    "Urbano": ["urba", "bano"],
    "Ubaldo": ["uba", "baldo"],
    "Umberto": ["umber", "bertito"],
    "Uziel": ["uzi", "zielito"],
    "Ulrico": ["ulri", "ricito"],
    "Ursino": ["ursi", "sinito"],
    "Ulises": ["uli", "ulisesito"],
    "Ulfrido": ["ulfri", "frido"],
    "Valentín": ["valen", "valent"],
    "Víctor": ["viti", "victor"],
    "Vladimir": ["vladi", "mir"],
    "Valerio": ["vale", "lerio"],
    "Vasco": ["vasc", "vascu"],
    "Víctor Hugo": ["vitu", "huguito"],
    "Ventura": ["ventu", "turita"],
    "Virgilio": ["virgi", "gilio"],
    "Vito": ["vitito", "vitón"],
    "Valentina": ["valen", "valent"],
    "Valeria": ["vale", "valerita"],
    "Vanesa": ["vane", "vanesita", "vanessa"],
    "Verónica": ["vero", "verito"],
    "Vicente": ["vicho", "vicen"],
    "Victoria": ["vicky", "vic"],
    "Violeta": ["vio", "violet"],
    "Walter": ["walt", "waltito"],
    "Wendy": ["wen", "wendyta"],
    "Wilfredo": ["wil", "fredo"],
    "Waldemar": ["walde", "demar"],
    "Wenceslao": ["wen", "wencho"],
    "Winston": ["wins", "stoni"],
    "Wilson": ["wils", "soni"],
    "Wagner": ["wag", "gnerito"],
    "Warren": ["war", "rencito"],
    "Washington": ["wash", "toni"],
    "Ximena": ["xime", "mema"],
    "Xavier": ["xavi", "xavito"],
    "Xenón": ["xeno", "xenito"],
    "Xandro": ["xan", "drito"],
    "Xulian": ["xuli", "lian"],
    "Xerxes": ["xerx", "xerxito"],
    "Xabier": ["xabi", "bier"],
    "Xenio": ["xeni", "nito"],
    "Ximun": ["ximu", "mun"],
    "Xoel": ["xoe", "xoelito"],
    "Xurxo": ["xur", "xurxito"],
    "Yolanda": ["yoli", "yolandita"],
    "Yvette": ["yve", "yvettita"],
    "Yair": ["yai", "yairito"],
    "Yeray": ["yer", "rayito"],
    "Yamil": ["yami", "mil"],
    "Yonatan": ["yona", "tan"],
    "Yaco": ["yac", "yacito"],
    "Yerko": ["yerk", "yerkito"],
    "Yeferson": ["yefe", "son"],
    "Yuri": ["yuri", "yurito"],
    "Yeremías": ["yere", "mías"],
    "Zacarías": ["zaca", "zacar"],
    "Zoe": ["zo", "zoecita"]
  }
};
const noroestePullLocs = [
  //101
  "isidro casanova",
  "gonzales catan",
  "la matanza",
  "tapiales",
  "moron",
  "moreno",
  "merlo",
  "hurlingham",
  "san justo",
  "pilar",
  "jose c paz",
  "gregorio de Laferrère",
  "del viso",
  "tortuguitas",
  "vicente lópez",
  "ituzaingo",
  "san miguel",
  "tigre",
  "acasusso",
  "escobar",
  "rafael castillo",
  "grand bourg",
  "loma hermosa",
  "villa celina",
  "benavidez",
  "virrey del pino",
  "ramos mejía",
  "san fernando",
  "villa tesei",
  "martin coronado",
  "jose leon suarez",
  "marcos paz",
  "Martínez",
  "bella vista",
  "olivos",
  "don torcuato",
  "luján",
  "castelar",
  "paso del rey",
  "villa luzuriaga",
  "el talar",
  "matheu",
  "boulogne sur mer",
  "beccar",
  "zona oeste",
  "zona norte",
  "zona noroeste",
  "san antonio de padua",
  "libertad",
  "gral rodríguez",
  "mariano acosta",
  "virreyes",
  "villa de mayo",
  "González Catán",
  "munro",
  "los polvorines"
];
const cabaPullLocs = [
  //102
  "caba",
  "caseros",
  "parque patricios",
  "almagro",
  "villa crespo",
  "villa urquiza",
  "balvanera",
  "villa del parque",
  "flores",
  "caballito",
  "palermo",
  "floresta",
  "pompeya",
  "el palomar",
  "san martin",
  "san andres",
  "villa bosch",
  "barracas",
  "belgrano",
  "boedo",
  "chacarita",
  "colegiales",
  "constitucion",
  "la boca",
  "montserrat",
  "nuñez",
  "palermo",
  "recoleta",
  "retiro",
  "saavedra",
  "san cristobal",
  "san nicolas",
  "velez sarsfield",
  "villa devoto",
  "villa del parque",
  "villa paternal",
  "villa santa rita",
  "villa soldati",
  "villa urquiza",
  "villa trujui",
  "villa lugano",
  "villa martelli",
  "ciudadela",
  "villa ballester"
];
const varelaPullLocs = [
  //103
  "quilmes",
  "florencio varela",
  "quilmes oeste",
  "bernal",
  "Berazategui",
  "la plata",
  "ensenada",
  "solano",
  "los hornos",
  "Villa España (Berazategui)",
  "Villa Mitre (Berazategui)",
  "San Francisco Solano Este",
  "San Francisco Solano Oeste",
  "Pereyra",
  "Ringuelet",
  "Gorina",
  "City Bell",
  "Villa Domselaar",
  "Ardigó",
  "Bosques",
  "Zeballos",
  "platanos",
  "ranelagh",
  "ezpeleta",
  "Villa Vatteone",
  "Punta Lara",
  "el pato",
  "Ardigó",
  "Villa Garibaldi",
  "Pereyra",
  "hudson",
  "burzaco",
  "bernal oeste",
  "berisso"
];
const surPullLocs = [
  //104
  "lomas de zamora",
  "lanus",
  "spegazzini",
  "wilde",
  "alejandro korn",
  "temperley",
  "guernica",
  "malvinas argentinas",
  "ezeiza",
  "monte grande",
  "longchamps",
  "avellaneda",
  "glew",
  "monte chingolo",
  "carlos spegazzini",
  "almirante brown",
  "adrogue",
  "burzaco",
  "claypole",
  "dock sud",
  "llavallol",
  "sarandi",
  "sourigues",
  "el jaguel",
  "José Mármol",
  "Rafael Calzada",
  "San José",
  "San Vicente",
  "esteban echeverría",
  "canning",
  "Valentín Alsina",
  "san jose",
  "ingeniero budge"
];
const interiorPullLocs = [
  //interior
  "catamarca",
  "córdoba",
  "corrientes",
  "entre ríos",
  "paraná",
  "jujuy",
  "san salvador de jujuy",
  "mendoza",
  "misiones",
  "posadas",
  "neuquén",
  "viedma",
  "salta",
  "san juan",
  "san luis",
  "río negro",
  "la pampa",
  "santa cruz",
  "río gallegos",
  "santa fe",
  "santiago del estero",
  "tierra del fuego",
  "ushuaia",
  "tucumán",
  "san miguel de tucumán",
  "chaco",
  "resistencia",
  "chubut",
  "rawson",
  "formosa",
  "santa rosa",
  "campana",
  "zarate",
  "clorinda",
  "mar del plata",
  "orense",
  "bahia blanca",
  "Monte Veloz",
  "Villa Elisa",
  "Villa Domselaar",
  "carmen de areco",
  "venado tuerto",
  "tandil",
  "vedia",
  "chacabuco",
  "gualeguaychu",
  "azul",
  "la rioja",
  "mar de las pampas",
  "miramar",
  "pinamar"
];
const pullsDict = {
  "name": "pulls",
  "options": {
    "101": noroestePullLocs,
    "102": cabaPullLocs,
    "103": varelaPullLocs,
    "104": surPullLocs,
    "interior": interiorPullLocs
  }
};
const locationDictionary = {
  "name": "localidades",
  "options": {
    "Glew": ["glew"],
    "Los Hornos": ["los hornos", "ls hornos", "los horns", "los horos"],
    "Tortuguitas": ["tortuguitas", "tortugitas"],
    "Acasusso": ["acasuso", "acassusso", "acassuso", "acasusso"],
    "Balvanera": ["balvanera"],
    "Marcos Paz": ["marcos paz", "marco paz", "marcos pa", "marcos pas", "marco pa"],
    "Guernica": ["guernica"],
    "Caballito": ["caballite", "caballit"],
    "Aldo Bonzi": ["Bonzi", "A. Bonzi", "AldoBonzi", "Bonzi Bs.As.", "AldoB"],
    "Avellaneda": ["Avelaneda", "Abellaneda", "Avejaneda", "Vellaneda"],
    "Banfield": ["Banfild", "Banfiel", "Bamfield", "Banfild"],
    "Berazategui": ["Berazateguy", "Berazatequi", "Berasategui", "Bera"],
    "CABA": ["caba", "Capital", "Capital federal", "Ciudad de Buenos Aires", "Ciudad de Bs.As.", "Ciudad de bs as"],
    "Caseros": ["Caserus", "Casero", "Caceros", "Cazeros"],
    "Castelar": ["Castellar", "Castelan", "Castelar", "Castelar"],
    "Ciudad Evita": ["C. Evita", "Cdad. Evita", "Ciudadevita", "Evita Ciudad"],
    "Ciudad Madero": ["Madero", "C. Madero", "CiudadMadero", "Madero Bs.As.", "C.Madero"],
    "Carlos Spegazzini": [
      "Carlos Spegazzinni",
      "Carlos Spegazzini",
      "CarlosSpegazzini",
      "Spegazzini",
      "Spegazini",
      "Spegasini",
      "Spegazinni",
      "carlos espegazini",
      "carlos espegazzini"
    ],
    "El Palomar": ["Palomar", "El Palomar", "Palomar Bs.As.", "ElPaloMar", "Cdad Jardin", "Ciudad Jardin"],
    "Luján": ["Lujan"],
    "San Martin": ["San Martn", "S. Martin", "S Martin"],
    "La Plata": ["LaPlata", "l plata", "la plat"],
    "El Talar": ["Talar", "Tala"],
    "El Jaguel": ["El Jaguel", "El Jagüel", "Jagüel", "Jagel", "Jagul", "El Jagel"],
    "Floresta": ["Floresta", "florestaa"],
    "Mar del Plata": ["mar del plata", "mar del plta", "mdplata", "mdp"],
    "Pompeya": ["pompey", "pompeya"],
    "Don Torcuato": ["Torcuato", "DonTorcuato", "D. Torcuato", "Torcu"],
    "Ezeiza": ["Ezeiza", "Ezeisa", "Eziza", "Ezeiza Airport"],
    "Florencio Varela": ["Florencio", "F. Varela", "Varela", "Floren Varela"],
    "Gerli": ["Gerli", "Jerli", "Gerly", "Guerli"],
    "González Catán": ["Gonzalez Catan", "Gonzales Catán", "GonzaCatán", "Catán", "gonsales catan", "gonsalez catan", "gonzalés catán", "gonzales catan", "gonales catan", "gonáles catan", "gonzález catan", "gonzalez catan"],
    "Gregorio de Laferrère": [
      "Laferrère",
      "la ferrere",
      " la ferreres",
      "laferere",
      "la ferere",
      "la fereres",
      "Gregorio Laferrere",
      "Laferrere",
      "G. Laferrère",
      "lafe",
      "laferrere",
      "laferr",
      "la fe",
      "laferrer",
      "laferer",
      "laferre",
      "lafere",
      "la ferre",
      "lafer",
      "laferr"
    ],
    "Del Viso": ["del viso"],
    "Parque Patricios": ["parque patricio", "parque patricios"],
    "Campana": ["campana"],
    "Zarate": ["zarate"],
    "Clorinda": ["clorinda"],
    "Escobar": ["escobar", "belen de escobar"],
    "Almirante Brown": ["Alt. Brown", "Alte. Brown", "Alm. Brown", "Al. Brown", "Brown", "almt brown"],
    "Martin Coronado": ["martin coronado", "martin corona", "martin corona do", "martin corona", "m coronado"],
    "San Francisco Solano Este": ["solano este", "s. f. solano este"],
    "San Francisco Solano Oeste": ["solano oeste", "s. f. solano oeste"],
    "José Mármol": ["jose marmol", "j. marmol", "marmol"],
    "Rafael Calzada": ["rafael calzada", "r. calzada", "calzada"],
    "San José (Almirante Brown)": ["san jose brown", "san jose almte brown", "san jose ab"],
    "Villa España (Berazategui)": ["villa españa berazategui", "v. españa bera"],
    "Villa Mitre (Berazategui)": ["villa mitre berazategui", "v. mitre bera"],
    "Hudson": ["hudson", "platanos hudson"],
    "Pereyra": ["pereyra", "pereyra iraola"],
    "Villa Elisa": ["villa elisa", "v. elisa"],
    "Canning": ["caning", "cannin", "canin", "cannnin"],
    "Bosques": ["bosques", "bosques norte", "bosques sur"],
    "Zeballos": ["zeballos", "pablo zeballos"],
    "San Juan Bautista (Florencio Varela)": ["san juan bautista", "san juan varela"],
    "Villa Vatteone": ["vatteone", "villa vatteone"],
    "El Pato": ["el pato", "pato berazategui"],
    "Ringuelet": ["ringuelet"],
    "Gorina": ["gorina"],
    "City Bell": ["city bell", "citybell"],
    "Ensenada": ["ensenada"],
    "Punta Lara": ["punta lara"],
    "Berisso": ["berisso", "beriso", "berriso", "berrisso"],
    "Gral Rodríguez": ["general rodriguez", "general rodrigues", "gral rodrigues", "g rodriguez", "rodriguez", "rodríguez", "rodrigez", "rodriges"],
    "Munro": ["munro", "munroe"],
    "Villa Domselaar": ["domselaar", "villa domselaar"],
    "Alejandro Korn": ["alejandro korn", "korn"],
    "San Antonio de Padua": ["san antonio de padua", "san antonio padua", "padua", "antonio de padua", "san anton de padua", "antoniodepadua"],
    "Villa Trujui": ["villa trujui", "trujui"],
    "Ardigó": ["ardigo", "ardigó"],
    "Monte Veloz": ["monte veloz"],
    "Villa Garibaldi": ["garibaldi", "villa garibaldi"],
    "Haedo": ["Haedo", "Aedo", "Haedho", "Haedo CABA"],
    "Hurlingham": ["Hurlingam", "Hurlinghan", "Huringham", "Hurlin"],
    "Isidro Casanova": ["Casanova", "I. Casanova", "IsidroCasa", "Casanova Bs.As.", "Casano", "Casanoba", "Isidro C."],
    "Ituzaingó": ["Ituzaingo", "Ituzáingo", "Ituzaingó", "Itu"],
    "José C. Paz": ["Jose C. Paz", "J C Paz", "José Paz", "JC Paz", "José ce paz", "Jose  ce paz", "jose ce pas", "jspaz", "jcpaz"],
    "Jose Leon Suarez": ["jose leon suarez", "villa j leon suárez", "leon suarez", "villa leon suárez", "j l suarez", "j l suárez", "villa j l suarez"],
    "Matheu": ["Mateu", "Matheuu"],
    "La Matanza": ["Matanza", "Lamatanza", "LaMatanza", "Partido de La Matanza"],
    "Lanús": ["Lanus", "Lanuz", "Lanús Oeste", "Lanús Este"],
    "Esteban Echeverría": ["estebande echeverria", "esteban echeverria", "esteban echeverría", "esteba echeverria", "esteban echeverre"],
    "Bernal Oeste": ["Bernal Oeste", "Bernal O."],
    "Bernal Este": ["Bernal Este", "Bernal E."],
    "Bernal": ["Bernal", "Bernal Bs.As.", "Bernal Centro", "Bernal", "berna"],
    "Benavidez": ["Benavides", "benavid"],
    "Llavallol": ["Llavallol", "Yavallol", "Llavalol", "LlaValol"],
    "Lomas de Zamora": ["Lomas Zamora", "LomasDeZamora", "Lomas", "LoZamora"],
    "Longchamps": ["Longchamps", "Longchamp", "Lonchamps", "Longshamps", "longchanps", "lomgchamps", "lomgchanps"],
    "Los Polvorines": ["Polvorines", "L. Polvorines", "LosPolvorines", "Polvorin"],
    "Luis Guillón": ["Guillon", "lui guillo", "luis guiilon", "luis guillon", "guillón"],
    "Máximo Paz": ["Maximo Paz", "MaximoPaz", "MaximoP"],
    "Malvinas Argentinas": ["Malvinas", "Malvinas Arg", "MalvinasBsAs", "MalvinasAr"],
    "Merlo": ["Merlo", "Merlo Bs.As.", "Merlo Centro", "Mero"],
    "Monte Chingolo": ["MonteChingolo", "Chingolo", "M. Chingolo", "MonteChingo", "Monte Chingollo"],
    "Monte Grande": ["Montegrande", "M. Grande", "MonteGrande", "MonteGrand"],
    "Moreno": ["Moreno", "Moreno Bs.As.", "Moreno Centro", "Moredo"],
    "Morón": ["Moron", "Morrón", "Morón", "Morón Centro"],
    "Monserrat": ["Monserrat", "Monserrat Caba", "Monserrat", "monserra"],
    "Grand Bourg": ["Grand Bourg", "GrandBourg", "grandbour", "gran bur"],
    "Villa Celina": ["Villa Celina", "V. Celina", "VillaCelina", "Celina"],
    "Quilmes": ["Quilme", "Quilmez", "Quilmes", "Quilmes Oeste"],
    "Rafael Castillo": ["R. Castillo", "Rafael Castillo", "RafaCastillo", "Castillo", "RafaCasti", "Rafael Castilo", "Rafael C.", "Rafel Castillo"],
    "Ramos Mejía": ["Ramos Mejia", "Ramo Mejía", "Ramoz Mejía", "Ramos Megia", "Ramosmejia", "ramo mejia", "ramos mejía", "ramoz mejía", "ramoz mejia", "ramos megia", "ramos mejia", "ramos meji"],
    "Remedios de Escalada": ["Remedios Escalada", "R. de Escalada", "Escalada", "Remedios"],
    "San Fernando": ["SanFernando", "S. Fernando", "SanFer", "San Fer"],
    "San Isidro": ["SanIsidro", "S. Isidro", "SanIsi", "SanIsidro Norte"],
    "San Justo": ["SanJusto", "S. Justo", "San Just", "SanJust", "san justo", "san juto", "sa justo", "zan juzto", "san just", "an justo", " an juto", "an jto", "san jsto"],
    "San Miguel": ["SanMiguel", "S. Miguel", "SanMi", "San Migue"],
    "Sarandí": ["Sarandi", "Sarandí", "Sarandí Avellaneda", "Zarandí"],
    "Solano": ["Solano", "Villa Solano", "Solan", "Solano Oeste"],
    "San Andres": ["San Andres", "SanAndres", "S. Andres", "SanAndres"],
    "Tapiales": ["Tapiales", "Tapial", "Tapi", "Tapiales Bs.As.", "Tapia"],
    "Temperley": ["Temperley", "Temperlei", "Temp", "Temper"],
    "Tigre": ["Tigre", "Tigre Centro", "Tigre Delta", "Tigre Bs.As.", "Tgre", "Tigr"],
    "Chacabuco": ["Chacabuco", "Chacabuco", "Chacabuco"],
    "Mariano Acosta": ["Marian Acosta", "M Acosta", "Acosta merlo", "mar acosta", "marino acosta"],
    "Gualeguaychu": ["gualeguaychu", "gualeguaychú"],
    "San Jose": ["San Jos", "S Jose"],
    "Ingeniero Budge": ["ing budge", "ingeniero budje", "ingeniero budg", "ing budg", "ing budje"],
    "Valentín Alsina": ["Valentin Alsina", "V. Alsina", "Alsina", "ValenAlsina"],
    "Vedia": ["vedia"],
    "Vicente López": ["VicenteLopez", "V. López", "Vicente López", "VicenLopez"],
    "Villa Ballester": ["V. Ballester", "Ballester", "VillaBallester", "Villa B.", "Ballester Bs.As.", "VillaBalles"],
    "Villa Centenario": ["V. Centenario", "Centenario", "VillaCentenario", "VillaCen"],
    "Villa Fiorito": ["Fiorito", "VillaFiorito", "V. Fiorito", "Fiorito Bs.As."],
    "Villa Madero": ["Madero", "VillaMadero", "V. Madero", "Madero Bs.As."],
    "Villa Luzuriaga": ["Luzuriaga", "V. Luzuriaga", "Luzu", "Luzuriaga Bs.As.", "VillaLuzu"],
    "Villa Insuperable": ["Insuperable", "V. Insuperable", "Insuperable Bs.As.", "VillaInsu"],
    "Villa La Florida": ["La Florida", "V. La Florida", "Florida Oeste", "VillaFlorida"],
    "Villa Adelina": ["Adelina", "V. Adelina", "Adelina Bs.As.", "VillaAdelina"],
    "Villa de Mayo": ["Villa Mayo", "V. de Mayo", "Mayo Bs.As.", "VillaMayo"],
    "Villa Maipú": ["V. Maipú", "VillaMaipu"],
    "Villa Scasso": ["Scasso", "V. Scasso", "Scasso Bs.As.", "VillaScasso"],
    "Villa Diamante": ["V. Diamante", "Diamante Bs.As.", "VillaDiamante"],
    "Villa Tranquila": ["V. Tranquila", "Tranquila Bs.As.", "VillaTranqui"],
    "Villa Corina": ["V. Corina", "Corina Bs.As.", "VillaCorina"],
    "Villa Domínico": ["Domínico", "V. Domínico", "Dominico", "VillaDomini"],
    "Villa Montoro": ["Montoro", "V. Montoro", "Montoro Bs.As.", "VillaMontoro"],
    "Villa Porvenir": ["Porvenir", "V. Porvenir", "Porvenir Bs.As.", "VillaPorve"],
    "Villa Numancia": ["Numancia", "V. Numancia", "Numancia Bs.As.", "VillaNuman"],
    "Villa Bordeu": ["Bordeu", "V. Bordeu", "Bordeu Bs.As.", "VillaBordeu"],
    "Villa Galicia": ["V. Galicia", "Galicia Bs.As.", "VillaGalicia"],
    "Villa del Parque": ["Parque", "V. del Parque", "Parque Bs.As.", "VillaParque", "Villa del Parque"],
    "Villa Ortúzar": ["Ortúzar", "V. Ortúzar", "Ortuzar", "VillaOrtu"],
    "Villa Real": ["Real", "V. Real", "Real Bs.As.", "VillaReal"],
    "Villa Santa Rita": ["Santa Rita", "V. Santa Rita", "SantaRita Bs.As.", "VillaRita"],
    "Villa General Mitre": ["G. Mitre", "Villa Mitre", "Mitre Bs.As.", "VillaGMitre"],
    "Villa Pueyrredón": ["Pueyrredón", "V. Pueyrredón", "Pueyrredon", "VillaPuey"],
    "Villa Urquiza": ["Urquiza", "V. Urquiza", "Urquiza Bs.As.", "VillaUrqui", "villa urquiza"],
    "Villa Crespo": ["Crespo", "V. Crespo", "Crespo Bs.As.", "VillaCrespo"],
    "Villa Luro": ["Luro", "V. Luro", "Luro Bs.As.", "VillaLuro"],
    "Villa Lugano": ["Lugano", "V. Lugano", "Lugano Bs.As.", "VillaLugano"],
    "Villa Riachuelo": ["Riachuelo", "V. Riachuelo", "Riachu", "VillaRiachu"],
    "Villa Soldati": ["Soldati", "V. Soldati", "Soldati Bs.As.", "VillaSoldati"],
    "Villa Lanzone": ["Lanzone", "V. Lanzone", "Lanzone Bs.As.", "VillaLanzo"],
    "Villa Albertina": ["V. Albertina", "Albertina Bs.As.", "VillaAlber"],
    "Villa Ayacucho": ["Ayacucho", "V. Ayacucho", "Ayacucho Bs.As.", "VillaAyacu"],
    "Villa Bosch": ["Bosch", "V. Bosch", "Bosch Bs.As.", "VillaBosch"],
    "Villa Chacabuco": ["V. Chacabuco", "VillaChaca"],
    "Villa Coronel Arias": ["C. Arias", "Villa Arias", "Arias Bs.As.", "VillaCoronel"],
    "Villa de los Patricios": ["V. Patricios", "Patricios Bs.As.", "VillaPatri"],
    "Villa España": ["V. España", "España Bs.As.", "VillaEspaña"],
    "Villa Felicia": ["V. Felicia", "Felicia Bs.As.", "VillaFeli"],
    "Villa Gobernador Gálvez": ["G. Gálvez", "Villa Gálvez", "Gálvez Bs.As.", "VillaGGalvez"],
    "Loma Hermosa": ["lom hermo", "lomo hermoso"],
    "Villa Hermosa": ["V. Hermosa", "Hermosa Bs.As.", "VillaHermosa"],
    "Villa Libertad": ["V. Libertad", "Libertad Bs.As.", "VillaLiber"],
    "Villa Lynch": ["Lynch", "V. Lynch", "Lynch Bs.As.", "VillaLynch"],
    "Villa Martelli": ["Martelli", "V. Martelli", "Martelli Bs.As.", "VillaMartelli"],
    "Villa Modelo": ["V. Modelo", "Modelo Bs.As.", "VillaModelo"],
    "Villa Muñiz": ["Muñiz", "V. Muñiz", "Muniz", "VillaMuniz"],
    "Villa Obrera": ["Obrera", "V. Obrera", "Obrera Bs.As.", "VillaObrera"],
    "Villa Progreso": ["Progreso", "V. Progreso", "Progreso Bs.As.", "VillaProgre"],
    "Villa Raffo": ["Raffo", "V. Raffo", "Raffo Bs.As.", "VillaRaffo"],
    "Villa Reconquista": ["Reconquista", "V. Reconquista", "Reconquista Bs.As.", "VillaRecon"],
    "Villa Sarmiento": ["Sarmiento", "V. Sarmiento", "Sarmiento Bs.As.", "VillaSarmiento"],
    "Villa Tesei": ["Tesei", "V. Tesei", "Tesei Bs.As.", "VillaTesei"],
    "Villa Udaondo": ["Udaondo", "V. Udaondo", "Udaondo Bs.As.", "VillaUdaondo"],
    "Villa Yapeyú": ["Yapeyú", "V. Yapeyú", "Yapeyu", "VillaYapeyu"],
    "Villa Zagala": ["Zagala", "V. Zagala", "Zagala Bs.As.", "VillaZagala"],
    "Villa Zavaleta": ["Zavaleta", "V. Zavaleta", "Zavaleta Bs.As.", "VillaZavala"],
    "Villa Zula": ["Zula", "V. Zula", "Zula Bs.As.", "VillaZula"],
    "Venado Tuerto": ["venado tuerto", "venad tuerto"],
    "Azul": ["azul"],
    //Caba localidades:
    "Almagro": ["almagro", "almagr"],
    "Barracas": ["barraca", "barracas"],
    "Belgrano": ["belgrano", "belgrano r", "belgrano c"],
    "Boedo": ["boedo"],
    "Chacarita": ["chacarita", "chaca"],
    "Colegiales": ["colegiale", "colegiales"],
    "Constitución": ["constitucion", "consti"],
    "La Boca": ["laboca", "la boca"],
    "Montserrat": ["montserrat", "monserrat"],
    "Núñez": ["nunez", "nuñez"],
    "Palermo": ["palermo", "palermo soho", "palermo hollywood"],
    "Recoleta": ["recoleta"],
    "Retiro": ["retiro"],
    "Saavedra": ["saavedra"],
    "San Cristóbal": ["san cristobal", "san cristóbal"],
    "San Nicolás": ["san nicolas", "microcentro"],
    "Vélez Sarsfield": ["velez", "velez sarsfield"],
    "Villa Devoto": ["devoto", "villa devoto"],
    "Villa Paternal": ["paternal", "villa paternal"],
    //GBA Norte
    "Beccar": ["beccar", "becar", "bekar"],
    "Bella Vista": ["bella vista", "bellavista"],
    "Boulogne Sur Mer": ["boulogne", "boulogne sur mer", "bulogne", "boulojne", "bologne", "bulojne"],
    "Carapachay": ["carapachay", "carapachai"],
    "Florida": ["florida", "florida oeste", "florida este"],
    "La Lucila": ["la lucila", "lucila"],
    "Martínez": ["martinez", "martines"],
    "Muñiz": ["muñiz", "muniz"],
    "Olivos": ["olivos"],
    "Pilar": ["pilar centro", "pilar"],
    "San Vicente": ["san vicente"],
    "Victoria": ["victoria"],
    "Villa Astolfi": ["astolfi", "villa astolfi"],
    "Villa Rosa": ["villa rosa"],
    //GBA Oeste
    "Ciudadela": ["ciudadela"],
    "La Tablada": ["la tablada", "tablada"],
    "Lomas del Mirador": ["lomas del mirador", "mirador"],
    "Paso del Rey": ["paso del rey", "pasodelrey"],
    "Santos Lugares": ["santos lugares"],
    //GBA Sur
    "Adrogué": ["adrogue", "adrogué"],
    "Burzaco": ["burzaco"],
    "Claypole": ["claypole", "clay pol"],
    "Dock Sud": ["dock sud", "dock"],
    "Ezpeleta": ["ezpeleta"],
    "Plátanos": ["platanos", "plátanos"],
    "Ranelagh": ["ranelagh"],
    "Sourigues": ["sourigues"],
    "Tandil": ["tandil", "tandíl", "tandl", "tandel"],
    "Virreyes": ["virreyes"],
    "Virrey del Pino": ["birrey del pino", "virrey del pino"],
    "Wilde": ["Wilde", "Wilde Avellaneda", "Wild", "Vilde"],
    "Catamarca": ["Cata", "Cata.", "Catam", "catamarca capital", "capital catamarca"],
    "Chaco": ["Ch", "Provincia del Chaco", "chaco capital", "capital chaco"],
    "Chubut": ["Chbt", "Provincia del Chubut", "chubut capital", "capital chubut"],
    "Córdoba": ["Cordoba", "Cba", "CBA", "Córdova", "Cordoba Capital", "capital cordoba"],
    "Corrientes": ["Corriente", "Ctés", "Ctes", "corrientes capital", "capital corrientes"],
    "Entre Ríos": ["EntreRios", "E. Rios", "ER", "Entrerios", "entre rios capital", "capital entre rios"],
    "Formosa": ["Form", "Fsa", "formosa capital", "capital formosa"],
    "Jujuy": ["Juy", "Jj", "San Salvador", "S.S. de Jujuy", "jujuy capital", "capital jujuy"],
    "La Pampa": ["LP", "L.Pampa", "Pampa", "la pampa capital", "capital la pampa"],
    "La Rioja": ["L.R.", "Rioja", "L Rioja", "La Rioja capital", "capital la rioja"],
    "Mendoza": ["Mza", "Mendoza Capital", "capital mendoza"],
    "Misiones": ["Mision", "Mnes", "posadas", "misiones capital", "capital misiones"],
    "Neuquén": ["Neuquen", "Nqn", "NQN", "neuquen capital", "capital neuquen"],
    "Río Negro": ["Rio Negro", "R.Negro", "RN", "rio negro capital", "capital rio negro"],
    "Salta": ["Sta", "salta capital", "capital salta"],
    "San Juan": ["S.Juan", "Sto. Juan", "SJ", "San juan capital", "capital san juan"],
    "San Luis": ["S.Luis", "SL", "Sto. Luis", "San Luis", "capital san luis", "san luis capital"],
    "Santa Cruz": ["S.Cruz", "Sta. Cruz", "SC", "santa cruz capital", "capital santa cruz"],
    "Santa Fe": ["Sta Fe", "S.Fe", "SantaFe", "SFe", "santa fe capital", "capital santa fe"],
    "Santiago del Estero": ["Sgo. del Estero", "Santiago", "S.del Estero", "SDE", "santiago del estero capital", "capital santiago del estero"],
    "Tierra del Fuego, Antártida e Islas del Atlántico Sur": ["Tierra del Fuego", "T.del Fuego", "TDF", "Tierra del Fuego Antartida", "Usuahia (error por capital)"],
    "Tucumán": ["Tucuman"],
    "Orense": ["orense"],
    "Bahia Blanca": ["bahia blanca", "b blanca", "bahia blanc", "b. blanca"],
    "Carmen de Areco": ["c areco", "carm areco", "carmen de arec"],
    "Miramar": ["miramar"],
    "Pinamar": ["pinamar"],
    "Mar de las Pampas": ["mar de las pampas", "mar de las pamp", "mar de las pompas"],
    "Zona Oeste": ["zona oeste", "zona oes", "zona oes", "sona oeste"],
    "Zona Sur": ["zona sur", "zona su", "sona sur"],
    "Zona Norte": ["zona norte", "zona n", "sona norte"],
    "Zona Este": ["zona este", "zona e"],
    "Zona Noroeste": ["zona noroeste", "zona noroes", "sona noroeste"]
    //
  }
};
const NAME_EXACT_MAP = /* @__PURE__ */ new Map();
const LOCATION_PULLS_EXACT_MAP = /* @__PURE__ */ new Map();
const LOCATION_LOCALIDADES_EXACT_MAP = /* @__PURE__ */ new Map();
const objOfMaps = {
  "nombres": NAME_EXACT_MAP,
  "localidades": LOCATION_LOCALIDADES_EXACT_MAP,
  "pulls": LOCATION_PULLS_EXACT_MAP
};
function dictToIndex(dict) {
  const index = [];
  function processOptions(options, category, subType) {
    for (const canonical in options) {
      const canonEntity = {
        match: normalize(canonical),
        canonical,
        category,
        subType,
        priority: canonical.length
      };
      index.push(canonEntity);
      const EXACT_MAP = objOfMaps[dict.name];
      if (!EXACT_MAP.has(canonEntity.match)) {
        EXACT_MAP.set(canonEntity.match, []);
      }
      EXACT_MAP.get(canonEntity.match).push(canonEntity);
      for (const variant of options[canonical]) {
        const entity = {
          match: normalize(variant),
          canonical,
          category,
          subType,
          priority: variant.length
        };
        index.push(entity);
        const EXACT_MAP2 = objOfMaps[dict.name];
        if (!EXACT_MAP2.has(entity.match)) {
          EXACT_MAP2.set(entity.match, []);
        }
        EXACT_MAP2.get(entity.match).push(entity);
      }
    }
  }
  switch (dict.name) {
    case "nombres":
      processOptions(dict.options, "person", "name");
      break;
    case "localidades":
      processOptions(dict.options, "location", "city");
      break;
    case "pulls":
      processOptions(dict.options, "locationByPull", "pull");
      break;
  }
  return index;
}
const buildLocDict = dictToIndex(locationDictionary);
dictToIndex(nameDict);
const buildPullsDict = dictToIndex(pullsDict);
function generateWindows(tokens, maxSize = 4) {
  const windows = [];
  for (let size = 1; size <= maxSize; size++) {
    for (let i = 0; i <= tokens.length - size; i++) {
      windows.push({
        text: tokens.slice(i, i + size).join(" "),
        start: i,
        end: i + size
      });
    }
  }
  return windows;
}
const numbersToWords = {
  1: "uno",
  2: "dos",
  3: "tres",
  4: "cuatro",
  5: "cinco",
  6: "seis",
  7: "siete",
  8: "ocho",
  9: "nueve",
  10: "diez",
  11: "once",
  12: "doce",
  13: "trece",
  14: "catorce",
  15: "quince",
  16: "dieciséis",
  17: "diecisiete",
  18: "dieciocho",
  19: "diecinueve",
  20: "veinte",
  21: "veintiuno",
  22: "veintidós",
  23: "veintitrés",
  24: "veinticuatro",
  25: "veinticinco",
  26: "veintiséis",
  27: "veintisiete",
  28: "veintiocho",
  29: "veintinueve",
  30: "treinta",
  31: "treinta y uno"
};
function recognizeWord(input) {
  console.log("TESTING RECOGNIZING=====", input);
  let locationDetect = null;
  const normalizedInput = normalize(input);
  const tokens = normalizedInput.split(" ");
  const windows = generateWindows(tokens);
  const found = [];
  for (const entry of buildLocDict) {
    windows.forEach((window2) => {
      if (window2.text === normalize(entry.match)) {
        console.log("Found location:", window2, entry.match);
        found.push(entry.canonical);
      }
    });
  }
  if (found.length > 0) {
    console.log("FIND ", found);
    const longest = found.reduce((max, curr) => {
      if (curr.text && max.text) {
        return curr.text.length > max.text.length ? curr : max;
      }
      return max;
    });
    console.log("Longest: ", longest);
    longest.replace(
      /\b([1-9]|[12][0-9]|3[01])\b/g,
      (n) => numbersToWords[n]
    );
    locationDetect = longest;
  }
  if (!locationDetect) return { location: "", pull: "" };
  for (const entry of buildPullsDict) {
    if (normalize(entry.match.toLowerCase()) === normalize(locationDetect.toLowerCase())) {
      console.log("RETURNING AFTER RECOGNIZING========", locationDetect.toLowerCase(), entry);
      return { location: locationDetect, pull: entry.canonical };
    }
  }
  return { location: locationDetect, pull: "" };
}
function recognizeListWords(input) {
  const results = [];
  input.forEach((word) => {
    const result = recognizeWord(word);
    if (result) {
      results.push(result);
    }
  });
  return results;
}
function initRecognizing(input) {
  if (typeof input === "string") {
    const normalizedInput = normalize(input);
    const recognized = recognizeListWords([normalizedInput]);
    console.log("Recognized: ", recognized);
    return recognized;
  } else {
    const normalizedInput = input.map(normalize);
    const recognized = recognizeListWords(normalizedInput);
    console.log("Recognized: ", recognized);
    return recognized;
  }
}
const hour = (/* @__PURE__ */ new Date()).getHours();
const greetingByHour1 = hour >= 6 && hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";
const myName = "Micaela";
const whoYouAre = `Soy ${myName}, gracias por contactarnos`;
const greeting = greetingByHour1 + ", " + whoYouAre;
const firstQuestion2 = `Por favor indicame la localidad para que te pasen toda la información, promociones y formas de pago desde la sucursal correspondiente a tu zona. Gracias`;
const firstQuestion = firstQuestion2;
const secondQuestion = "¿Con quien tengo el gusto?";
function recognizeOutMessages(inputOutMessages, inputRecognition) {
  let finalMessage = "";
  if (Array.isArray(inputOutMessages)) {
    const inputOutMessagesString = inputOutMessages.join(" ");
    const normalizedInputOutMessages = normalize(inputOutMessagesString);
    if (inputRecognition.location && !normalizedInputOutMessages.includes(normalize("muchas gracias por tu contacto"))) {
      finalMessage = `Muchas gracias por tu contacto. Ya derive tu consulta a la sucursal correspondiente a ${inputRecognition.location}. Se van a estar contactando con vos para poder asesorarte y pasarte toda la información, promociones y formas de pago 😊`;
      if (inputRecognition.pull === "interior") {
        finalMessage = `Somos de Buenos Aires AMBA y CABA por el momento no llegamos a ${inputRecognition.location} Gracias por contactarnos.`;
      }
    } else if (!inputRecognition.location && !normalizedInputOutMessages.includes(normalize("Buenas tardes. Por favor indicame la localidad"))) {
      const finalQuestion = normalizedInputOutMessages.includes(normalize("Hola! Cómo estás? Mi nombre es Micaela. Para recibir más info por favor indicame:")) ? secondQuestion : firstQuestion;
      finalMessage = `${greeting}. ${finalQuestion}`;
    }
  }
  return finalMessage;
}
async function revisionRequestUI() {
  const adviseSection = document.querySelector(".advises-section");
  if (!adviseSection) {
    console.error("No se encontró el section .advise-section");
    return;
  } else {
    chrome.storage.local.get(["leadData"], async (result) => {
      const searchRevisionRequestUI = document.querySelector(".revision-request-ui");
      if (searchRevisionRequestUI) {
        searchRevisionRequestUI.remove();
      }
      const leadData = result.leadData;
      const revisionRequestUI2 = document.createElement("div");
      revisionRequestUI2.className = "revision-request-ui";
      console.log("leadData", leadData);
      const pullValue = leadData.recognized.pull == "interior" ? "" : leadData.recognized.pull;
      const areaNumber = leadData.whatsappNumber.split(" ")[2];
      const interiorArea = getAreaByNumber(areaNumber);
      console.log("interiorArea", interiorArea);
      if ((!leadData.recognized.pull || leadData.recognized.pull == "100") && interiorArea !== "agua" && !leadData.recognized.location) {
        leadData.recognized.pull = "interior";
        leadData.recognized.location = interiorArea;
      }
      const groupValue = leadData.recognized.pull == "interior" ? "27" : leadData.recognized.pull == "recupero" ? "9" : leadData.recognized.pull == "remarketing" ? "7" : "";
      const selectPull = `
        <label for="spullderi">Pull</label>
        <select class="form-control c-select text-info" id="spullderi" value="${pullValue}" name="spullderi" required="">
            
          <option value="" disabled selected>Seleccione un pull</option>
          <option value="103"> PULL  Varela</option>
          <option value="100"> PULL AGUA</option>
          <option value="102"> PULL CABA</option>
          <option value="101"> PULL Noroeste</option>
          <option value="104"> PULL Sur</option>
        </select>`;
      const selectGroup = `
        <label for="sgrupoderi">Grupo</label>
        <select class="form-control c-select text-info" id="sgrupoderi" value="${groupValue}" name="sgrupoderi" required="">
          <option value="" selected>Seleccione un grupo</option>
          <option value="27">INTERIOR</option>
          <option value="9">RECUPERO</option>
          <option value="7">REMARKETING</option>
        </select>`;
      const formattedNumber = "+" + formatNumber(leadData.whatsappNumber);
      revisionRequestUI2.className = "revision-request-ui";
      revisionRequestUI2.innerHTML = `
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
        `;
      const revisionRequestUIBody = revisionRequestUI2.querySelector(".revision-request-ui-body");
      const pullSelect = revisionRequestUIBody.querySelector("#spullderi");
      const groupSelect = revisionRequestUIBody.querySelector("#sgrupoderi");
      pullSelect.value = pullValue || (!groupValue ? "100" : "");
      groupSelect.value = groupValue;
      const asignacion = groupValue ? "derivar" : "pull";
      const yesterday = /* @__PURE__ */ new Date();
      yesterday.setDate(yesterday.getDate());
      const formattedTestDate = yesterday.toISOString().split("T")[0];
      const dataToSendToCRM = {
        form_token: "",
        leadori: "Q",
        //Joha es Q
        leadfecha: formattedTestDate,
        leadname: leadData.recognized.name || "NNN",
        leadcel: formattedNumber,
        leadloca: leadData.recognized.location || "NNN",
        asignacion,
        //puede ser derivar(grupo) o pull
        spullderi: leadData.recognized.pull && asignacion === "pull" ? leadData.recognized.pull : "100",
        producto: "2",
        //Default es 2
        gestion: "1",
        //Default es 1
        comentario: "",
        //Default es ""
        cargar: ""
        //Default es ""
      };
      if (asignacion === "derivar") {
        dataToSendToCRM.sgrupoderi = groupValue || "";
      }
      const submitButton = document.createElement("button");
      submitButton.textContent = "Enviar";
      submitButton.className = "btn btn-primary submit-revision";
      revisionRequestUIBody.appendChild(submitButton);
      adviseSection.appendChild(revisionRequestUI2);
      function setOnChangeListener(key, setPullToAgua = false, setDeriToNull = false) {
        if (!revisionRequestUIBody) {
          console.error("revisionRequestUIBody no encontrado");
          return;
        }
        const element = revisionRequestUIBody.querySelector(`#${key}`);
        if (!element) {
          console.error(`Elemento #${key} no encontrado`);
          return;
        }
        const elementToSelectType = element.tagName.toLowerCase() === "select" ? "change" : "input";
        element.addEventListener(elementToSelectType, async (e) => {
          dataToSendToCRM[key] = e.target.value;
          const oldLeadData = await chrome.storage.local.get([key]);
          console.log("oldLeadData", oldLeadData);
          await chrome.storage.local.set({ [key]: dataToSendToCRM[key] });
          if (setPullToAgua) {
            dataToSendToCRM.spullderi = "100";
            pullSelect.value = "100";
            await chrome.storage.local.set({ spullderi: "100" });
          }
          if (setDeriToNull) {
            dataToSendToCRM.sgrupoderi = "";
            groupSelect.value = "";
            await chrome.storage.local.set({ sgrupoderi: "" });
          }
        });
      }
      setOnChangeListener("leadname");
      setOnChangeListener("leadcel");
      setOnChangeListener("leadloca");
      setOnChangeListener("spullderi", false, true);
      setOnChangeListener("sgrupoderi", true);
      submitButton.addEventListener("click", async () => {
        console.log("Enviar: ", dataToSendToCRM);
        chrome.runtime.sendMessage({ data: dataToSendToCRM, type: "SEND_TO_CRM" });
      });
    });
  }
  return revisionRequestUI;
}
let whatsappNumber;
const observer = new MutationObserver(async (mutations, obs) => {
  const target = mutations[0].target;
  if (target.id == "statusmsg") {
    console.log("This result papu: ", target);
    return;
  }
  if (window.location.hostname != "web.whatsapp.com") {
    return;
  }
  const whatsappNumberElement = domWsp?.whatsappNumberElement();
  const inputTextWithNumber = domWsp?.inputTextWithNumber();
  if (!whatsappNumberElement && !inputTextWithNumber) {
    console.log("No se encontro ningun elemento con el numero!!!! Cancelando operacion ");
    return;
  }
  const numberFromInput = inputTextWithNumber?.getAttribute("aria-label");
  const actualInvisibleInpNumber = `+${numberFromInput?.replace(/^\D+|\.$/g, "")}`;
  const actualVisibleProfileNumber = whatsappNumberElement?.innerHTML || actualInvisibleInpNumber;
  if (!actualVisibleProfileNumber) {
    alert("No se encontro el numero visible!!!! (ver consola)");
  }
  if (!actualInvisibleInpNumber) {
    alert("No se encontro el numero invisible del input!!!! (ver consola)");
  }
  if (whatsappNumber != actualVisibleProfileNumber && copyFunctionAccessor.val) {
    whatsappNumber = actualVisibleProfileNumber || actualInvisibleInpNumber;
    try {
      const allInMessages = await domWsp.allInMessages();
      const recognized = initRecognizing(allInMessages.join(" "));
      const allOutMessages = await domWsp.allOutMessages();
      const recognizedOut = recognizeOutMessages(allOutMessages, recognized[0]);
      console.log("saving lead data: ", { whatsappNumber, recognized: recognized[0], messageToSend: recognizedOut });
      await saveLeadData({ whatsappNumber, recognized: recognized[0], messageToSend: recognizedOut });
      const copiedText = { whatsappNumber, recognized: recognized[0], messageToSend: recognizedOut };
      let finalAdvise = `${copiedText.recognized.location || "No se reconocio LOCALIDAD"} (${copiedText.recognized.pull || "No se reconocio PULL"})`;
      if (!copiedText.recognized.location || copiedText.recognized.location == "" || copiedText.recognized.location == null) {
        finalAdvise = "No se reconocio LOCALIDAD";
      }
      if ((!copiedText.recognized.pull || copiedText.recognized.pull == "" || copiedText.recognized.pull == null) && copiedText.recognized.location) {
        finalAdvise = "No se reconocio PULL para: " + copiedText.recognized.location;
      }
      advise({ active: !copiedText.recognized.location || !copiedText.recognized.pull ? false : true, text: finalAdvise });
      console.log("copiedText", copiedText);
      revisionRequestUI();
      await navigator.clipboard.writeText(copiedText.messageToSend);
    } catch (err) {
      console.error("Error al copiar: ", err);
    }
  }
});
function startObserver() {
  observer.observe(document.body, { childList: true, subtree: true });
}
async function onTabUpdate() {
  chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === "READY_FOR_MESSAGE" && window.location.href.includes("web.whatsapp.com")) {
      await navigator.clipboard.writeText(message.payload);
    } else if (message.type === "READY_FOR_JSON" && window.location.href.includes("crm.jeny.com.ar")) {
      console.log("message.payload on jenny", message.payload);
      const parsedJson = JSON.parse(message.payload);
      console.log("adding to inputs directly", parsedJson);
      if (parsedJson && parsedJson.whatsappNumber && parsedJson.recognized) {
        insertOnInputs(parsedJson);
        if (parsedJson.recognized.location) {
          console.log("resetting lead data");
          resetLeadData();
        } else {
          const areaNumber = parsedJson.whatsappNumber.split(" ")[2];
          setAsNNN({ num: parsedJson.whatsappNumber, areaNumber });
        }
      }
    } else if (message.type === "GET_LEAD_DATA" && window.location.href.includes("crm.jeny.com.ar")) {
      console.log("GET_LEAD_DATA");
    }
  });
}
async function setBackListeners() {
  window.addEventListener("load", () => {
    console.log("load event for back listeners");
    onTabUpdate();
  });
}
async function initInyectOnPage() {
  await setBackListeners();
  setupListeners({});
  startObserver();
}
initInyectOnPage();
console.log("HTML URL: ", chrome.runtime.getURL("src/tool-panel/tool-panel.html"));
