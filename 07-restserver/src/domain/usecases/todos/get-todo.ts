import {TodoEntity} from "../../entities/todo.entity";
import {TodoRepository} from "../../repositories/todo.repository";

interface GetTodoUseCase {
    execute: (id: number) => Promise<TodoEntity>;
}

export class GetTodo implements GetTodoUseCase {

    constructor(
        private readonly repository: TodoRepository
    ) {
    }

    async execute(id: number): Promise<TodoEntity> {
        return await this.repository.findById(id)
    }
}