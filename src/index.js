import { toStorage, fromStorage } from "./storageController.js";
import { Entry } from "./entry.js";

const title = "First Note";
const content = "Myfirst Note Content";

const newEntry = new Entry(title, content);

console.log(newEntry.title, newEntry.date);
