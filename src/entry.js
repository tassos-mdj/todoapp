import { constructNow } from 'date-fns';

export class Entry {
    constructor (title, content) {
        this.title = title;
        this.content = content;
        this.date = constructNow();
    }


}