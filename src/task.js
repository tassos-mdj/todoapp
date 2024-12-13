import { format } from 'date-fns';

export class Task {
    constructor (obj) {
        this.title = obj.title;
        this.description = obj.description || '';
        this.categories = obj.categories || [];
        this.date = format(new Date(), 'yyyy-MM-dd');
        this.id = obj.id;
    }


}