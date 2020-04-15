import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdentityDto } from 'src/shared/dto/identity.dto';
import { Identity } from 'src/shared/interface/identity.interface';
import { PasswordService } from 'src/core/services/password/password.service';
import { ApprovalDto } from 'src/shared/dto/approval.dto';

@Injectable()
export class IdentityService {

  constructor(@InjectModel('Identity') private identityModel: Model<Identity>,
    private readonly jwtService: JwtService, private passwordService: PasswordService) { }

  async login(approval: ApprovalDto) {

    const identity = await this.identityModel.findOne({email: approval.email})

    if(identity == null)
      return 'no user found with this email';

    console.log(identity.password);
    const validatePw = await this.passwordService.Compare(approval.password, identity.password);

    console.log(validatePw);
    if(validatePw != true)
      throw new UnauthorizedException();;


    const payload = { id: identity.id, email: identity.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async Create(identity: IdentityDto): Promise<String> {

    const res = await this.identityModel.find({email: identity.email});

    if (res.length > 0)
      return 'Email Already in use!';
      
    let result = this.passwordService.Validate(identity.password, identity.confirmPassword);

    if (result == false)
      return 'Invalid password!';

    const hashedPw = await this.passwordService.Hash(identity.password);
    identity.password = hashedPw;

    const newIdentity = new this.identityModel(identity);
    newIdentity.save();
    return 'Identity Succesfull Created';
  }

}
