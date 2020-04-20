export class User {
    id: number;
    email: string;
    userName: string;
    password: string;
    confirmPassword?: string;
    address: string;
    country: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
