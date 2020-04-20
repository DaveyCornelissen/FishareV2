import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {

  public Validate(password: string, confirmPassword: string) {
    if (password !== confirmPassword) throw new BadRequestException("Passwords do not match!");

    if (!password.match(/[A-Z]/)) throw new BadRequestException("Passwords doesnt match the criteria of atleast 1 uppercase!");

    if (!password.match(/\d/)) throw new BadRequestException("Passwords doesnt match the criteria of atleast 1 lowercase!");;
  }

  public async Hash(password: string) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
  }

  public async Compare(password: string, dbPassword: string): Promise<Boolean> {
    return bcrypt.compareSync(password, dbPassword);
  }
}
