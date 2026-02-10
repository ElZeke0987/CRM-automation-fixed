
import { nameDict } from "./name-dict";
import { locationDictionary } from "./loc-dict";
import { clearText } from "./clearer";
import { normalize } from "./normalizer";
import { buildPullsDict, dictToIndex } from "./build-dicts";
import { buildLocDict, buildNameDict } from "./build-dicts";
import { RecognitionResult } from "../types";

const EXACT_MAP = new Map<string, string>();

function generateWindows(tokens: string[], maxSize = 4) {
  const windows = [];

  for (let size = 1; size <= maxSize; size++) {
    for (let i = 0; i <= tokens.length - size; i++) {
      windows.push({
        text: tokens.slice(i, i + size).join(" "),
        start: i,
        end: i + size
      });
    }
  }

  return windows;
}
const numbersToWords: Record<string, string> = {
  1: "uno",
  2: "dos",
  3: "tres",
  4: "cuatro",
  5: "cinco",
  6: "seis",
  7: "siete",
  8: "ocho",
  9: "nueve",
  10: "diez",
  11: "once",
  12: "doce",
  13: "trece",
  14: "catorce",
  15: "quince",
  16: "dieciséis",
  17: "diecisiete",
  18: "dieciocho",
  19: "diecinueve",
  20: "veinte",
  21: "veintiuno",
  22: "veintidós",
  23: "veintitrés",
  24: "veinticuatro",
  25: "veinticinco",
  26: "veintiséis",
  27: "veintisiete",
  28: "veintiocho",
  29: "veintinueve",
  30: "treinta",
  31: "treinta y uno"
};



export function recognizeWord(input: string): RecognitionResult {
    // TODO: Implement center recognition logic

    // const clearedText = clearText(input);
    console.log("TESTING RECOGNIZING=====", input)
    let nameDetected: string | null = null;
    let locationDetect: string | null = null;
    let pullDetected: string | null = null;
    const normalizedInput = normalize(input);
    const tokens = normalizedInput.split(" ");
    const windows = generateWindows(tokens);
    //console.log("Windows:", windows);
    const found: any[] = []
    for(const entry of buildLocDict) {
        //console.log("trying:", entry.match);
        windows.forEach(window => {
            
            if(window.text===normalize(entry.match)) {
                console.log("Found location:", window, entry.match)
                found.push(entry.canonical)
            }
        })
        
    }
    if(found.length > 0) {
        console.log("FIND ", found)
        const longest = found.reduce((max, curr) =>{
            if(curr.text&&max.text){
                return curr.text.length > max.text.length ? curr : max
            }
            return max
        });
        console.log("Longest: ", longest)
        longest.replace(
            /\b([1-9]|[12][0-9]|3[01])\b/g,
            (n: string) => numbersToWords[n]
        );
        locationDetect = longest;
    }
    if(!locationDetect) return {location: "", pull: ""}
    for(const entry of buildPullsDict) {
        //console.log("Trying: ", normalize(entry.match), " === ", normalize(locationDetect))
        if(normalize(entry.match.toLowerCase()) === normalize(locationDetect.toLowerCase())) {
            console.log("RETURNING AFTER RECOGNIZING========", locationDetect.toLowerCase(), entry)
            return {location: locationDetect, pull: entry.canonical};
        }
    }
    return {location: locationDetect, pull: ""};
}

export function recognizeListWords(input: string[]): RecognitionResult[] {
    // TODO: Implement center recognition logic

    
    const results: RecognitionResult[] = [];
    input.forEach(word => {
        const result = recognizeWord(word);
        if (result) {
            results.push(result);
        }
    });

    return results;
}