import { body } from "./index.js";
import { login as loginFunction } from "./index.js"
import { currentIndex } from "./index.js";
import { user } from "./user.js";

export function welcomeScreen() {
    const login = document.querySelector('#login-button');
    login.addEventListener('click', (e) => {loginFunction()});
}

export function createDashboard(userData){
    const container = document.querySelector('.container');
    container.classList.remove('hidden');

    const userNameDisplay = document.querySelector('.user-name-display');
    userNameDisplay.textContent = userData.username;

    loadAgenda(userData);
    
}

function loadAgenda(userData) {
    const userNotes = userData.notes;
    console.log(userNotes);
    const dataArea = document.querySelector('.data-area');
    console.log(dataArea);

    const heading = document.createElement('h2');
    heading.textContent = 'Agenda';
    console.log(heading);
    dataArea.appendChild(heading);
    
    const article = document.createElement('article');
    article.classList.add('list-view');
    

    for (let note of userNotes) {
    
    let task = document.createElement('div');
    task.classList.add('task');

    let taskTitle = document.createElement('h3');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = note.title;
    task.appendChild(taskTitle);

    let taskDescription = document.createElement('p');
    taskDescription.classList.add('task-description');
    taskDescription.textContent = note.description;
    task.appendChild(taskDescription);

    let dueDate = document.createElement('div');
    dueDate.classList.add('due-date');
    
    article.appendChild(task);

    }

    dataArea.appendChild(article);
}



