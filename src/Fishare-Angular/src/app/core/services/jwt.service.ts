import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ClaimType } from 'src/app/shared/enums/ClaimType';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  JWTHelper = new JwtHelperService();
  AuthenticationSubject: BehaviorSubject<boolean>;

  constructor() {
    this.AuthenticationSubject = new BehaviorSubject<boolean>(this.isAuthorized());
  }

  storeToken(token: string) {
    if (token == null) {
      throw new ErrorEvent('Token is not provided');
    }
    console.log(token);
    // const encryptToken = token.split(' ')[1];
    localStorage.setItem('Token', token);
    this.AuthenticationSubject.next(this.isAuthorized());
  }

  getToken(): string {
    return localStorage.getItem('Token');
  }

  // Get token claims on demand.
  getClaim(type: ClaimType) {
    const decryptToken = this.JWTHelper.decodeToken(this.getToken());
    const decryptDetails = JSON.parse(decryptToken.TokenDetails);

    console.log(this.getToken());
    console.log(
      decryptDetails
    );
    switch (type) {
      case ClaimType.all : {
        return decryptDetails;
      }
      case ClaimType.id : {
        return decryptDetails.id;
      }
      case ClaimType.email : {
        return decryptDetails.email;
      }
      case ClaimType.name : {
        return decryptDetails.name;
      }
    }
  }

  getAuthentication(): Observable<boolean> {
    return this.AuthenticationSubject.asObservable();
  }


  isAuthorized(): boolean {
    return !this.JWTHelper.isTokenExpired(this.getToken());
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('Token');
    this.AuthenticationSubject.next(this.isAuthorized());
  }

}
