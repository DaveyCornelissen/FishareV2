import { Test, TestingModule } from '@nestjs/testing';
import { PasswordService } from 'src/core/services/password/password.service';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('PasswordService', () => {
  let passwordService: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    passwordService = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(passwordService).toBeDefined();
  });

  it('Validate should be equel', () => {
    const pwd = 'TestPassword12!';
    const confirmPwd = 'TestPassword12!';
    
    expect(() => {passwordService.Validate(pwd, confirmPwd)}).not.toThrow(BadRequestException);
  })

  it('Validate should throw no equel', () => {
    const pwd = 'TestPassword';
    const confirmPwd = 'TestPassword12!';
    try {
      expect(() => {passwordService.Validate(pwd, confirmPwd)}).toThrow(BadRequestException);
    } catch (error) {
      expect(error.message).toBe("Passwords do not match!");
    }
  })

  it('Validate should throw no Uppercase', () => {
    const pwd = 'testpassword12!';
    const confirmPwd = 'testpassword12!';
    try {
      expect(() => {passwordService.Validate(pwd, confirmPwd)}).toThrow(BadRequestException);
    } catch (error) {
      expect(error.message).toBe("Passwords doesnt match the criteria of atleast 1 uppercase!");
    }
  })

  it('Validate should throw no Lowercase', () => {
    const pwd = 'TESTPASSWORD';
    const confirmPwd = 'TESTPASSWORD';
    try {
      expect(() => {passwordService.Validate(pwd, confirmPwd)}).toThrow(BadRequestException);
    } catch (error) {
      expect(error.message).toBe("Passwords doesnt match the criteria of atleast 1 lowercase!");
    }
  })

  it('Compare should return TRUE', async () => {
    const pwd = 'TESTPASSWORD';
    const HashedPwd = await bcrypt.hash(pwd, 10);
    expect(passwordService.Compare(pwd, HashedPwd)).toBeTruthy;
  })

  it('Compare should return FALSE', async () => {
    const pwd = 'TESTPASSWORD';
    const HashedPwd = await bcrypt.hash("Diffrent", 10);
    expect(passwordService.Compare(pwd, HashedPwd)).toBeFalsy;
  })
});
