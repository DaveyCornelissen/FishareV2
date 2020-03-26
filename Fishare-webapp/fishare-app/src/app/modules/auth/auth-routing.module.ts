import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth/signIn',
        pathMatch: 'full'
    },
    {
        path: '',
        children: [
            { path: 'signIn', component: SignInComponent, }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }