import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class AuthService {

    
    constructor(private readonly jwtService: JwtService,
        @InjectRepository(User) 
        private userRepo: Repository<User>) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userRepo.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
