export function formatNumber(num: string): string {
    return num.replace(/\D+/g, '')
}

export async function getCopiedText(): Promise<string> {
    return await navigator.clipboard.readText()
}

// Función para sumar
export function plusToStorage(valor: number, storageKey: string) {

    if(localStorage.getItem("lastWasNNN") === "true"){

        let contador = parseInt(localStorage.getItem("NNN_" + storageKey) || "0");
        contador += valor;
        localStorage.setItem("NNN_" + storageKey, contador.toString());
        localStorage.setItem("lastWasNNN", "false");
        console.log("NNN " + storageKey + " actualizado:", contador);
        return;
    }

    let contador = Number(localStorage.getItem(storageKey)) || 0;
    contador += valor;
    localStorage.setItem(storageKey, contador.toString());
    //console.log("Número actualizado:", contador);
}

