import {Request, Response} from "express";
import {prisma} from "../../data/postgres";
import {CreateTodoDto} from "../../domain/dto/todos/create-todo.dto";
import {UpdateTodoDto} from "../../domain/dto/todos/update-todo.dto";

interface todo_params {
    id: string
}

export class TodoController {
    constructor() {

    }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        res.json({data: todos});
    }

    public getTodoById = async (req: Request<todo_params>, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id)) res.status(400).json({error: 'Id is not a number'})

        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        })

        todo ? res.json(todo) : res.status(404).json({error: `todo with id: ${id} does not exist`});
    }

    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) res.status(400).json({message: error});

        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        res.status(200).json({message: "Todo created successfully", data: todo});
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.create(({...req.body, id}));

        if(error) res.status(400).json({error: error});

        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        })

        !todo && res.status(404).json({error: `todo with id: ${id} does not exist`});

        const updatedTodo = await prisma.todo.update({
            where: {id: id},
            data: updateTodoDto!.values
        })

        res.json(updatedTodo);
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) res.status(400).json({error: 'Id is not a number'})

        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        })

        !todo && res.status(404).json({error: `todo with id: ${id} does not exist`});


        const deletedTodo = await prisma.todo.delete({where: {id: id}})

        res.status(200).json({
            message: 'Task deleted successfully',
        })
    }

}