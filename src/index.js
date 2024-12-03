import "./style.css";
import { Storage } from "./storageController.js";
import { user } from "./user.js";
import { createDashboard, welcomeScreen, displayContent } from "./screenController.js";
import { format } from "date-fns"; 


const currentDate = format(new Date(), "yyyy-MM-dd");

const index = [
    {
    username: 'Tassos',
    view: 'cards',
    notes: [
        {
            title: 'Groceries',
            description: 'Flour, Soap, Milk',
            categories: ['home', 'chores'],
            date: '2024-12-03'
        },
        {
            title: 'Bar supplies',
            description: 'vodka, whiskey, gin',
            categories: ['home', 'fun'],
            date: '2024-12-15'
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
                categories: ['vacation', 'family', 'home'],
                date: '2024-12-06'
            },
            {
                title: 'Gym routine',
                description: 'Stand-ups, sit-ups, pull-ups, push-ups',
                categories: ['health', 'fun'],
                date: '2024-12-08'
            }
        ]
    }
];

export let currentIndex = index;
export let ls = Storage();
export const body = document.querySelector('body');

export function login() {
    const usernameInput = document.querySelector('#username');
    const wrapper = document.querySelector('#wrapper');
    wrapper.style.display = 'none';
    loadDashboard(usernameInput.value);
}
welcomeScreen();

function loadDashboard(activeUser) {
    //find user
    const userData = currentIndex.reduce((final, entry) => {
        if (entry.username === activeUser){
            final = entry;
            
        }  
            return final;
        } ,{})
    
    //check if user exists to load dashboard. If not add user & load dashboard
    if (Object.keys(userData).length === 0) {
        let addUser = user(activeUser);
        currentIndex.push(addUser);
        loadDashboard(activeUser);
    } else {
        createDashboard(userData);
    }

    const aside = document.querySelector('menu');
    const lis = aside.querySelectorAll('li');

    for (let i = 0; i < lis.length; i++) {
        lis[i].addEventListener('click', function () {
            switch (lis[i].id) {
                case 'agenda':
                    displayContent('agenda', loadAgenda(userData.notes));
                    break;
                case 'today':
                    displayContent('today', loadToday(userData.notes));
                    break;
                case 'view-all':
                    //loadViewAll(userData);
                    console.log('Clicked View All!');
                    break;
                case 'cat-all':
                    displayContent('agenda', userData);
                    break;
                
            }
                });
    }
  
}

function loadAgenda(notes) {
    return notes.sort((a,b) => new Date(a.date) - new Date(b.date));
}

function loadToday(notes) {
    return notes.filter((note) => note.date === currentDate);
}