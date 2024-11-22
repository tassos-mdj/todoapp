import { body } from "./index.js";

export function welcomeScreen() {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('id', 'wrapper');
    const welcomeHeadline = document.createElement('h1');
    welcomeHeadline.setAttribute('id', 'welcome-headline');
    welcomeHeadline.textContent = 'MDj-Do App';
    const welcomeText = document.createElement('p');
    welcomeText.setAttribute('id', 'welcome-text');
    welcomeText.textContent = "Welcome to Mdj-Do! Please enter your username below:";

    wrapper.appendChild(welcomeHeadline);
    wrapper.appendChild(welcomeText);
    body.appendChild(wrapper);

}