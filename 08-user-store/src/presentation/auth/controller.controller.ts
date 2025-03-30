import {Request, Response} from "express";

export class AuthController {
    constructor() {
    }

    registerUser = (req: Request, res: Response)=>{
        res.json('register user');
    }

    loginUser = (req: Request, res: Response)=>{
        res.json('login user');
    }

    validateEmail = ({params}: Request, res: Response)=>{
        res.json(params.token);
    }
}