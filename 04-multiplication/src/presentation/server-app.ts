import {CreateTable} from "../domain/usecases/create-table.usecase";
import {SaveFile} from "../domain/usecases/save-file.usecase";

interface runOptions {
    base: number;
    limit: number;
    showTable: boolean;
    fileName: string;
    fileDestination: string;
}

export class ServerApp {
    static run({base, limit, showTable, fileName, fileDestination}: runOptions) {
        console.log("Server running...")

        const table = new CreateTable().execute({base, limit});
        const wasCreated = new SaveFile().execute({
            fileContent: table,
            fileName: fileName,
            fileDestination: fileDestination
        });

        if (showTable) {
            console.log(table);
        }

        wasCreated ? console.log("Successfully Created") : console.error("Table not created");
    }
}