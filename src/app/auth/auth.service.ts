import { HttpClient } from '@angular/common/http';
import { Injectable, TRANSLATIONS } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Email } from '../inbox/email';
interface SignupCredentials {
  username: string | null;
  password: string | null;
  passwordConfirmation: string | null;
}

interface SignupResponse {
  username: string
}

interface SignedInResponse {
  authenticated: boolean;
  username: string;
}
@Injectable({
  providedIn: 'root',
})


export class AuthService {
  constructor(private http: HttpClient) {}


  rootUrl= "https://api.angular-email.com";
  signedin$= new BehaviorSubject(false);
  username= '';

  userNameAvailable(username: string) {
    return this.http.post<any>(this.rootUrl + '/auth/username', {
      username,
    });
  }

  signup(credentials: any) {
    return this.http.post<SignupResponse>(this.rootUrl+'/auth/signup',credentials).pipe(
      tap(({username})=> {
        this.signedin$.next(true);
        this.username= username;
      })
    )
  }

  signin(credentials: any) {
    return this.http.post<SignedInResponse>(`${this.rootUrl}/auth/signin`, credentials).pipe(
      tap(({username})=> {
        this.signedin$.next((true));
        this.username= username
      })
    )
  }

  checkAuth() {
    return this.http.get<SignedInResponse>(`${this.rootUrl}/auth/signedin`).pipe(
      tap(({authenticated, username})=> {
        this.signedin$.next(authenticated);
        this.username= username        
      })
    )
  }
  
  signOut() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {}).pipe(
      tap(()=> this.signedin$.next(false))
    )
  }


}
