

import { domCRM } from "./vars/domVars";
import { handleKeyInyected } from "./keyHandling";
import { onWindowLoadInyected } from "./onWindowLoad";



interface SetupListenersProps {
    catchNumbersOnInputs?: boolean
    onWindowLoadFunc?: (e: Event) => void
    keyHandlerFunc?: (e: KeyboardEvent) => void
}

export function setupListeners({catchNumbersOnInputs=true, onWindowLoadFunc=onWindowLoadInyected, keyHandlerFunc=handleKeyInyected}: SetupListenersProps){
  (domCRM.leadInputs() as NodeListOf<HTMLInputElement>)?.forEach((inp: HTMLInputElement) => {
    if(!catchNumbersOnInputs)return


    const soloLetras = /^[a-záéíóúüñ\s]$/i;
    inp.addEventListener('keypress', (ev: Event | KeyboardEvent) => {
      if (!soloLetras.test((ev as KeyboardEvent).key)) {
        ev.preventDefault();          // bloquea números y símbolos al tipear
      }
    });
    inp.addEventListener('input', (ev: Event) => {
      const limpio = (ev.target as HTMLInputElement).value.replace(/[^a-záéíóúüñ\s]/gi, '');
      if (limpio !== (ev.target as HTMLInputElement).value) {
        (ev.target as HTMLInputElement).value = limpio;     // limpia texto que llegó por paste/autofill
      }
    });
  });

  window.addEventListener("load", onWindowLoadFunc)

  document.addEventListener("keypress", async (ev)=>await keyHandlerFunc(ev))
}
