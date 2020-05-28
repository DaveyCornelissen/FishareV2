import { Injectable } from '@angular/core';
import { ResponseHandler } from 'src/app/shared/handlers/response.handler';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/models/User';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  signIn(model: User) {
    return this.http.post<ResponseHandler>(`${environment.base + environment.endpoint.signIn}`, model).pipe(map(res => {
      this.jwtService.storeToken(res.data.access_token);
    }));
  }

  signUp(model: User) {
    return this.http.post<ResponseHandler>(`${environment.base + environment.endpoint.signUp}`, model);
  }

}
