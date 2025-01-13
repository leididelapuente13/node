import {CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto} from "../../domain";
import {prisma} from "../../data/postgres";

export class TodoDatasourceImpl implements TodoDatasource {
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map((todo) => TodoEntity.fromJson(todo))
    }

    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findFirst({
            where: {
                id: id
            }
        })
        if(!todo) throw `Todo with id ${id} not found`
        return TodoEntity.fromJson(todo)
    }

    async create(todo: CreateTodoDto): Promise<TodoEntity> {
        const newTodo = await prisma.todo.create({
            data: todo!
        });
        return TodoEntity.fromJson(newTodo);
    }

    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id);

        const todo = await prisma.todo.delete({
            where: {
                id: id
            }
        })
        return TodoEntity.fromJson(todo);
    }

    async update(todo: UpdateTodoDto): Promise<TodoEntity> {
        await this.findById(todo.id);

        const updatedTodo = await prisma.todo.update({
            where: {id: todo.id},
            data: todo!.values
        });

        return TodoEntity.fromJson(updatedTodo);
    }

}