import express, {Router} from 'express';
import * as path from "node:path";

interface Options{
    port: number;
    routes: Router,
    public_path?: string,
}

export class Server {

    public readonly app =  express();
    private serverListener?: any;
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor(options: Options) {

        const {port, routes, public_path='public'} = options;

        this.port = port;
        this.routes = routes;
        this.public_path = public_path;
    }

    async start() {
        /* middlewares*/
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        /*public folder*/
        this.app.use(express.static(path.join(this.public_path)));

        /*routes*/
        this.app.use(this.routes);

        this.serverListener = this.app.listen(this.port, ()=>{
            console.log(`Server listening on port ${this.port}, http://localhost:${this.port}`);
        });
    }

    public close (){
        this.serverListener?.close();
    }

}