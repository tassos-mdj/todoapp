import { login as loginFunction } from "./index.js"
import hash from "./images/hash.svg"
import { add, format } from "date-fns";
import { removeCategory } from "./index.js";

export function welcomeScreen() {
    const login = document.querySelector('#login-button');
    login.addEventListener('click', (e) => {loginFunction()});
}

export function createDashboard(userData){
    const container = document.querySelector('.container');
    container.classList.remove('hidden');

    const userNameDisplay = document.querySelector('.user-name-display');
    userNameDisplay.textContent = userData.username;

    displayContent('agenda', userData.tasks);
}

export function displayContent(section, userTasks) {
    resetActiveMenuItems();

    const currentSection = document.getElementById(section);
    currentSection.classList.add('active-menu-item');
    
    const dataArea = document.querySelector('.data-area');
    dataArea.innerHTML = '';

    const heading = document.createElement('h2');
    heading.setAttribute('id', section);
    heading.classList.add('heading');
    heading.textContent = section;
    dataArea.appendChild(heading);
    
    if (section === "calendar") {
        loadCalendar(userTasks);
    } else {
        const article = document.createElement('article');
        article.classList.add('list-view');
        loadTasks(article, userTasks);
        dataArea.appendChild(article);
    }
    
}

export function displayTask(task) {
    const taskView = document.querySelector('#task-view');
    taskView.innerHTML = '';
    createTask(taskView, task, 'active-task');
    taskView.showModal();
}

function loadTasks(article, userTasks) {
    if (userTasks.length === 0) {
        let task = document.createElement('div');
        task.classList.add('task');

        let taskDescription = document.createElement('p');
        taskDescription.classList.add('task-description');
        taskDescription.textContent = 'All clear!';
        task.appendChild(taskDescription);
        article.appendChild(task);
    }

    for (let currentTask of userTasks) {
        createTask(article, currentTask, currentTask.id);
        
    }

}

function createTask(container, currentTask, taskID) {
    let task = document.createElement('div');
    task.classList.add('task');
    task.setAttribute('id', `task-${taskID}`);

    let taskTitle = document.createElement('h3');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = currentTask.title;
    task.appendChild(taskTitle);

    let taskDescription = document.createElement('p');
    taskDescription.classList.add('task-description');
    taskDescription.textContent = currentTask.description;
    task.appendChild(taskDescription);

    const categories = document.createElement('div');
    categories.classList.add('task-categories');
    
    for (let category of currentTask.categories) {
        let span = document.createElement('span');
        span.classList.add('task-category');

        // Add delete button on active task only
        const link = document.createElement('a');
        link.addEventListener('click', e => task.id === 'task-active-task' ? removeCategory(task, currentTask, category) : console.log('Task open'));
        link.textContent = ' x';
        span.textContent = '#' + category;
        if (task.id === 'task-active-task') { span.appendChild(link); }

        categories.appendChild(span);
    }
    // Add + button for adding categories
    const addButton = document.createElement('span');
    addButton.classList.add('task-category-add-button');
    addButton.textContent = '+';
    if (task.id === 'task-active-task') {categories.appendChild(addButton);}

    task.appendChild(categories);

    let dueDate = document.createElement('div');
    dueDate.classList.add('due-date');
    dueDate.textContent = currentTask.date;
    task.appendChild(dueDate);

    container.appendChild(task);
}

function resetActiveMenuItems() {
    document.getElementById('agenda').classList.remove('active-menu-item');
    document.getElementById('today').classList.remove('active-menu-item');
    document.getElementById('calendar').classList.remove('active-menu-item');
}

export function resetNonActiveCategory(id) {
    const nav = document.querySelector('nav');
    const categories = nav.querySelectorAll('li');
    for (let category of categories) {
        if (category.id !== id) {
        category.classList.remove('active-menu-item');
        }
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

function loadCalendar(userTasks) {
    
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();

    const day = document.querySelector(".calendar-dates");

    const currdate = document
        .querySelector(".calendar-current-date");

    const dataArea = document.querySelector('.data-area');
    const container = document.createElement('div');
    container.classList.add('calendar-container');
    dataArea.appendChild(container);

    // Array of month names
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    // Function to generate the calendar
    const manipulate = () => {

        // Get the first day of the month
        let dayone = new Date(year, month, 0).getDay();

        // Get the last date of the month
        let lastdate = new Date(year, month + 1, -1).getDate();

        // Get the day of the last date of the month
        let dayend = new Date(year, month, lastdate).getDay();

        // Get the last date of the previous month
        let monthlastdate = new Date(year, month, 0).getDate();

        
        // Loop to add the last dates of the previous month
        for (let i = dayone; i > 0; i--) {
            const li = document.createElement('div');
            li.classList.add('inactive');
            const p = document.createElement('p');
            p.textContent = monthlastdate - i + 1;
            li.appendChild(p);

            // Load day's tasks
            loadTasks(li, userTasks.filter((task) => task.date === format(new Date(year, month - 1, monthlastdate - i + 1), "yyy-MM-dd")));

            container.appendChild(li);
      }


        // Loop to add the dates of the current month
        for (let i = 1; i <= lastdate; i++) {

            // Check if the current date is today
            let isToday = i === date.getDate()
                && month === new Date().getMonth()
                && year === new Date().getFullYear()
                ? "active"
                : "idle";

                const li = document.createElement('div');
                li.classList.add(isToday);
                const p = document.createElement('p');
                p.textContent = i;
                li.appendChild(p);

                // Load day's tasks
                loadTasks(li, userTasks.filter((task) => task.date === format(new Date(year, month, i), "yyy-MM-dd")));

                container.appendChild(li);
        }

        // Loop to add the first dates of the next month
        for (let i = dayend; i < 6; i++) {

            const li = document.createElement('div');
            li.classList.add('inactive');
            const p = document.createElement('p');
            p.textContent = i - dayend + 1;
            li.appendChild(p);

            // Load day's tasks
            loadTasks(li, userTasks.filter((task) => task.date === format(new Date(year, month + 1, i - dayend + 1), "yyy-MM-dd")));

            container.appendChild(li);
        }

        const tasks = document.querySelectorAll('.task');
        for (let task of tasks) {
            task.classList.add('task-calendar');
        }

    }

manipulate();



}

