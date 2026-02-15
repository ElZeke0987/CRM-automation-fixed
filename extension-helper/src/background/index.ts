import { onTabUpdate, onMessage } from "./src/globalListeners";


export async function setGlobalListeners(){
    await onTabUpdate();
    await onMessage();
}
