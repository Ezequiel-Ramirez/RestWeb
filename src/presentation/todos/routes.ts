import { Router } from "express";
import { TodoController } from "./controller";

const todoController = new TodoController();

export class TodoRoutes {
    static get routes(): Router {
        const router = Router();
        router.get("/", todoController.getTodos);
        router.get("/:id", todoController.getTodoById);
        router.post("/", todoController.createTodo);
        router.put("/:id", todoController.updateTodo);
        router.delete("/:id", todoController.deleteTodo);
        return router;
    }
}
