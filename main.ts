import {
  renameKey,
  deleteKey,
  transformValue,
  mergeData,
  filterData,
  saveJson
} from "./jsonUtils";

async function main() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  let users = await res.json();

  renameKey(users, "website", "url");
  deleteKey(users, "company.bs");
  deleteKey(users, "address.geo");

  transformValue(users, "email", (email) => email.replace(/@[\w.-]+/, "@ualg.pt"));
  mergeData(users, { source: "jsonplaceholder" });

  users = filterData(users, (u) => u.name.startsWith("C"));

  saveJson("users_modified.json", users);
  console.log("Saved users_modified.json");
}

main();
