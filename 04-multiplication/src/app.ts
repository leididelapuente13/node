import {yarg} from "./plugins/yargs.plugin";
import {ServerApp} from "./presentation/server-app";
// anonymous function auto called
(
    ()=>{
        main()
    }
)();

function main (){
    const {b: base, l: limit, s: showTable, n: fileName, d: fileDestination} = yarg;
    ServerApp.run({base, limit, showTable, fileName, fileDestination});
}