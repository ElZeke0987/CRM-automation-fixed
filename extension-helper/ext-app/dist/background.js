async function handleTab(tab) {
  if (!tab.url || !tab.id) return;
  const data = await chrome.storage.local.get([
    "messageToSend",
    "leadData"
  ]);
  if (tab.url.includes("web.whatsapp.com")) {
    chrome.tabs.sendMessage(tab.id, {
      type: "READY_FOR_MESSAGE",
      payload: data.lastMessage
    });
  }
  if (tab.url.includes("crm.jeny.com.ar")) {
    console.log("Sending lead data to jenny");
    chrome.tabs.sendMessage(tab.id, {
      type: "READY_FOR_JSON",
      payload: JSON.stringify(data.leadData)
    });
  }
}
async function plusToStorage(valor, storageKey, forceNNN = false) {
  const lastWasNNN = await chrome.storage.local.get("lastWasNNN");
  if (lastWasNNN.lastWasNNN === "true" || forceNNN) {
    const nnnCount = (await chrome.storage.local.get(["NNN_" + storageKey]))["NNN_" + storageKey] || "0";
    let contador2 = Number(nnnCount);
    contador2 += valor;
    chrome.storage.local.set({ [`NNN_${storageKey}`]: contador2.toString() });
    chrome.storage.local.set({ "lastWasNNN": "false" });
    console.log("NNN " + storageKey + " actualizado:", contador2);
    return;
  }
  const count = (await chrome.storage.local.get([storageKey]))[storageKey];
  let contador = Number(count) || 0;
  contador += valor;
  chrome.storage.local.set({ [storageKey]: contador.toString() });
}
async function getFormToken() {
  try {
    const res = await fetch("https://crm.jeny.com.ar/addlead.php", {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
    if (!res.ok) {
      throw new Error("No se pudo cargar CRM");
    }
    const html = await res.text();
    const extractFormTokenRegex = /<input\b[^>]*\bname=["']form_token["'][^>]*\bvalue=["']([^"']+)["'][^>]*>/;
    const formTokenMatch = html.match(extractFormTokenRegex);
    const token = formTokenMatch ? formTokenMatch[1] : null;
    if (!token) {
      throw new Error("No se encontró form_token");
    }
    return token;
  } catch (err) {
    console.error("Error obteniendo form token:", err);
    return null;
  }
}
async function sendToCRM(data) {
  const formToken = await getFormToken();
  if (!formToken && !data.form_token) {
    throw new Error("No se pudo obtener el form token. Cortando para evitar problemas con el CRM");
  }
  data.form_token = formToken || data.form_token;
  console.log("Form token: ", data.form_token);
  const withDefaults = {
    ...data,
    leadloca: data.leadloca || "NNN",
    leadname: data.leadname || "NNN",
    asignacion: data.asignacion || "derivar",
    producto: data.producto || "2",
    gestion: data.gestion || "1",
    comentario: data.comentario || "",
    cargar: data.cargar || ""
  };
  if (withDefaults.sgrupoderi === "") {
    delete withDefaults.sgrupoderi;
  }
  console.log("Last test before fetching: ", withDefaults);
  const res = await fetch("https://crm.jeny.com.ar/addlead.php", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(withDefaults)
  });
  if (!res.ok) {
    throw new Error("No se pudo enviar el lead a CRM");
  }
  const responseText = await res.text();
  const matchRegex = /var\s+mensaje\s*=\s*["']<span\b[^>]*>([\s\S]*?)<\/span>["']/;
  const resultStatusMsgMatch = responseText.match(matchRegex);
  const resultStatusMsg = resultStatusMsgMatch?.[1] || "";
  if (resultStatusMsg === "Se agregó contacto!") {
    if (data.leadloca === "NNN") {
      plusToStorage(1, "agregado", true);
      console.log("Agregado NNN");
    } else {
      if (data.asignacion === "derivar" && data.sgrupoderi === "27") {
        plusToStorage(1, "agregado_interior");
        console.log("Agregado interior");
      } else if (data.asignacion === "pull" && data.sgrupoderi !== "27") {
        plusToStorage(1, "agregado_pull");
        console.log("Agregado normal");
      }
    }
  } else if (resultStatusMsg === "Se actualizó contacto!") {
    if (data.leadloca === "NNN") {
      plusToStorage(1, "actualizado", true);
    } else {
      if (data.asignacion === "derivar" && data.sgrupoderi === "27") {
        plusToStorage(1, "actualizado_interior");
      } else if (data.asignacion === "pull" && data.sgrupoderi !== "27") {
        plusToStorage(1, "actualizado_pull");
      }
    }
  }
  return resultStatusMsg;
}
async function sendToCRMListener(message, sender, sendResponse) {
  if (message.type === "SEND_TO_CRM") {
    console.log("Enviando datos a CRM:", message.data);
    const formTokenGet = await getFormToken();
    console.log("Form token get: ", formTokenGet);
    const response = await sendToCRM(message.data);
    console.log("Response: ", response);
  }
}
async function onTabUpdate() {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete") {
      handleTab(tab);
    }
  });
}
async function onMessage() {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received: ", message);
    sendToCRMListener(message);
  });
}
async function setGlobalListeners() {
  await onTabUpdate();
  await onMessage();
}
setGlobalListeners();
