import "./style.css";
import { Storage } from "./storageController.js";
import { User } from "./user.js";
import { Entry } from "./entry.js";
import { welcomeScreen } from "./screenController.js";
import { storageInit } from "./storageController.js";

export const body = document.querySelector('body');

export let userLoggedIn = false;

let ls = Storage();

userLoggedIn ? loadDashboard(userId) : welcomeScreen();


