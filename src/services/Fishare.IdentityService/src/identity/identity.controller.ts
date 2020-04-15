import { Controller, Post, UseGuards, Request, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IdentityService } from './identity.service';
import { LocalAuthGuard } from 'src/core/guards/local-auth-guard';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth-guard';
import { IdentityDto } from 'src/shared/dto/identity.dto';


@Controller('identity')
export class IdentityController {
    constructor(private IdentityService: IdentityService) {}

    @UseGuards(LocalAuthGuard)
    @Post('approval')
    async signIn(@Request() req) {
        return this.IdentityService.login(req.user);
    }

    @Post('removal')
    signOut() {
        return 'Signing Off...'
    }

    @Post('registration')
    @UsePipes(new ValidationPipe())
    signUp(@Body() body: IdentityDto) {
        return this.IdentityService.Create(body)
    }
}
