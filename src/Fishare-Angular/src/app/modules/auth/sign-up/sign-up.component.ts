import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/User';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  submitted = false;
  User = new User();

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      country: ['', Validators.required],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, {
      // validator: PasswordValidatorHandler.validate.bind(this)
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signUpForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    this.authService.signUp(this.User.deserialize(this.signUpForm.value)).subscribe(
      // (res) => {
      //   // this.redirectDialog.open(RedirectDialogComponent, {
      //   //   width: '250px',
      //   //   data: {
      //   //     title: 'Success',
      //   //     content: res.message,
      //   //     router: {
      //   //       name: 'Sign In',
      //   //       routerLink: '/signIn'
      //   //     }
      //   //   }
      //   });
      );
  }


}
