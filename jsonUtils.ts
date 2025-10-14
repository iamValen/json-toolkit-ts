import * as fs from "fs";

export type JSONObject = Record<string, any>;

export function renameKey(json: JSONObject[], oldKey: string, newKey: string) {
  for (const obj of json) {
    if (obj.hasOwnProperty(oldKey)) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }
  }
}

export function deleteKey(json: JSONObject[], keyPath: string) {
  const keys = keyPath.split(".");
  for (const obj of json) {
    let target = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      target = target[keys[i]];
      if (!target) break;
    }
    if (target) delete target[keys[keys.length - 1]];
  }
}