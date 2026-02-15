export async function plusToStorage(valor: number, storageKey: string, forceNNN: boolean = false) {

    const lastWasNNN = await chrome.storage.local.get("lastWasNNN");
    if(lastWasNNN.lastWasNNN === "true" || forceNNN){
        const nnnCount = (await chrome.storage.local.get(["NNN_" + storageKey]))["NNN_" + storageKey] || "0";
        let contador = Number(nnnCount);
        contador += valor;
        chrome.storage.local.set({[`NNN_${storageKey}`]: contador.toString()});
        chrome.storage.local.set({"lastWasNNN": "false"});
        console.log("NNN " + storageKey + " actualizado:", contador);
        return;
    }

    const count = (await chrome.storage.local.get([storageKey]))[storageKey];
    let contador = Number(count) || 0;
    contador += valor;
    chrome.storage.local.set({[storageKey]: contador.toString()});
    //console.log("Número actualizado:", contador);
}