import {Request, Response} from "express";

interface Todo {
    id: number;
    text: string;
    completedAt: Date | null;
}

const todos: Todo[] = [
    {
        id: 1,
        text: 'Buy milk',
        completedAt: new Date(),
    },
    {
        id: 2,
        text: 'Buy eggs',
        completedAt: new Date(),
    },
    {
        id: 3,
        text: 'Buy coke',
        completedAt: new Date(),
    }
]

interface todo_params {
    id: string
}

export class TodoController {
    constructor() {

    }

    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
    }

    public getTodoById = (req: Request<todo_params>, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) res.status(400).json({error: 'Id is not a number'})

        const todo = todos.find(todo => todo.id === id);

        todo ? res.json(todo) : res.status(404).json({error: `todo with id: ${id} does not exist`});
    }

    public createTodo = (req: Request, res: Response) => {
        const {text} = req.body;

        if (!text) res.status(400).json({message: "Text is required"});

        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: new Date()
        }

        todos.push(newTodo);

        res.status(200).json({message: "Todo created successfully", data: newTodo});
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) res.status(400).json({error: 'Id is not a number'})

        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            res.status(404).json({error: `todo with id: ${id} does not exist`});
            return;
        }
        const {text, completedAt} = req.body;
        if (!text) {
            res.status(400).json({message: "Text is required"});
            return;
        }

        todo.text = text || todo.text;
        (completedAt === 'null')
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt || todo.completedAt)

        res.json(todo);
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) res.status(400).json({error: 'Id is not a number'})

        const todo = todos.find(todo => todo.id === id);
        if (!todo) {
            res.status(404).json({error: `todo with id: ${id} does not exist`});
            return;
        }

        todos.splice(todos.indexOf(todo), 1)


        res.status(200).json({
            message: 'Task deleted successfully',
            task_deleted: todo
        })
    }

}