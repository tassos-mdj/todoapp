// import { toStorage, fromStorage } from "./storageController.js";
// import 

export class User {
    constructor(username) {
        this.username = username;
        this.id = idIndex.length;
        console.log('new user id: ',this.id);
        console.log('ids list type: ',typeof(ids));
        let updatedIds = ids.push(this.id);

        toStorage('ids', JSON.stringify(updatedIds));
    }

    

}