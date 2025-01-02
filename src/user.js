import { ls as localStorage } from "./index.js"
import { currentIndex } from "./index.js";
export function user(username) {
        return {
            "username": username,
            "view" : "cards",
            "tasks" : []
        }      
    }


