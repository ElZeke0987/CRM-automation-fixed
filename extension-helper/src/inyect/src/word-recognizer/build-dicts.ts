


import { nameDict } from "./name-dict";
import { locationDictionary, pullsDict } from "./loc-dict";
import { normalize } from "./normalizer";
import type { Entity, dictType } from "../types";


export const NAME_EXACT_MAP = new Map<string, Entity[]>();
export const LOCATION_PULLS_EXACT_MAP = new Map<string, Entity[]>();
export const LOCATION_LOCALIDADES_EXACT_MAP = new Map<string, Entity[]>();

export const objOfMaps:{
    "nombres": Map<string, Entity[]>,
    "localidades": Map<string, Entity[]>,
    "pulls": Map<string, Entity[]>
} = {
    "nombres": NAME_EXACT_MAP,
    "localidades": LOCATION_LOCALIDADES_EXACT_MAP,
    "pulls": LOCATION_PULLS_EXACT_MAP
};

export function dictToIndex(dict: dictType ): Entity[] {
  const index: Entity[] = [];

  function processOptions(
    options: Record<string, string[]>,
    category: string,
    subType: string,
  ) {
    for (const canonical in options) {
      
      for (const variant of options[canonical]) {
        const entity: Entity = {
            match: normalize(variant),
            canonical,
            category,
            subType,
            priority: variant.length
        }; 
        index.push(entity);
        const EXACT_MAP = objOfMaps[dict.name];
        if (!EXACT_MAP.has(entity.match)) {
            EXACT_MAP.set(entity.match, []);
        }
        EXACT_MAP.get(entity.match)!.push(entity);
      }
    }
  }

  switch(dict.name) {
    case "nombres":
      processOptions(dict.options, "person", "name");
      break;
    case "localidades":
      processOptions(dict.options, "location", "city");
      break;
    case "pulls":
      processOptions(dict.options, "locationByPull", "pull");
      break;
    default:
      break;
  }

    
  return index;
}

export const buildLocDict = dictToIndex(locationDictionary);
//console.log("buildLocDict", buildLocDict);
export const buildNameDict = dictToIndex(nameDict);
//console.log("buildNameDict", buildNameDict);
export const buildPullsDict = dictToIndex(pullsDict);
//console.log("buildPullsDict", buildPullsDict);
