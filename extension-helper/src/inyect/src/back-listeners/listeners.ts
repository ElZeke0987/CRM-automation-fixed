import { onTabUpdate } from "./onTabUpdate";

export async function setBackListeners(){
    window.addEventListener("load", () => {
        console.log("load event for back listeners")
        onTabUpdate()
    })
}