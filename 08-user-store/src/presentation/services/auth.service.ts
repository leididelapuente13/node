import {UserModel} from "../../data";
import {CustomError, UserEntity, registerUserDtoType} from "../../domain";
import {bcryptAdapter} from "../../config";


export class AuthService {
    constructor() {
    }

    public async registerUser(registerUserDto: registerUserDtoType) {
        const usersExists = await UserModel.findOne({email: registerUserDto.email});
        if (usersExists) throw CustomError.BAD_REQUEST(`User with email ${registerUserDto.email} already exists`);
        try {
            registerUserDto = {
                ...registerUserDto,
                password: bcryptAdapter.hash(registerUserDto.password),
            }
            const createdUser = await UserModel.create(registerUserDto);
            const {password, ...userEntity} = UserEntity.fromObject(createdUser);
            return {user: userEntity, token: 'ABC'};
        } catch (error) {
            throw CustomError.INTERNAL_SERVER(`${error}`);
        }
    }

}