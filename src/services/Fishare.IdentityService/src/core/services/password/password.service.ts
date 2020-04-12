import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {

    private Validate(password: String, confirmPassword: String) {

        if (password !== confirmPassword) return false;
    
        if (!password.match(/[A-Z]/)) return false;
    
        if (!password.match(/\d/)) return false;
    
        return true;
      }
    
      private Hash(password: String) {
        
      }
}
