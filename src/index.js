import "./style.css";
import { Storage } from "./storageController.js";
import { User } from "./user.js";
import { Entry } from "./entry.js";
import { welcomeScreen } from "./screenController.js";
import { loadDashboard } from "./dashboard.js";

export const body = document.querySelector('body');
export let userLoggedIn = false;
export function login() {
    user = document.querySelector('#username');
    console.log(user.value);
    loadDashboard(user);
}

let ls = Storage();
let user;

userLoggedIn ? loadDashboard(user) : welcomeScreen();


