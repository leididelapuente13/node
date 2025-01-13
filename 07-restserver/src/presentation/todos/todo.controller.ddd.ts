import {Request, Response} from "express";
import {CreateTodoDto, TodoRepository, UpdateTodoDto} from "../../domain";

interface todo_params {
    id: string
}

export class TodoController {
    constructor(
        private readonly todoRepository: TodoRepository
    ) {
    }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.todoRepository.getAll();
        res.status(200).json({data: todos});
    }

    public getTodoById = async (req: Request<todo_params>, res: Response) => {
        const id = +req.params.id;

        try {
            const todo = await this.todoRepository.findById(id);
            res.json({todo: todo});
        } catch (error) {
            res.status(400).json({error: error});
        }
    }

    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) res.status(400).json({message: error});

        const todo = await this.todoRepository.create(createTodoDto!);
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.create(({...req.body, id}));
        if (error) res.status(400).json({error: error});

        const updatedTodo = await this.todoRepository.update(updateTodoDto!);
        res.json({todo: updateTodoDto})
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) res.status(400).json({error: 'Id is not a number'})

        const deletedTodo = await this.todoRepository.deleteById(id);
        res.json({todo: deletedTodo});
    }

}