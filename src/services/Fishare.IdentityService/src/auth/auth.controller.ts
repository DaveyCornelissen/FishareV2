import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/core/guards/local-auth-guard';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth-guard';

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('signIn')
    async signIn(@Request() req) {
        return this.AuthService.login(req.user);
    }

    @UseGuards()
    @Post('signOut')
    signOut() {
        return 'Signing Off...'
    }

    @Post('SignUp')
    signUp() {
        return 'Signing up..'
    }
}
