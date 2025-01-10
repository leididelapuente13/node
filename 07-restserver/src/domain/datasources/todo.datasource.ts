import {CreateTodoDto} from "../dto/todos/create-todo.dto";
import {UpdateTodoDto} from "../dto/todos/update-todo.dto";
import {TodoEntity} from "../entities/todo.entity";

export abstract class TodoDatasource {

    abstract getAll(): Promise<TodoEntity[]>;
    abstract findById(id: number): Promise<TodoEntity>;
    abstract create(todo: CreateTodoDto): Promise<TodoEntity>;
    abstract deleteById(): Promise<TodoEntity>;
    abstract update(todo: UpdateTodoDto): Promise<TodoEntity>;
}