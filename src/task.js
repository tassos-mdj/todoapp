import { format } from "date-fns";

export function Task(obj) {
    this.title = obj.title;
    this.description = obj.description || '';
    this.categories = obj.categories || [];
    this.date = format (new Date(), "yyy-MM-dd");
}

//example: mytask = new Task({title: 'Major Task', categories: ['home']});

