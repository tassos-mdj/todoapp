import "./style.css";
import { Storage } from "./storageController.js";
import { User } from "./user.js";
import { Entry } from "./entry.js";
import { welcomeScreen } from "./screenController.js";
import { loadDashboard } from "./dashboard.js";

export const body = document.querySelector('body');
export function login() {
    user = document.querySelector('#username');
    console.log(user.value);
    loadDashboard(user);
    ls.setUserLoginStatus(user,true);
}

let userLoggedIn = false;
let ls = Storage();
let user;
let currentIndex;

userLoggedIn ? loadDashboard(user) : welcomeScreen();


