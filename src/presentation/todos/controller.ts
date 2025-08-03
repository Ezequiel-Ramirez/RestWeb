import { Request, Response } from 'express'

const todos = [
    {
        id: 1,
        title: "Todo 1",
        description: "Description 1",
        done: false
    },
    {
        id: 2,
        title: "Todo 2",
        description: "Description 2",
        done: false
    },
    {
        id: 3,
        title: "Todo 3",
        description: "Description 3",
        done: false
    }
]

export class TodoController {

    constructor() {}
    
    public getTodos(req: Request, res: Response) {
        return res.json(todos);
    }

    public getTodoById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.json(todo);
    }

    public createTodo(req: Request, res: Response) {
        const { title, description, done } = req.body;
        if (!title || !description || !done) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const todo = {
            id: todos.length + 1,
            title,
            description,
            done
        }
        todos.push(todo);
        return res.json(todo);
    }

    public updateTodo(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        const { title, description, done } = req.body;
        if (!title || !description || !done) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        todo.title = title;
        todo.description = description;
        todo.done = done;
        return res.json(todo);
    }

    public deleteTodo(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        todos.splice(todos.indexOf(todo), 1);
        return res.json(todo);
    }
}
