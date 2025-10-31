import { Todo } from "./todoclass.js";

export class Project {

    constructor(id = Math.floor(Math.random() * 1000), title, tasklist = []) {
        this.id = id
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