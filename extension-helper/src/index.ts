import initInyectOnPage from "./inyect/index";

initInyectOnPage()
console.log("HTML URL: ", chrome.runtime.getURL("src/tool-panel/tool-panel.html"));
//window.open(chrome.runtime.getURL("src/tool-panel/tool-panel.html"))
//chrome.runtime.sendMessage({ type: "OPEN_TOOL_PANEL" });
