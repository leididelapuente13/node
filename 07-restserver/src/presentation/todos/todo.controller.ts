import {Request, Response} from "express";
import {
    CreateTodo,
    CreateTodoDto,
    DeleteTodo,
    GetTodo,
    GetTodos,
    TodoRepository,
    UpdateTodo,
    UpdateTodoDto
} from "../../domain";

interface todo_params {
    id: string
}

export class TodoController {
    constructor(
        private readonly todoRepository: TodoRepository
    ) {
    }

    public getTodos =  (req: Request, res: Response) => {
        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch((error) => res.json(error))
    }

    public getTodoById = (req: Request<todo_params>, res: Response) => {
        const id = +req.params.id;

        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch((error) => res.json(error))
    }

    public createTodo = (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) res.status(400).json({message: error});

        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => res.json(todo))
            .catch((error) => res.json(error))
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.create(({...req.body, id}));
        if (error) res.status(400).json({error: error});

        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then(todo => res.json(todo))
            .catch((error) => res.json(error))
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) res.status(400).json({error: 'Id is not a number'})

        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch((error) => res.json(error))
    }

}