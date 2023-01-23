import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}
@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.scss']
})
export class EmailIndexComponent implements OnInit {

  emails: EmailSummary[]= [];
  constructor(private _emailService: EmailService) { }

  ngOnInit(): void {
    this._emailService.getEmails().subscribe((emailsRes: EmailSummary[])=> {
      this.emails = emailsRes
    })
  }

}
