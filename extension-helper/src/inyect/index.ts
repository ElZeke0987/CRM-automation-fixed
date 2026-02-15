import { setupListeners } from "./src/listeners";
import { startObserver } from "./src/wspObs";
import { setBackListeners } from "./src/back-listeners/listeners";

export default async function initInyectOnPage() {
    await setBackListeners();
    setupListeners({})
    startObserver()
}