import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ])
  });
  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {}

  onSubmit() {

    if(this.authForm.invalid) {
      return
    }

    this._authService.signin(this.authForm.value).subscribe({
      next: ()=> {
        this._router.navigateByUrl('/inbox')
      },
      error: ({error})=> {
        if(error.username || error.password) {
          this.authForm.setErrors({credentials: true})
        }
      }
    })
  }
}
