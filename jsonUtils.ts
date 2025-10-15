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

export function transformValue(json: JSONObject[], key: string, fn: (val: any) => any) {
  for (const obj of json) {
    if (obj[key] !== undefined) {
      obj[key] = fn(obj[key]);
    }
  }
}

export function mergeData(json: JSONObject[], data: Partial<JSONObject>) {
  for (const obj of json) Object.assign(obj, data);
}

export function filterData(json: JSONObject[], fn: (obj: JSONObject) => boolean) {
  return json.filter(fn);
}

export function saveJson(path: string, data: JSONObject[]) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

export function loadJson(path: string) {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
}
