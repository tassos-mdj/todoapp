import { body } from "./index.js";
import { login } from "./index.js";

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
    login.setAttribute('onclick', 'login()');
    login.textContent = 'Login';

    const createAccount = document.createElement('span');
    createAccount.setAttribute('id', 'signup-label');
    createAccount.textContent = "Don't have an account?";
    
    const signUp = document.createElement('button');
    signUp.setAttribute('id', 'signup-button');
    signUp.setAttribute('onclick', 'signUpForm()');
    signUp.textContent = 'Sign Up';





    welcomeSection.appendChild(welcomeHeadline);
    welcomeSection.appendChild(welcomeText);
    welcomeSection.appendChild(usernameInput);
    welcomeSection.appendChild(login);
    welcomeSection.appendChild(createAccount);
    welcomeSection.appendChild(signUp);
    wrapper.appendChild(welcomeSection);
    body.appendChild(wrapper);



}

export function loadDashboard(user) {

}