export class CustomError extends Error {
    private constructor(public readonly statusCode: number, public readonly message: string) {
        super(message);
    }

    static BAD_REQUEST(message: string) {
        return new CustomError(400, message);
    };

    static NOT_AUTHORIZED(message: string) {
        return new CustomError(401, message);
    };

    static FORBIDDEN(message: string) {
        return new CustomError(403, message);
    };

    static NOT_FOUND (message: string) {
        return new CustomError(404, message);
    };

    static INTERNAL_SERVER(message: string) {
        return new CustomError(500, message);
    }

}