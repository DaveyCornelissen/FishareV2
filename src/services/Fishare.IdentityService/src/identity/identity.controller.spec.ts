import { IdentityController } from './identity.controller';
import { IdentityService } from './identity.service';
import { Test } from '@nestjs/testing/test';
import { IdentityDto } from 'src/shared/dto/identity.dto';
import { async } from 'rxjs/internal/scheduler/async';
import { IdentityModule } from './identity.module';
import { PasswordService } from 'src/core/services/password/password.service';
import { JwtService } from '@nestjs/jwt';


describe('Identity Controller', () => {
  let identityController: IdentityController;
  let spyidentityService: IdentityService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [IdentityController],
      providers: [
        {
          provide: IdentityService,
          useFactory: () => ({
            login: jest.fn(() => true),
            create: jest.fn(() => true),
            delete: jest.fn(() => true),
          }),
        },
      ]
      })
      .compile();

      identityController = testingModule.get(IdentityController);
      spyidentityService = testingModule.get(IdentityService);

  });

  it('signIn DTO validation success',async () => {
    const identityDTO = new IdentityDto('testmail@gmail.com', 'Password123456!');
    // jest.spyOn(identityService, 'login').mockImplementation(async () => "success");
    expect(await identityController.signIn(identityDTO)).toBe('success');
  })

});
