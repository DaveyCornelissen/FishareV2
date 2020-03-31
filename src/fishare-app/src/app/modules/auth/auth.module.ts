import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
