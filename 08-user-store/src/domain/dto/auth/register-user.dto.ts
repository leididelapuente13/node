import {z} from "zod";

const registerUserDto = z.object({
    name: z.string({required_error: 'The name is required'}),
    email: z.string({required_error: 'The email is required'}).email({message: 'It should be a valid email'}),
    password: z.string().min(8, {message: 'Password must be at least 8 characters'}),
});

export const validateRegisterUserDto = (data: {[key: string]: any})=>{
    return registerUserDto.safeParse(data);
}

export type registerUserDtoType = z.infer<typeof registerUserDto>