export class Todo {
    public id: string;
    public title: string;
    public dueDate: Date;
    public content: string;
    public isCompleted: boolean;

    constructor(id: string, title: string, dueDate: Date, content: string) {
        this.id = id;
        this.title = title;
        this.dueDate = dueDate;
        this.content = content;
    }
}