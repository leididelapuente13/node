import {CreateTodoDto, UpdateTodoDto} from "../dto";
import {TodoEntity} from "../entities/todo.entity";

export abstract class TodoRepository {

    abstract getAll(): Promise<TodoEntity[]>;

    abstract findById(id: number): Promise<TodoEntity>;

    abstract create(todo: CreateTodoDto): Promise<TodoEntity>;

    abstract deleteById(id: number): Promise<TodoEntity>;

    abstract update(todo: UpdateTodoDto): Promise<TodoEntity>;
}