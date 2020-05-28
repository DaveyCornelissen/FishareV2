
import { Test } from '@nestjs/testing/test';
import { IdentityController } from 'src/identity/identity.controller';
import { IdentityService } from 'src/identity/identity.service';
import { IdentityDto } from 'src/shared/dto/identity.dto';
import { ValidationPipe } from '@nestjs/common';
import { async } from 'rxjs/internal/scheduler/async';
import { RegistrationDto } from 'src/shared/dto/registration.dto';
import { rejects } from 'assert';


describe('Identity Controller', () => {
  let identityController: IdentityController;
  let spyidentityService: IdentityService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      controllers: [IdentityController],
      providers: [
        {
          provide: IdentityService,
          useValue: {
            Login: jest.fn(),
            Create: jest.fn(),
            Delete: jest.fn()
          }
        }
      ]
    }).compile();

    identityController = testingModule.get(IdentityController);
    spyidentityService = testingModule.get(IdentityService);
  });

  it('signIn DTO validation success', async () => {
    const identityDTO = new IdentityDto('testmail@gmail.com', 'Password123456!');
    jest.spyOn(spyidentityService, 'Login').mockImplementation(async () => "success");
    expect(await identityController.signIn(identityDTO)).toBe('success');
  })

  // it('signIn DTO validation failed', async () => {
  //   const identityDTO = new IdentityDto('testmail@gmail.com', 'Password123456!');
  //   expect(await identityController.signIn(identityDTO)).toThrow();
  // })

  it('SignUp DTO validation success', async () => {
    const registerDTO = new RegistrationDto('testmail@gmail.com', 'testing', 'Password123456!', 'Password123456!', 'The TestingLands');
    jest.spyOn(spyidentityService, 'Create').mockImplementation(async () => "success");
    expect(await identityController.signUp(registerDTO)).toBe('success')
  })

  // it('SignUp DTO validation failed', async () => {
  //   const registerDTO = new RegistrationDto('testmailmail.com', '2345', '', 'Password12345!', 'The TestingLands');
  //   expect(await identityController.signUp(registerDTO)).rejects.toThrow();
  // })

});
