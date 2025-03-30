import {CustomError} from "../errors/custom.error";

interface User {
    id: string;
    name: string;
    email: string;
    email_verified: boolean;
    password: string;
    role: Roles[],
    img?: string;
}

enum Roles {
    ADMIN = "ADMIN_ROLE",
    USER = "USER_ROLE",
}

export class UserEntity {

    public id: string;
    public name: string;
    public email: string;
    public email_verified: boolean;
    public password: string;
    public role: Roles[];
    public img?: string;


    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.email_verified = user.email_verified;
        this.password = user.password;
        this.role = user.role;
        this.img = user.img;
    }

    static fromObject(object: { [key: string]: any }): UserEntity {
        const {id, _id, name, email, email_verified, password, role, img} = object;

        if (!_id && id) throw CustomError.BAD_REQUEST('Missing id');
        if (!name) throw CustomError.BAD_REQUEST('Missing name');
        if (!email) throw CustomError.BAD_REQUEST('Missing email');
        if (email_verified === undefined) throw CustomError.BAD_REQUEST('Missing email validated');
        if (!password) throw CustomError.BAD_REQUEST('Missing password');
        if (!role) throw CustomError.BAD_REQUEST('Missing role');

        return new UserEntity({
            id: id || _id,
            name: name,
            email: email,
            email_verified: email_verified,
            password: password,
            role: role,
            img: img
        });
    }
}