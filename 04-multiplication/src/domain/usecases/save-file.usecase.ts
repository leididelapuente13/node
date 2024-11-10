import fs from "fs";

export interface SaveFileUsecase {
    execute: (options: Options) => boolean;
}

export interface Options {
    fileContent : string;
    fileDestination: string;
    fileName   : string;
}

export class SaveFile implements SaveFileUsecase {
    constructor(
        /**
         * StrorageRepository
         */
    ) {
    }

    execute({fileContent, fileDestination, fileName}: Options): boolean {
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