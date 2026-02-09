
import { copyFunctionAccessor, pullByKey} from "./vars/vars";
import { getCopiedText, formatNumber} from "./utils";
import { setAsNNN, setToInterior, setupPullRadio, mostrarcampo } from "./domActions";
import { domCRM } from "./vars/domVars";
import { testSelectorOnWsp } from "./testSelectorOnWsp";
import { copyFunctionAdvise } from "./inyectElements";


export async function handleKeyInyected(ev: KeyboardEvent) {
    //Make that the key combination, doesn-t happen when you-r writting on an input

    // "EScribe mensaje a: num:.x1hx0egp.x6ikm8r.x1odjw0f.x1k6rcq7.x6prxxf"

    //         .x1c4vz4f.x3nfvp2.xuce83p.x1bft6iq.x1i7k8ik.xq9mrsl.x6s0dn4
    //        .xuxw1ft.x6ikm8r.x10wlt62.xlyipyv.x78zum5
    //class=".x1iyjqo2 .x6ikm8r .x10wlt62 .x1n2onr6 .xlyipyv .xuxw1ft .x1rg5ohu ._ao3e"

    // 

    //This function its async due to the getCopiedText function
    console.log("Key pressed: ", ev.key)
    if(window.location.hostname=="web.whatsapp.com"){
        if(ev.key=="*"){
            testSelectorOnWsp()
        }
        if(ev.key=="-"){
            console.log("Changing copy function to false")
            copyFunctionAccessor.set(false)
            copyFunctionAdvise(false)
        }
        if(ev.key=="+"){
            console.log("Changing copy function to true")
            copyFunctionAccessor.set(true)
            copyFunctionAdvise(true)
        }
    }
    
    if(window.location.hostname=="crm.jeny.com.ar"){
        
        const awaitTextoCopiado = await getCopiedText();
        const areaNumber = awaitTextoCopiado.split(" ")[2]
        if(ev.key=="}"){
            console.log("banana")
            setAsNNN({num: awaitTextoCopiado, areaNumber})
        }
        if(ev.key=="{"||ev.key=="|"){
            
            setupPullRadio();
            setToInterior({areaNumber, isNNNAction: false});
            console.log("Copiando texto en el input de numero")
            const leadCelInp = domCRM.leadCelInp();
            if(leadCelInp){
                leadCelInp.value = "+" + formatNumber(awaitTextoCopiado)
                leadCelInp.dispatchEvent(new Event("input", {bubbles: true}))
            }
        }
        
        
        
        if(ev.key=="Enter"||ev.key=="°"){
            const submitFinalButton = document.querySelector(".box-body button[type='submit']")
            console.log("submitFinalButton", submitFinalButton)
            console.log("reloading")
            const submitFinalButtonEl = submitFinalButton as HTMLButtonElement;
            submitFinalButtonEl.dispatchEvent(new Event("click", {bubbles: true}))
            submitFinalButtonEl.dispatchEvent(
                new MouseEvent("click", {
                    view: window,
                    bubbles: true,
                    cancelable: true
                })
            );
        }
        if(ev.key=="6"){
            console.log("Derivando a interior")
            const deriRadio = domCRM.deriRadio() as HTMLInputElement
            const deriGroupSelect = domCRM.deriGroupSelect() as HTMLSelectElement
            if(deriRadio){
                deriRadio.checked = true;
                mostrarcampo()
                deriRadio.dispatchEvent(new Event("change", { bubbles: true }));
            }
            if(deriGroupSelect){
                deriGroupSelect.value = "27";
                deriGroupSelect.dispatchEvent(new Event("change", { bubbles: true }));
            }
        }
        if(pullByKey[ev.key]){
            setupPullRadio()
            console.log("Tecla + shift: ", ev.key)
            const pullElementSelect = domCRM.pullElementSelect() as HTMLSelectElement
            pullElementSelect.value = pullByKey[ev.key]
            pullElementSelect.dispatchEvent(new Event("change", { bubbles: true }));
        }   
    }
        
}