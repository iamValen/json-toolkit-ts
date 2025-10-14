import { renameKey, deleteKey, } from "./jsonUtils";

async function main() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  let users = await res.json();

  renameKey(users, "website", "url");
  deleteKey(users, "company.bs");
  deleteKey(users, "address.geo");

}

main();
