import "./style.css";
import { Storage } from "./storageController.js";
import { user } from "./user.js";
import { createDashboard, welcomeScreen, displayContent, displayCategories, resetNonActiveCategory } from "./screenController.js";
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
            date: '2025-01-02'
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
            categories: ['home', 'family'],
            date: '2024-11-30'
        },
        {    
            title: 'Organize Party',
            description: 'Buy booze, send invitations',
            categories: ['fun'],
            date: '2024-12-28'
        },
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
                date: '2024-12-27'
            },
            {
                title: 'Gym routine',
                description: 'Stand-ups, sit-ups, pull-ups, push-ups',
                categories: ['health', 'fun'],
                date: '2024-12-31'
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
        document.getElementById('all-cat').classList.add('active-menu-item');
    }

    //toggle view functionality
    const toogleView = document.querySelector('.toggle-view');

    toogleView.addEventListener('click', function () {
        const article = document.querySelector('article');
        if (article) {
            if (article.classList.contains('list-view')) {
                article.classList.replace('list-view', 'cards-view');
            } else {
                article.classList.replace('cards-view', 'list-view');
            }
        }

    })
    

    //Menu items functionality
    const aside = document.querySelector('aside');
    const lis = aside.querySelectorAll('li');
    const h2 = document.querySelector('.heading');
    let currentHeadingId = h2.id;
    for (let i = 0; i < lis.length; i++) {
        lis[i].addEventListener('click', function () {
            const toggle = document.querySelector('.toggle-view');
            switch (lis[i].id.substring(0,4)) {
                case 'agen':
                    currentHeadingId = 'agenda';
                    displayContent('agenda', loadAgenda(userData.notes));
                    toggle.classList.remove('inactive');
                    break;
                case 'toda':
                    currentHeadingId = 'today';
                    displayContent('today', loadToday(userData.notes));
                    toggle.classList.remove('inactive');
                    break;
                case 'cale':
                    currentHeadingId = 'calendar';
                    displayContent('calendar', userData.notes);
                    toggle.classList.add('inactive');
                    break;
                case 'all-':
                    resetNonActiveCategory(lis[i].id);
                    lis[i].classList.add('active-menu-item');
                    switch (currentHeadingId) {
                        case 'agenda':
                            displayContent('agenda', loadAgenda(userData.notes));
                            break;
                        case 'today' :
                            displayContent('today', loadToday(userData.notes));
                            break;
                        case 'calendar' :
                            displayContent('calendar', userData.notes);
                            break;
                    }
                case 'cat-':
                    resetNonActiveCategory(lis[i].id);
                    lis[i].classList.add('active-menu-item');
                    let passId = lis[i].id.slice(4);
                    switch (currentHeadingId) {
                        case 'agenda':
                            displayContent('agenda', loadAgenda(catFilter(userData.notes, passId)));
                            break;
                        case 'today':
                            displayContent('today', loadToday(catFilter(userData.notes, passId)));
                            break;
                        case 'calendar':
                            displayContent('calendar', catFilter(userData.notes, passId));
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

//Retrieve user note categories from all notes
function catLoader(notes) {
    let catList = [];
    for (let note of notes) {
        for (let category of note.categories) {
            if (!catList.includes(category)) {
                catList.push(category);
            }
        }
    }
    return catList;
}

//Filter categories
function catFilter(notes, id) {
    let filteredCatList = [];
    for (let note of notes) {
        if (note.categories.includes(id)) {
             filteredCatList.push(note);
        }
    }
    return filteredCatList;
}