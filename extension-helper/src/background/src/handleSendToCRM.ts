import { getFormToken, sendToCRM } from "./sendToCRMBack";



export async function sendToCRMListener(message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void){
    if (message.type === 'SEND_TO_CRM') {
        // TODO: Implementar lógica para enviar datos a CRM
        console.log('Enviando datos a CRM:', message.data);
        const formTokenGet = await getFormToken();
        console.log('Form token get: ', formTokenGet);
        const response = await sendToCRM(message.data);
        console.log('Response: ', response);

    }

}

