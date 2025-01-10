import {CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto} from "../../domain";
import {prisma} from "../../data/postgres";

export class TodoDatasourceImpl implements TodoDatasource {
   async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return [];
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        })
    }
    async create(todo: CreateTodoDto): Promise<TodoEntity> {
        const newTodo = await prisma.todo.create({
            data: todo
        });
    }

    async deleteById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.delete({
            where: {
                id: id
            }
        })
    }

    async update(id: number, todo: UpdateTodoDto): Promise<TodoEntity> {
        const updatedTodo = await prisma.todo.update({
            where: id,
            data: todo
        })
    }

}