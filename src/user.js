import { ls as localStorage } from "./index.js"
export class User {
    constructor(username) {
        this.username = username;
        
    }

    getUserLoginStatus() {
        if (!localStorage.fromStorage('userLoginStatus')) {
           return false;
        } else {
          return localStorage.fromStorage('userLoginStatus');
        }
      }
  
      setUserLoginStatus(currUser, currStatus) {
        localStorage.toStorage('userLoginStatus', JSON.stringify({user: currUser, status: currStatus}));
      }
    
}