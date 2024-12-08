import "./style.css";
import { Storage } from "./storageController.js";
import { user } from "./user.js";
import { createDashboard, welcomeScreen, displayContent, displayCategories, resetNonActiveCategory, displayTask } from "./screenController.js";
import { format } from "date-fns"; 



const currentDate = format(new Date(), "yyyy-MM-dd");

const index = [
    {
    username: 'Tassos',
    view: 'cards',
    tasks: [
        {
            title: 'Groceries',
            description: 'Flour, Soap, Milk',
            categories: ['home', 'chores'],
            date: '2025-01-02',
            id: 0
        },
        {
            title: 'Bar supplies',
            description: 'vodka, whiskey, gin',
            categories: ['home', 'fun'],
            date: '2024-12-15',
            id: 1
        },
        {
            title: 'Food supplies',
            description: 'Item1, Item2, Item3',
            categories: ['home', 'family'],
            date: '2024-11-30',
            id: 2
        },
        {    
            title: 'Organize Party',
            description: 'Buy booze, send invitations',
            categories: ['fun'],
            date: '2024-12-28',
            id: 3
        },
    ]
    },
    {
        username: 'Agapi',
        view: 'list',
        tasks: [
            {
                title: 'Vacation Planning',
                description: 'Get tickets, renew passport',
                categories: ['vacation', 'family', 'home'],
                date: '2024-12-27',
                id: 0
            },
            {
                title: 'Gym routine',
                description: 'Stand-ups, sit-ups, pull-ups, push-ups',
                categories: ['health', 'fun'],
                date: '2024-12-31',
                id: 1
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
        loadAgenda(userData.tasks);
        createDashboard(userData);
        displayCategories(catLoader(userData.tasks));
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
            switch (lis[i].id.substring(0, 4)) {
                case 'agen':
                    currentHeadingId = 'agenda';
                    displayContent('agenda', loadAgenda(userData.tasks));
                    toggle.classList.remove('inactive');
                    break;
                case 'toda':
                    currentHeadingId = 'today';
                    displayContent('today', loadToday(userData.tasks));
                    toggle.classList.remove('inactive');
                    break;
                case 'cale':
                    currentHeadingId = 'calendar';
                    displayContent('calendar', userData.tasks);
                    toggle.classList.add('inactive');
                    break;
                case 'all-':
                    resetNonActiveCategory(lis[i].id);
                    lis[i].classList.add('active-menu-item');
                    switch (currentHeadingId) {
                        case 'agenda':
                            displayContent('agenda', loadAgenda(userData.tasks));
                            break;
                        case 'today':
                            displayContent('today', loadToday(userData.tasks));
                            break;
                        case 'calendar':
                            displayContent('calendar', userData.tasks);
                            break;
                    }
                    break;
                case 'cat-':
                    resetNonActiveCategory(lis[i].id);
                    lis[i].classList.add('active-menu-item');
                    let passId = lis[i].id.slice(4);
                    switch (currentHeadingId) {
                        case 'agenda':
                            displayContent('agenda', loadAgenda(catFilter(userData.tasks, passId)));
                            break;
                        case 'today':
                            displayContent('today', loadToday(catFilter(userData.tasks, passId)));
                            break;
                        case 'calendar':
                            displayContent('calendar', catFilter(userData.tasks, passId));
                    }

            }
        });
    }

    let domTasks = document.querySelectorAll('.task');
    for (let domTask of domTasks) {
        domTask.addEventListener('click', () => {
            for (let userTask of userData.tasks) {
                if (`task-${userTask.id}` === domTask.id) {
                    displayTask(userTask);
                }
            }
    })
    }
} 

//Sort tasks for agenda
function loadAgenda(tasks) {
    return tasks.sort((a,b) => new Date(a.date) - new Date(b.date));
}

//Filter today's tasks
function loadToday(tasks) {
    return tasks.filter((task) => task.date === currentDate);
}

//Retrieve user task categories from all tasks
function catLoader(tasks) {
    let catList = [];
    for (let task of tasks) {
        for (let category of task.categories) {
            if (!catList.includes(category)) {
                catList.push(category);
            }
        }
    }
    return catList;
}

//Filter categories
function catFilter(tasks, id) {
    let filteredCatList = [];
    for (let task of tasks) {
        if (task.categories.includes(id)) {
             filteredCatList.push(task);
        }
    }
    return filteredCatList;
}

