import { Component, Input, OnInit } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.scss']
})
export class EmailReplyComponent {

  @Input() email: Email;
  showModel= false;
  constructor(private _emailService: EmailService) {
    this.email= {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: ``
    }
   }



  ngOnChanges() {
    this.email= {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`
    }
  }

  onSubmit(email: Email) {
    this._emailService.sendEmail(email).subscribe(()=> {
      this.showModel= false;
    })
  }

}
