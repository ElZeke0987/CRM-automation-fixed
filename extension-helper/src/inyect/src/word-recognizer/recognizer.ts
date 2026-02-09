
import { nameDict } from "./name-dict";
import { locationDictionary } from "./loc-dict";
import { clearText } from "./clearer";
import { normalize } from "./normalizer";
import { buildPullsDict, dictToIndex } from "./build-dicts";
import { buildLocDict, buildNameDict } from "./build-dicts";

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

export function recognizeWord(input: string): string | null {
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
    for(const entry of buildLocDict) {
        if(windows.some(window => {
            //console.log("trying:", entry.match, " == ", window.text);
            return window.text===normalize(entry.match)
        })) {
            console.log("Location detected:", entry.canonical)
            locationDetect = entry.canonical;
        }
    }
    if(!locationDetect) return null
    for(const entry of buildPullsDict) {
        console.log("Trying: ", normalize(entry.match), " === ", normalize(locationDetect))
        if(normalize(entry.match) === normalize(locationDetect)) {
            console.log("RETURNING AFTER RECOGNIZING========", input, entry)
            return entry.match;
        }
    }
    return null;
}

export function recognizeListWords(input: string[]): string[] {
    // TODO: Implement center recognition logic

    
    const results: string[] = [];
    input.forEach(word => {
        const result = recognizeWord(word);
        if (result) {
            results.push(result);
        }
    });

    return results;
}