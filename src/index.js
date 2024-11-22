import { toStorage, fromStorage } from "./storageController.js";
import { User } from "./user.js";
import { Entry } from "./entry.js";
import { welcomeScreen } from "./screenController.js";

export const body = document.querySelector('body');

export let userLoggedIn = false;

export let ids = JSON.parse(fromStorage('ids'));
if (ids) {
    typeof(ids) !== Object ? ids = [ids] : ids;
    toStorage('ids', JSON.stringify(ids));
    console.log(ids, typeof(ids));
} else {
    ids = [];
}

//test user
const user = 'Tassos';
let currentUser = new User(user);
console.log(`${currentUser.username} is logged in with id: ${currentUser.id}`);

const user2 = 'Agapi';
let currentUser2 = new User(user);
console.log(`${currentUser2.username} is logged in with id: ${currentUser2.id}`);

// userLoggedIn ? loadDashboard(userId) : welcomeScreen();


