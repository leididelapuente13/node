import {TodoEntity} from "../../entities/todo.entity";
import {UpdateTodoDto} from "../../dto";
import {TodoRepository} from "../../repositories/todo.repository";

export interface UpdateTodoUseCase {
    execute(dto: UpdateTodoDto): Promise<TodoEntity>
}

export class UpdateTodo implements UpdateTodoUseCase {

    constructor(
        private readonly repository: TodoRepository,
    ) {
    }

    async execute(dto: UpdateTodoDto): Promise<TodoEntity> {
        return await this.repository.update(dto);
    }
}