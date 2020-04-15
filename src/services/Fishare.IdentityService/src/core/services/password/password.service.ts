import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {

  public Validate(password: string, confirmPassword: string) {

    if (password !== confirmPassword) return false;

    if (!password.match(/[A-Z]/)) return false;

    if (!password.match(/\d/)) return false;

    return true;
  }

  public async Hash(password: string) {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
  }

  public async Compare(password: string, dbPassword: string): Promise<Boolean> {
    return bcrypt.compareSync(password, dbPassword);
  }
}
