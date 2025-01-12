import "./style.css";
import { updateIndex } from "./storageController.js";
import { user } from "./user.js";
import { createDashboard, welcomeScreen, displayContent, displayCategories, resetNonActiveCategory, displayTask } from "./screenController.js";
import { format } from "date-fns"; 
import { Task } from "./task.js";



const currentDate = format(new Date(), "yyyy-MM-dd");

// const index = [
//     {
//     username: 'Tassos',
//     view: 'cards',
//     tasks: [
//         {
//             title: 'Groceries',
//             description: 'Flour, Soap, Milk',
//             categories: ['home', 'chores'],
//             duedate: '2025-01-02',
//             id: 0
//         },
//         {
//             title: 'Bar supplies',
//             description: 'vodka, whiskey, gin',
//             categories: ['home', 'fun'],
//             duedate: '2024-12-15',
//             id: 1
//         },
//         {
//             title: 'Food supplies',
//             description: 'Item1, Item2, Item3',
//             categories: ['home', 'family'],
//             duedate: '2024-11-30',
//             id: 2
//         },
//         {    
//             title: 'Organize Party',
//             description: 'Buy booze, send invitations',
//             categories: ['fun'],
//             duedate: '2024-12-28',
//             id: 3
//         },
//     ]
//     },
//     {
//         username: 'Agapi',
//         view: 'list',
//         tasks: [
//             {
//                 title: 'Vacation Planning',
//                 description: 'Get tickets, renew passport',
//                 categories: ['vacation', 'family', 'home'],
//                 duedate: '2024-12-27',
//                 id: 0
//             },
//             {
//                 title: 'Gym routine',
//                 description: 'Stand-ups, sit-ups, pull-ups, push-ups',
//                 categories: ['health', 'fun'],
//                 duedate: '2024-12-31',
//                 id: 1
//             }
//         ]
//     }
// ];

export let currentIndex = updateIndex();
let userData;
let activeUser;
let dashboardLoaded = 0;

const usernameInput = document.querySelector('#username');
const wrapper = document.querySelector('#wrapper');

//hide welcome section after login
export function login() {
    wrapper.style.display = 'none';
    activeUser = usernameInput.value.toLowerCase();
    loadDashboard(activeUser);
}
welcomeScreen();

function logout() {
    usernameInput.value = '';
    activeUser = '';
    const container = document.querySelector('.container');
    container.classList.add('hidden');
    wrapper.style.display = 'flex';
}

function loadDashboard(activeUser) {
    //find user
    userData = currentIndex.reduce((final, entry) => {
        if (entry.username === activeUser){
            final = entry;
            
        }  
            return final;
        } ,{})
    
    //check if user exists to load dashboard. If not add user & load dashboard
    if (Object.keys(userData).length === 0) {
        let addUser = user(activeUser);
        currentIndex.push(addUser);
        updateIndex(currentIndex);
        loadDashboard(activeUser);
        console.log('Login check: new user added');
    } else {
        loadAgenda(userData.tasks);
        createDashboard(userData);
        displayCategories(catLoader(userData.tasks));
        document.getElementById('all-cat').classList.add('active-menu-item');
        console.log('Login check: user already exists, loading dashboard');
    }

    //toggle view functionality
    const toogleView = document.querySelector('.toggle-view');
    dashboardLoaded === 0 ? toogleView.addEventListener('click', viewListener) : console.log('Toggle view Event listener already present'); 
    const controller = new AbortController;

    function viewListener() {
        
        const article = document.querySelector('article');
        if (article) {
            if (article.classList.contains('list-view')) {
                article.classList.replace('list-view', 'cards-view');
            } else {
                article.classList.replace('cards-view', 'list-view');
            }
        }
    
    }
   
    dashboardLoaded === 0 ? menuListenersLoader(userData): console.log('Menu Event listener already present'); 
    taskListenersLoader(userData);
    dashboardLoaded += 1;


    for (let entry of currentIndex) {
        if (entry.username === activeUser) {
            let userIndex = currentIndex.indexOf(entry);
            currentIndex[userIndex] = userData;
        }
    }

    updateIndex(currentIndex);
} 

function resetVisualsRoutine(toggle, id) {
    resetNonActiveCategory(id);
    toggle.classList.remove('inactive');
    document.getElementById('all-cat').classList.add('active-menu-item');
}

function taskAdd() {
    const newTask = document.querySelector('#new-task');
    newTask.showModal();
    let form = document.getElementById('new-task-form');
    const formDefault = form;
    const dateField = document.getElementById('new-date');
    dateField.value = format(new Date(), 'yyyy-MM-dd');
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', (e) => newTask.close());

    // show a message with a type of the input
    function showMessage(input, message, type) {
        // get the small element and set the message
        const msg = input.parentNode.querySelector("small");
        msg.innerText = message;
        // update the class for the input
        input.className = type ? "success" : "error";
        return type;
    }

    function showError(input, message) {
        return showMessage(input, message, false);
    }

    function showSuccess(input) {
        return showMessage(input, "", true);
    }

    function hasValue(input, message) {
        if (input.value.trim() === "") {
            return showError(input, message);
        }
        return showSuccess(input);
    }

    const TITLE_REQUIRED = "Please enter a title";
    

    form.addEventListener("submit", function (event) {
        // stop form submission
        event.preventDefault();

        // validate the form
        let nameValid = hasValue(form.elements["new-title"], TITLE_REQUIRED);
        
        if (nameValid) {
            const inputCategories = form.elements[2].value.split(',');
            const trimmedInputCategories = inputCategories.map(cat => cat.trim());
            let lastId;
            if (userData.tasks.length > 0) {
                lastId = userData.tasks.reduce((acc, val) => {return acc.id > val.id ? acc : val}) + 1;
            } else {
                lastId = 0;
            }
            const newEntry = new Task({title: form.elements[0].value, description: form.elements[1].value, categories: trimmedInputCategories, duedate: form.elements[3].value, id: lastId});
            console.log("New task: ",newEntry);
            userData.tasks.push(newEntry);
            loadDashboard(activeUser);
            form.innerHTML = formDefault.innerHTML;
            newTask.close();
        }
    });

}


function menuListenersLoader(userData){
    //Menu items functionality
    let aside = document.querySelector('aside');
    const lis = aside.querySelectorAll('li');
    const h2 = document.querySelector('.heading');
    let currentHeadingId = h2.id;
    for (let i = 0; i < lis.length; i++) {
        lis[i].addEventListener('click', function () {
            const toggle = document.querySelector('.toggle-view');
            switch (lis[i].id.substring(0, 4)) {
                case 'task':
                    taskAdd();
                    break;
                case 'agen':
                    resetVisualsRoutine(toggle, lis[i].id)
                    currentHeadingId = 'agenda';
                    displayContent('agenda', loadAgenda(userData.tasks));
                    taskListenersLoader(userData);
                    break;
                case 'toda':
                    resetVisualsRoutine(toggle, lis[i].id)
                    currentHeadingId = 'today';
                    displayContent('today', loadToday(userData.tasks));
                    taskListenersLoader(userData);
                    break;
                case 'cale':
                    resetVisualsRoutine(toggle, lis[i].id)
                    currentHeadingId = 'calendar';
                    displayContent('calendar', userData.tasks);
                    taskListenersLoader(userData);
                    break;
                case 'logo':
                    logout();
                    break;

            }
        });
    }
    
}

function taskListenersLoader(userData){

    //Tasks click listener
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

    //Categories Click Listener
    const domCategories = document.querySelector('nav');
    const lis = domCategories.querySelectorAll('li');
    const h2 = document.querySelector('.heading');
    let currentHeadingId = h2.id;
    for (let i = 0; i < lis.length; i++) {
        lis[i].addEventListener('click', function () {
            switch (lis[i].id.substring(0, 4)) {
                case 'all-':
                    resetNonActiveCategory(lis[i].id);
                    lis[i].classList.add('active-menu-item');
                    switch (currentHeadingId) {
                        case 'agenda':
                            displayContent('agenda', loadAgenda(userData.tasks));
                            taskListenersLoader(userData);
                            break;
                        case 'today':
                            displayContent('today', loadToday(userData.tasks));
                            taskListenersLoader(userData);
                            break;
                        case 'calendar':
                            displayContent('calendar', userData.tasks);
                            taskListenersLoader(userData);
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
                            taskListenersLoader(userData);
                            break;
                        case 'today':
                            displayContent('today', loadToday(catFilter(userData.tasks, passId)));
                            taskListenersLoader(userData);
                            break;
                        case 'calendar':
                            displayContent('calendar', catFilter(userData.tasks, passId));
                            taskListenersLoader(userData);
                            break;
                    }
            }
        });
    }
    
}

//Sort tasks for agenda
function loadAgenda(tasks) {
    return tasks.sort((a,b) => new Date(a.duedate) - new Date(b.duedate));
}

//Filter today's tasks
function loadToday(tasks) {
    return tasks.filter((task) => task.duedate === currentDate);
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

//Remove categories
export function removeCategory(taskContainer, task, category) {
    task.categories = task.categories.filter(item => item !== category);
    taskContainer.innerHTML = '';
    displayTask(task);
    loadDashboard(activeUser);
}

export function removeTask(task) {
    const index = userData.tasks.indexOf(task);
    userData.tasks.splice(index, 1);
    loadDashboard(activeUser);
}
