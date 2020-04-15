import { Controller, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { IdentityDto } from 'src/shared/dto/identity.dto';
import { ApprovalDto } from 'src/shared/dto/approval.dto';


@Controller('identity')
export class IdentityController {
    constructor(private IdentityService: IdentityService) {}

    @Post('approval')
    async signIn(@Body() req : ApprovalDto) {
        return this.IdentityService.login(req);
    }

    @Post('removal')
    signOut() {
        return 'Signing Off...'
    }

    @Post('registration')
    @UsePipes(new ValidationPipe())
    signUp(@Body() req: IdentityDto) {
        return this.IdentityService.Create(req)
    }
}
