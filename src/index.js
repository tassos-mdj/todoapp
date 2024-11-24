import "./style.css";
import { Storage } from "./storageController.js";
import { User } from "./user.js";
import { Entry } from "./entry.js";
import { welcomeScreen } from "./screenController.js";

export const body = document.querySelector('body');

export let userLoggedIn = false;

let ls = Storage();
let user;

userLoggedIn ? loadDashboard(user) : welcomeScreen();

function login() {
    user = document.querySelector('#username');
    console.log(user);
}





