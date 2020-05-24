
import { Test } from '@nestjs/testing/test';
import { IdentityController } from 'src/identity/identity.controller';
import { IdentityService } from 'src/identity/identity.service';
import { IdentityDto } from 'src/shared/dto/identity.dto';


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

  it('signIn DTO validation success',async () => {
    const identityDTO = new IdentityDto('testmail@gmail.com', 'Password123456!');
    jest.spyOn(spyidentityService, 'Login').mockImplementation(async () => "success");
    expect(await identityController.signIn(identityDTO)).toBe('success');
  })

  it('signIn DTO validation failed',async () => {
    const identityDTO = new IdentityDto('testmail@gmail.com', '');
    //jest.spyOn(spyidentityService, 'Login').mockImplementation(async () => "success");
    await expect(identityController.signIn(identityDTO)).rejects.toThrow();
  })


});
