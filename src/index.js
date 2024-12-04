import "./style.css";
import { Storage } from "./storageController.js";
import { user } from "./user.js";
import { createDashboard, welcomeScreen, displayContent, displayCategories } from "./screenController.js";
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
            date: '2024-12-22'
        },
        {
            title: 'Bar supplies',
            description: 'vodka, whiskey, gin',
            categories: ['home', 'fun'],
            date: '2024-12-15'
        },
        {
            title: 'Food supplies',
            description: 'Item1, Item2, Item3',
            categories: ['home', 'fun'],
            date: '2024-12-04'
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

//hide welcome section after login
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
        loadAgenda(userData.notes);
        createDashboard(userData);
        displayCategories(catLoader(userData.notes));
        console.log(catLoader(userData.notes));
    }

    //toggle view functionality
    const toogleView = document.querySelector('.toggle-view');
    toogleView.addEventListener('click', function () {
        const article = document.querySelector('article');
        console.log('Clicked toggle-view');
        if (article.classList.contains('list-view')) {
            article.classList.replace('list-view', 'cards-view');
        } else {
            article.classList.replace('cards-view', 'list-view');
        }
     

    })

    //Menu items functionality
    const menu = document.querySelector('menu');
    const lis = menu.querySelectorAll('li');
    const h2 = document.querySelector('.heading');
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
            }
            
            let currentHeadingId = h2.id;

            
        });        
    }

    const nav = document.querySelector('nav');
    const navLis = nav.querySelectorAll('li');

    for (let i = 0; i < navLis.length; i++) {
        navLis[i].addEventListener('click', function () {
        if (navLis[i].id.startsWith('cat-')) {
            console.log('clicked cat-');
            let passId = navLis[i].id.slice(4);
            if (currentHeadingId === 'agenda') {
                displayContent('agenda', catFilter(userData.notes, passId));
            } else {
                displayContent('today', catFilter(userData.notes, passId));
            }

        }
        });
    }
} 

//Sort notes for agenda
function loadAgenda(notes) {
    return notes.sort((a,b) => new Date(a.date) - new Date(b.date));
}

//Filter today's notes
function loadToday(notes) {
    return notes.filter((note) => note.date === currentDate);
}

function catLoader(notes) {
    let catList = [];
    for (let note of notes) {
        for (let category of note.categories) {
            console.log(typeof(category),' + ' ,category)
            if (!catList.includes(category)) {
                catList.push(category);
            }
        }
    }
    return catList;
}

function catFilter(notes, id) {
    
    let filteredCatList = [];
    for (let note of notes) {
        if (note.categories.includes(id)) {
             filteredCatList.push(note);
        }
    }
    return filteredCatList;
}