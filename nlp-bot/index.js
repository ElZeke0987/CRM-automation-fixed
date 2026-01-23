import { processStep } from "./messagesStep/processTextStep.js";
import fs from "fs"
import { startAutomationWebProcess } from "./jsMods/automationWebProcess.js";
/*
process.stdin.on("data", async(data) => {
    const input = data.toString("utf-8");
    console.log("Input: ", input)
    if (input){
        console.log("Input 435: ", input)
        await processStep(input)
    }
})*/
process.stdin.setEncoding("utf-8");


async function main(){
    for await (const chunk of process.stdin) {
        
        console.log("Input: ", chunk)
        if(chunk.trim()=="automation"){
            console.log("Running automation...");
            await startAutomationWebProcess()
            continue;
        }
        const input = JSON.parse(chunk);
        
        console.log(`Processing message of: ${input.number}`);
        let datos2={}
        const datos = await processStep(input.text)
        //console.log("Datos: ", datos)
        if(datos.localidades&&!datos.pulls){
            datos2 = await processStep(datos.localidades.toLowerCase())
            //console.log("Datos2: ", datos2)
        }
        datos.pulls=datos2.pulls
        console.log("Datos Final: ", datos)

        const jsonContacts = JSON.parse(fs.readFileSync("nlp-bot/contactToLoad.json", "utf-8"))
        const contactToLoad = jsonContacts.list
        const numeroLimpio = input.number.replace(/[\s-\.]/g, "");
        const datoAgregar = { id: numeroLimpio, ...datos };

        // 1. Buscamos el índice del elemento por su ID
        const indice = contactToLoad.findIndex(item => item.id === datoAgregar.id);

        if (indice !== -1) {
            // 2. Si existe (índice diferente a -1), lo reemplazamos
            contactToLoad[indice] = datoAgregar;
            console.log("Contacto: ACTUALIZADO ||||||");
        } else {
            // 3. Si no existe, lo agregamos al final
            contactToLoad.push(datoAgregar);
            console.log("Contacto: AGREGADO +++++");
        }
        fs.writeFileSync("nlp-bot/contactToLoad.json", JSON.stringify({
            list: contactToLoad
        }, null,'\t'))
        
        return datos
    }
}

main().then(() => {
    console.log("Main ended")
    console.log("Closing process")
    process.exit(0)
}).catch((err) => {
    console.log("Main ended with error: ", err)
    console.log("Closing process")
    process.exit(1)
})
