import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/signIn',
        pathMatch: 'full'
    },
    {
        path: '',
        children: [
            { path: 'signIn', component: SignInComponent },
            { path: 'signUp', component: SignUpComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }