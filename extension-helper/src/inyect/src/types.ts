export interface RecognitionResult {
    location: string;
    pull: string;
}

export interface CopiedText{
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
    "options": {
        [key: string]: string[];
    };
}