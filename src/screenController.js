import { body } from "./index.js";
import { login as loginFunction } from "./index.js"
import { index } from "./index.js";

export function welcomeScreen() {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'wrapper');
    const welcomeSection = document.createElement('section');

    welcomeSection.setAttribute('id', 'welcome-section');
    const welcomeHeadline = document.createElement('h1');

    welcomeHeadline.setAttribute('id', 'welcome-headline');
    welcomeHeadline.textContent = 'MDj-Do App';

    const welcomeText = document.createElement('p');
    welcomeText.setAttribute('id', 'welcome-text');
    welcomeText.textContent = "Welcome to Mdj-Do! Please enter your username below:";

    const usernameInput = document.createElement('input');
    usernameInput.setAttribute('type', 'text');
    usernameInput.setAttribute('name', 'username');
    usernameInput.setAttribute('id', 'username');
    const login = document.createElement('button');
    login.setAttribute('id', 'login-button');
    login.addEventListener('click', (e) => {loginFunction()});
    login.textContent = 'Login';

    welcomeSection.appendChild(welcomeHeadline);
    welcomeSection.appendChild(welcomeText);
    welcomeSection.appendChild(usernameInput);
    welcomeSection.appendChild(login);

    wrapper.appendChild(welcomeSection);
    body.appendChild(wrapper);
}

export function loadDashboard(user) {
    body.innerHTML = "";
    const welcomeHeadline = document.createElement('h1');
    welcomeHeadline.textContent = `Welcome ${user}!`;
    body.appendChild(welcomeHeadline);

    const userData = index.reduce((final, entry) => {
        if (entry.username === user)
            final = entry;
            return final;
        } ,{})
    console.log(userData);
    const showdata = document.createElement('p');
    showdata.textContent = userData.notes[0].title;
    body.appendChild(showdata);
}
