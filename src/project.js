import { Todo } from "./todoclass.js";

export class Project {

    constructor(title, tasklist = []) {
        this.title = title;
        this.tasklist = tasklist;
    }

    addProject(todo) {
        if (todo instanceof Todo) {
            this.tasklist.push(todo);
            console.log(`added "${todo.text}" to ${this.title}`)
        } else {
            console.error("invalid Todo provided");
        }

    }
}