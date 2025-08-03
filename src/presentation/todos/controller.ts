import { Request, Response } from 'express'
import { prisma } from '../../config/data/postgres';
import { CreateTodoDto, UpdateTodoDto, GetTodosDto, GetTodoByIdDto, DeleteTodoDto } from '../../domain/dtos/todos';
import { title } from 'process';

export class TodoController {

    constructor() {}
    
    public async getTodos(req: Request, res: Response) {
        const [error, getTodosDto] = GetTodosDto.create({
            page: req.query.page,
            limit: req.query.limit,
            completed: req.query.completed === 'true' ? true : req.query.completed === 'false' ? false : undefined
        });
        
        if (error) {
            return res.status(400).json({ message: error });
        }

        const todos = await prisma.todo.findMany(getTodosDto!.toObject());
        return res.json(todos);
    }

    public async getTodoById(req: Request, res: Response) {
        const [error, getTodoByIdDto] = GetTodoByIdDto.create({ id: req.params.id });
        
        if (error) {
            return res.status(400).json({ message: error });
        }
        
        const todo = await prisma.todo.findUnique({
            where: {
                id: getTodoByIdDto!.getId()
            }
        })
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.json(todo);
    }

    public async createTodo(req: Request, res: Response) {
        const { title } = req.body;
        const [error, createTodoDto] = CreateTodoDto.create({ title });
        if (error) {
            return res.status(400).json({ message: error });
        }
        const todo = await prisma.todo.create({
            data: createTodoDto!.toObject()
        })
        return res.json(todo);
    }

    public async updateTodo(req: Request, res: Response) {
        const [idError, getTodoByIdDto] = GetTodoByIdDto.create({ id: req.params.id });
        if (idError) {
            return res.status(400).json({ message: idError });
        }
        
        const [error, updateTodoDto] = UpdateTodoDto.create({ title: req.body.title, completedAt: req.body.completedAt });
        if (error) {
            return res.status(400).json({ message: error });
        }
        
        const todo = await prisma.todo.findUnique({
            where: {
                id: getTodoByIdDto!.getId()
            }
        })
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        const updatedTodo = await prisma.todo.update({
            where: {
                id: getTodoByIdDto!.getId()
            },
            data: updateTodoDto!.toObject()
        })
        return res.json(updatedTodo);
    }

    public async deleteTodo(req: Request, res: Response) {
        const [error, deleteTodoDto] = DeleteTodoDto.create({ id: req.params.id });
        
        if (error) {
            return res.status(400).json({ message: error });
        }
        
        const todo = await prisma.todo.findUnique({
            where: {
                id: deleteTodoDto!.getId()
            }
        })
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        const deletedTodo = await prisma.todo.delete({
            where: {
                id: deleteTodoDto!.getId()
            }
        })
        return res.json(deletedTodo);
    }
}
