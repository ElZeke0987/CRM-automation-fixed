import { normalize } from "./normalizer";
import { recognizeListWords } from "./recognizer";

export function initRecognizing(input: string | string[]) {
    // TODO: Implement center recognition logic
    if(typeof input === "string") {
        const normalizedInput = normalize(input);
        //console.log("Normalized input: ", normalizedInput);
        const recognized = recognizeListWords([normalizedInput]) ;
        console.log("Recognized: ", recognized);
        return recognized;
    }else{
        const normalizedInput = input.map(normalize);
       //console.log("Normalized input: ", normalizedInput);
        const recognized = recognizeListWords(normalizedInput) ;
        console.log("Recognized: ", recognized);
        return recognized;
    }
    
}

