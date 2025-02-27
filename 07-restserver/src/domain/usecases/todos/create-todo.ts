import {TodoEntity} from "../../entities/todo.entity";
import {CreateTodoDto} from "../../dto";
import {TodoRepository} from "../../repositories/todo.repository";

export interface CreateTodoUseCase {
    execute(dto: CreateTodoDto): Promise<TodoEntity>
}

export class CreateTodo implements CreateTodoUseCase{

    constructor(
        private readonly repository: TodoRepository,
    ) {
    }

    async execute(dto: CreateTodoDto): Promise<TodoEntity> {
        return await this.repository.create(dto);
    }
}