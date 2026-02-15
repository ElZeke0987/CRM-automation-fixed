import { domCRM } from "./vars/domVars";
import { plusToStorage } from "./utils";
import { resetLeadData } from "./dataToStorage";

export function onWindowLoadInyected(e: Event)  {
    if(window.location.hostname=="crm.jeny.com.ar"){

        const contactUpdateResult = domCRM.contactUpdateResult();
        const lastWasNNN = localStorage.getItem("lastWasNNN") === "true";
        if(contactUpdateResult?.textContent && !lastWasNNN){
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
        const botSelector = domCRM.botSelector();
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
}