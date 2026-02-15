export async function handleTab(tab: chrome.tabs.Tab) {
  if (!tab.url || !tab.id) return;

  const data = await chrome.storage.local.get([
    "messageToSend",
    "leadData"
  ]);

  if (tab.url.includes("web.whatsapp.com")) {
    chrome.tabs.sendMessage(tab.id, {
      type: "READY_FOR_MESSAGE",
      payload: data.lastMessage
    });
  }

  if (tab.url.includes("crm.jeny.com.ar")) {
    console.log("Sending lead data to jenny")
    chrome.tabs.sendMessage(tab.id, {
      type: "READY_FOR_JSON",
      payload: JSON.stringify(data.leadData)
    });
  }
}