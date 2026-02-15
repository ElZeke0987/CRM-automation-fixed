export const domCRM/*: DomCRMTypes*/ = {
  operasig: () => document.getElementById("operasig") as HTMLElement | null,
  soperasig: () => document.getElementById("soperasig") as HTMLSelectElement | null,
  grupoderi: () => document.getElementById("grupoderi") as HTMLElement | null,
  sgrupoderi: () => document.getElementById("sgrupoderi") as HTMLSelectElement | null,
  pullderi: () => document.getElementById("pullderi") as HTMLElement | null,
  spullderi: () => document.getElementById("spullderi") as HTMLSelectElement | null,
  deriGroupSelect: () => document.getElementById("sgrupoderi") as HTMLSelectElement | null,
  pullElementSelect: () => document.getElementById("spullderi") as HTMLSelectElement | null,
  nnnButton: () => document.querySelectorAll("#nn1") as NodeListOf<HTMLButtonElement>,
  leadInputs: () => document.querySelectorAll<HTMLInputElement>("#leadname, #leadloca") as NodeListOf<HTMLInputElement>,
  leadLocationInp: () => document.getElementById("leadloca") as HTMLInputElement | null,
  contactUpdateResult: () => document.querySelector("#statusmsg") as HTMLElement | null,
  botSelector: () => document.querySelector("select[name='leadori']") as HTMLSelectElement | null,
  leadCelInp: () => document.getElementById("leadcel") as HTMLInputElement | null,
  optGroup: () => document.querySelectorAll(".md-check .has-value"),
  optGroupIcon: () => document.querySelectorAll(".md-check i"),
  deriRadio: () => document.querySelectorAll(".md-check .has-value")[1] as HTMLElement | null,
  deriRadioIcon: () => document.querySelectorAll(".md-check i")[1] as HTMLElement | null,
  pullRadio: () => document.querySelectorAll(".md-check .has-value")[0] as HTMLElement | null,
  pullRadioIcon: () => document.querySelectorAll(".md-check i")[0] as HTMLElement | null,
  asignacionRadio: () => document.getElementsByName("asignacion") as NodeListOf<HTMLInputElement>,
} as const;

export type DomCRMTypes = typeof domCRM;

const whatsappNumberSelector = `header 
.xuxw1ft.x6ikm8r.x10wlt62.xlyipyv.x78zum5 
.x1iyjqo2.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft.x1rg5ohu._ao3e`

const inputTextWithNumberSelector = `.x1hx0egp.x6ikm8r.x1odjw0f.x1k6rcq7.x6prxxf`

export const allInMessagesSelector = `.message-in .x9f619.x1hx0egp.x1yrsyyn.xizg8k.xu9hqtb.xwib8y2 .copyable-text .copyable-text span`

export const allOutMessagesSelector = `.message-out .x9f619.x1hx0egp.x1yrsyyn.xizg8k.xu9hqtb.xwib8y2 .copyable-text .copyable-text span`


const elementsToClearSelector = `.x1c4vz4f.x2lah0s.xdl72j9.xlese2p`

const innerInMessageContentSelector = `.copyable-text .copyable-text`

function mergeMessages(messages: string[]): string[] {
  const result: string[] = [];
  let buffer = "";
  let merging = false;
  let shouldContinueNext = false;
  for (let i = 0; i < messages.length; i++) {
    if(shouldContinueNext){
        shouldContinueNext = false;
        continue
    }
    const current = messages[i];

    const isOnlyNewline = current.trim() === "";
    const endsWithNewline = /\n\s*$/.test(current);

    if (endsWithNewline || isOnlyNewline || merging) {
      merging = true;

      if (!isOnlyNewline) {
        buffer += current.trim();
        buffer += " ";
      }

      // Si el próximo NO continúa el flujo, cerramos
      const next = messages[i + 1];
      const nextContinues = next && (/\n\s*$/.test(next) || next.trim() === "");

      if (!nextContinues && next) {
        buffer += next.trim();
        shouldContinueNext = true;
        result.push(buffer.trim())
        buffer = "";
        merging = false;
      }

    } else {
      result.push(current.trim());
    }
  }

  return result;
}




function extractMessagesFromElement(selector: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const start = Date.now()
    const interval = setInterval(() => {
      const el = document.querySelectorAll(selector) as NodeListOf<HTMLElement>
      if (el) {
        const messages = Array.from(el).map((element:HTMLElement) => element.textContent)
        console.log("crude messages", messages)
        const mergedMessages = mergeMessages(messages)
        clearInterval(interval)
        resolve(mergedMessages)
      }
      if (Date.now() - start > 10000) {
        clearInterval(interval)
        reject(null)
      }
    }, 200)
  })
}

export const domWsp/*: DomWspTypes*/ = {
    whatsappNumberElement: () => document.querySelector(whatsappNumberSelector),
    inputTextWithNumber: () => document.querySelectorAll(inputTextWithNumberSelector)[1] as HTMLInputElement,
    allInMessages: async () => await extractMessagesFromElement(allInMessagesSelector),
    allOutMessages: async () => await extractMessagesFromElement(allOutMessagesSelector),
    elementsToClear: () => document.querySelectorAll(elementsToClearSelector)
}