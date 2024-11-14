import yargs from 'yargs'
import {hideBin} from "yargs/helpers";

export const yarg = yargs(hideBin(process.argv))
    .options({
        b: {
            alias: "base",
            type: "number",
            demandOption: true,
            describe: "Multiplication table base",
        },
        l: {
            alias: "limit",
            type: "number",
            default: 10,
            describe: "Multiplication table limit",
        },
        s: {
            alias: "show",
            type: "boolean",
            default: false,
            describe: "Show multiplication table",
        },
        n: {
            alias: "file name",
            type: "string",
            default: "table",
            describe: "File name",
        },
        d: {
            alias: "destination",
            type: "string",
            default: "./outputs",
            describe: "File destination",
        }
    })
    .check((argv, options) => {
        if (argv.b < 1) throw ("Error: The base must be a positive number");
        return true;
    })
    .parseSync()