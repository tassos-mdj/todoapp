import { login as loginFunction } from "./index.js"
import hash from "./images/hash.svg"

export function welcomeScreen() {
    const login = document.querySelector('#login-button');
    login.addEventListener('click', (e) => {loginFunction()});
}

export function createDashboard(userData){
    const container = document.querySelector('.container');
    container.classList.remove('hidden');

    const userNameDisplay = document.querySelector('.user-name-display');
    userNameDisplay.textContent = userData.username;

    displayContent('agenda', userData.notes);
}

export function displayContent(section, userNotes) {
    resetActiveMenuItems();
    resetActiveCategory();

    const currentSection = document.getElementById(section);
    currentSection.classList.add('active-menu-item');

    
    const dataArea = document.querySelector('.data-area');
    dataArea.innerHTML = '';

    const heading = document.createElement('h2');
    heading.setAttribute('id', section);
    heading.classList.add('heading');
    heading.textContent = section;
    dataArea.appendChild(heading);
    
    const article = document.createElement('article');
    article.classList.add('list-view');
    
    if (userNotes.length === 0) {
        let task = document.createElement('div');
        task.classList.add('task');

        let taskTitle = document.createElement('h3');
        taskTitle.classList.add('task-title');
        taskTitle.textContent = 'All clear, nothing on your plate!';
        task.appendChild(taskTitle);
        article.appendChild(task);
    }

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
        dueDate.textContent = note.date;
        task.appendChild(dueDate);
    
        article.appendChild(task);
    }



    dataArea.appendChild(article);
}

function resetActiveMenuItems() {
    document.getElementById('agenda').classList.remove('active-menu-item');
    document.getElementById('today').classList.remove('active-menu-item');
    document.getElementById('view-all').classList.remove('active-menu-item');
}

export function resetActiveCategory() {
    const nav = document.querySelector('nav');
    const categories = nav.querySelectorAll('li');
    for (let category of categories) {
        category.classList.remove('active-menu-items');
    }
}

export function displayCategories(catList) {
    const catUl = document.getElementById('cat-ul');
    for (let item of catList) {
        let itemId = 'cat-' + item.toLowerCase();
        const li = document.createElement('li');
        li.setAttribute('id', itemId);
        const img = new Image();
        img.src = hash;
        const p  = document.createElement('p');
        p.textContent = item;
        li.appendChild(img);
        li.appendChild(p);
        catUl.appendChild(li);
    }
}
