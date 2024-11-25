import { body } from "./index.js";
export class Dashboard {
    constructor(userId) {
        this.user = userId;
    }

    view = 'cards';
    
    
}

export function loadDashboard(user) {
    body.innerHTML = "";
    const welcomeHeadline = document.createElement('h1');
    welcomeHeadline.textContent = `Welcome ${user.value}!`;
    body.appendChild(welcomeHeadline);
}