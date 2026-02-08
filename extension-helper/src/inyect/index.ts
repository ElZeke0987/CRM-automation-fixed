import { setupListeners } from "./src/listeners";
import { startObserver } from "./src/wspObs";

export default function initInyectOnPage() {
    setupListeners({})
    startObserver()
}