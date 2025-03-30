import {envs} from './config/envs'
import {AppRoutes} from "./presentation/routes";
import {Server} from "./presentation/server";
import {MongoDatabase} from "./data";

(async ()=>{
    await main();
})()

async function main(){
    const {PORT, MONGO_URL, MONGO_DB_NAME} = envs;
    await MongoDatabase.connect({mongoUrl: MONGO_URL, dbName: MONGO_DB_NAME})
    const server = new Server({port: PORT, routes: AppRoutes.routes});
    await server.start();
}