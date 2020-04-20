
export class ResponseHandler {
    timestamp: Date;
    status: number;
    message: any;
    path: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
