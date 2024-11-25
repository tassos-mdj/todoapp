import "./style.css";
import { Storage } from "./storageController.js";
import { User } from "./user.js";
import { Entry } from "./entry.js";
import { welcomeScreen } from "./screenController.js";
import { loadDashboard } from "./screenController.js";

export let ls = Storage();
export const body = document.querySelector('body');
export function login() {
    const usernameInput = document.querySelector('#username');
    loadDashboard(usernameInput.value);
    console.log(usernameInput.value);
}
welcomeScreen();


export const index = [
    {
    username: 'Tassos',
    view: 'cards',
    notes: [
        {
            title: 'Groceries',
            description: 'Flour, Soap, Milk',
            categories: ['home', 'chores']
        },
        {
            title: 'Bar supplies',
            description: 'vodka, whiskey, gin',
            categories: ['home', 'fun']
        }
    ]
    },
    {
        username: 'Agapi',
        view: 'list',
        notes: [
            {
                title: 'Vacation Planning',
                description: 'Get tickets, renew passport',
                categories: ['vacation', 'family', 'home']
            },
            {
                title: 'Gym routine',
                description: 'Stand-ups, sit-ups, pull-ups, push-ups',
                categories: ['health', 'fun']
            }
        ]
    }
]

// export function login() {
//     const usernameInput = document.querySelector('#username');
//     const exists = (element) => element.username === usernameInput.value;
//     index.some(exists) ? loadDashboard(currentUser) : alert('You must sign up');
//     console.log(index);
// }

// export function signUpForm() {
//     const usernameInput = document.querySelector('#username');
//     currentUser = new User(usernameInput.value);
//     let newIndex = index.push(currentUser);
//     ls.updateIndex(newIndex);
// }


// let index = ls.updateIndex();
// let currentUser = new User();
// currentUser.getUserLoginStatus() === true ? loadDashboard(currentUser) : welcomeScreen();


