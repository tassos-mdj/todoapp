import "./style.css";
import { Storage } from "./storageController.js";
import { user } from "./user.js";
import { Entry } from "./entry.js";
import { welcomeScreen } from "./screenController.js";
import { loadDashboard } from "./screenController.js";

const index = [
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
];

export let currentIndex = index;
export let ls = Storage();
export const body = document.querySelector('body');
export function login() {
    const usernameInput = document.querySelector('#username');
    loadDashboard(usernameInput.value);
}
welcomeScreen();

