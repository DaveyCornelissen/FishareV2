import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IdentityService } from './identity.service';
import { LocalAuthGuard } from 'src/core/guards/local-auth-guard';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth-guard';

@Controller('auth')
export class IdentityController {
    constructor(private IdentityService: IdentityService) {}

    @UseGuards(LocalAuthGuard)
    @Post('signIn')
    async signIn(@Request() req) {
        return this.IdentityService.login(req.user);
    }

    @UseGuards()
    @Post('signOut')
    signOut() {
        return 'Signing Off...'
    }

    @Post('SignUp')
    signUp(@Request() req) {
        return this.IdentityService.Create(req.body)
    }
}
