
export class Todo {
    constructor( text, priority, date) {
        this.id = Math.floor(Math.random() * 100000 + 246547);
        this.text = text;
        this.priority = priority;
        this.date  = date;
    }


}