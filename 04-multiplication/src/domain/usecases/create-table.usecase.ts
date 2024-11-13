export interface createTableUseCase {
    execute: (options: createTableOptions) => string
}

interface createTableOptions {
    base: number;
    limit?: number;
}

export class CreateTable implements createTableUseCase {
    constructor(
        /**
         * Dependency Injection
         */
    ) {
    }

    execute({base, limit = 10}: createTableOptions) {
        let outputMessage: string = '';
        for (let i: number = 1; i <= limit; i++) {
            outputMessage += `${base} x ${i} = ${base * i}`;
            if (i < limit) outputMessage += '\n'
        }
        return outputMessage
    }
}