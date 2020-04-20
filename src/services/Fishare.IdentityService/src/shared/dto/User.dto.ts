export class UserDTO {
    
    Id: Number;

    email: string;

    username: string;

    country: string;

    constructor(id: number, email: string, username: string, country: string) {
        this.Id = id,
        this.email = email,
        this.username = username,
        this.country = country
    }
}