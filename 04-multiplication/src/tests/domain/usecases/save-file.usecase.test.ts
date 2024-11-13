import fs from "fs";
import {SaveFile} from "../../../domain/usecases/save-file.usecase";

describe("Save File UseCase", () => {
    afterEach(() => {
        const outputFolderExists = fs.existsSync('outputs')
        if (outputFolderExists) {
            fs.rmSync('outputs', {recursive: true});
        }
    })

    test("Should save file with default values", () => {
        // arrange
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: "test content",
        }

        // act
        const result = saveFile.execute(options);
        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});

        // assert
        expect(result).toBe(true);
        expect(checkFile).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    })
});

test("Should save file with custom values", () => {
    // arrange
    const saveFile = new SaveFile();
    const options = {
        fileContent: "custom content",
        fileDestination: 'custom-outputs',
        fileName: 'custom-table-name'
    }
    const filePath = 'custom-outputs/custom-table-name.txt';

    // act
    const result = saveFile.execute(options);
    const checkFile = fs.existsSync(options.fileDestination);
    const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});

    // assert
    expect(result).toBe(true);
    expect(checkFile).toBe(true);
    expect(fileContent).toBe(options.fileContent);
})