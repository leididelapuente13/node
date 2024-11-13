import fs from "fs";

export interface SaveFileUseCase {
    execute: (options: Options) => boolean;
}

export interface Options {
    fileContent         : string;
    fileDestination?    : string;
    fileName?           : string;
}

export class SaveFile implements SaveFileUseCase {
    constructor(
        /**
         * StrorageRepository
         */
    ) {
    }

    execute({fileContent, fileDestination='outputs', fileName='table'}: Options): boolean {
        try {
            fs.mkdirSync(fileDestination, {recursive: true})
            fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent, 'utf8');
            return true;
        }catch (error){
            console.error(error);
            return false;
        }
    }
}