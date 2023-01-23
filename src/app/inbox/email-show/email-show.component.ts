import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.scss']
})
export class EmailShowComponent implements OnInit {

  email: Email= {
    id: "",
    subject: "",
    text: "",
    to: "",
    from: "",
    html: ""
  }
  constructor(private _emailService: EmailService, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    // this._route.params.subscribe(({id})=> {
    //   this._emailService.getEmail(id).subscribe((email)=> {
    //     console.log(email);
        
    //   })
    // })

    this._route.params.pipe(
      switchMap(({id})=> {
        return this._emailService.getEmail(id);
      })
    ).subscribe((email: Email)=> {

      this.email= email;
      
    })
  }

}
