import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'emailclient';
  signedin: boolean= false;

  constructor(private _authService: AuthService, private _router: Router) {}
  ngOnInit() {
    this._authService.signedin$.subscribe((signin)=> {
      this.signedin= signin;
    });

    this._authService.checkAuth().subscribe(()=>{})
  }

  signOut() {
    this._authService.signOut().subscribe(() => {
      this._router.navigateByUrl('/')
    })
  }
}
