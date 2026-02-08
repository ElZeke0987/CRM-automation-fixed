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

const allMessagesSelector = `x1n2onr6 .x1f6kntn.xjb2p0i.x8r4c90.xo1l8bm.x1ic7a3i.x12xpedu._ao3e._aupe.copyable-text`

const elementsToClearSelector = `.x1c4vz4f.x2lah0s.xdl72j9.xlese2p`

export const domWsp/*: DomWspTypes*/ = {
    whatsappNumberElement: () => document.querySelector(whatsappNumberSelector),
    inputTextWithNumber: () => document.querySelectorAll(inputTextWithNumberSelector)[1] as HTMLInputElement,
    allMessages: () => document.querySelectorAll(allMessagesSelector),
    elementsToClear: () => document.querySelectorAll(elementsToClearSelector)
}