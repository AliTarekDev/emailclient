import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.scss']
})
export class EmailCreateComponent implements OnInit {
  showModel= false;
  email: Email;
  constructor(private _authService: AuthService, private _emailService: EmailService) { 
    this.email= {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${this._authService.username}@angular-email.com`
    }
  }

  ngOnInit(): void {
  }

  onSubmit(email: Email) {
    this._emailService.sendEmail(email).subscribe(()=> {
      this.showModel = false;
    })
  }

}
