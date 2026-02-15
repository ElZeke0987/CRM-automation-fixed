

export interface crmRequest extends Record<string, string | undefined> {
    form_token: string;
    leadori: string;//Joha es Q
    leadfecha: string;
    leadname: string;
    leadcel: string;
    leadloca: string;
    asignacion: string;//puede ser derivar(grupo) o pull
    spullderi: string;
    sgrupoderi?: string;
    producto: string;//Default es 2
    gestion: string;//Default es 1
    comentario: string;//Default es ""
    cargar: string;//Default es ""
}

export interface RecognitionResult {
    location: string;
    pull: string;
    name?: string;
}

export interface CopiedText{
    messageToSend: string,
    whatsappNumber: string,
    recognized: RecognitionResult
}

export interface Entity {
  match: string;
  canonical: string;
  category: string;
  subType: string;
  priority: number;
}
type dictNames = "nombres"|"localidades"|"pulls";
export interface dictType {
    "name": dictNames;
    "type": "enum";
    "options":  {
        [key: string]: readonly string[];
    };
}