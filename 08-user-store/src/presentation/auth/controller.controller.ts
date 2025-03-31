import {Request, Response} from "express";
import {AuthService} from "../services/auth.service";
import {CustomError, validateRegisterUserDto} from "../../domain";

export class AuthController {
    constructor(
        public readonly authService: AuthService,
    ) {
    }

    static handleError = (error: unknown, res: Response)=> {
        if(error instanceof CustomError) {
            res.status(error.statusCode).json({error: error.message});
        }

        res.status(500).json({error: 'Internal Server Error'});
    }

    registerUser = async ({body}: Request, res: Response) => {
        try {
            const {error, data, success} = validateRegisterUserDto(body);
            if (!success) res.json(error);

            const response = await this.authService.registerUser(data!);
            res.json(response);
        } catch (error) {
            AuthController.handleError(error, res);
        }
    }

    loginUser = (req: Request, res: Response) => {
        res.json('login user');
    }

    validateEmail = ({params}: Request, res: Response) => {
        res.json(params.token);
    }
}