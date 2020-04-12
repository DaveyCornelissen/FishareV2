import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdentityDto } from 'src/shared/dto/identity.dto';
import { Identity } from 'src/shared/interface/identity.interface';

@Injectable()
export class IdentityService {

  constructor(@InjectModel('Identity') private identityModel: Model<Identity>,
    private readonly jwtService: JwtService, ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.userRepo.findOne(username);
    // if (user && user.password === pass) {
    //     const { password, ...result } = user;
    //     return result;
    // }
    return null;
  }

  async login(identity: IdentityDto) {
    const payload = { id: 1, email: identity.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  //Need to hash the password. and check if the passwords are valid.
  async Create(identity: IdentityDto): Promise<String> {

    let result = this.ValidatePassword(identity.password, identity.confirmPassword);

    if (result == false)
      return 'Invalid password!';



    const newIdentity = new this.identityModel(identity);
    newIdentity.save();
    return 'Identity Succesfull Created';
  }

}
