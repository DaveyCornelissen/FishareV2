import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegistrationDto } from 'src/shared/dto/registration.dto';
import { Identity } from 'src/identity/identity.interface';
import { PasswordService } from 'src/core/services/password/password.service';
import { IdentityDto } from 'src/shared/dto/identity.dto';

@Injectable()
export class IdentityService {

  constructor(@InjectModel('Identity') private identityModel: Model<Identity>,
    private readonly jwtService: JwtService, private passwordService: PasswordService) { }

  async login(approval: IdentityDto): Promise<any> {

    const identityDb = await this.identityModel.findOne({ email: approval.email })

    if (identityDb == null)
      throw new BadRequestException("Couldn't find a user with that email!");

    console.log(identityDb.password);
    const validatePw = await this.passwordService.Compare(approval.password, identityDb.password);

    console.log(validatePw);
    if (validatePw != true)
      throw new UnauthorizedException();;


    const payload = { id: identityDb.id, email: identityDb.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async Create(registration: RegistrationDto): Promise<string> {

    const identityDb = await this.identityModel.find({ email: registration.email });

    if (identityDb.length > 0)
      throw new BadRequestException("Email already exists!");

    this.passwordService.Validate(registration.password, registration.confirmPassword);

    const hashedPw = await this.passwordService.Hash(registration.password);
    registration.password = hashedPw;

    const newIdentity = new this.identityModel(registration);
    newIdentity.save();
    return 'Youre account is succesfully created!';
  }

  //need to check the jwt token claims to match the payload values
  async Delete(id: Number, removal: IdentityDto): Promise<string> {

    const identityDb = await this.identityModel.findOne({ _id: id, email: removal.email })

    if (identityDb != null) 
      throw new BadRequestException("Email and id does not match!");

    const validatePw = await this.passwordService.Compare(removal.password, identityDb.password);

    if (!validatePw) 
      throw new BadRequestException("Password does not match!");

    this.identityModel.deleteOne(identityDb);
    return String(`Succesfully removed Identity: ${identityDb.id}`);
  }
}
