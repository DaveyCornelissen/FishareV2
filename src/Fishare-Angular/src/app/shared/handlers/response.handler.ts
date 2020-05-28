
export class ResponseHandler {
    timestamp: Date;
    status: number;
    data: any;
    path: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
