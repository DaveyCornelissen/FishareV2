import { Controller, Post, Body, ValidationPipe, UsePipes, Param, Delete } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { RegistrationDto } from 'src/shared/dto/registration.dto';
import { IdentityDto } from 'src/shared/dto/identity.dto';
import { Transform } from 'stream';

@Controller('identity')
export class IdentityController {
    constructor(private IdentityService: IdentityService) {}

    @Post('approval')
    async signIn(@Body() req : IdentityDto) {
        return this.IdentityService.login(req);
    }

    @Delete('removal/:id')
    @UsePipes(new ValidationPipe())
    signOut(@Param('id') id, @Body() req: IdentityDto) {
        console.log(id);
        return this.IdentityService.Delete(id, req);
    }

    @Post('registration')
    @UsePipes(new ValidationPipe())
    signUp(@Body() req: RegistrationDto) {
        return this.IdentityService.Create(req)
    }
}
