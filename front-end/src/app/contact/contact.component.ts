import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SendEmailService } from '../shared/send-email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  loading = false;
  buttionText = 'Submit';
  FormControl = {} as any;
  constructor(private mailservice: SendEmailService, private router: Router) { }

  ngOnInit(): void {
  }
  register() {
    this.loading = true;
    this.buttionText = 'Submiting...';
    const user = {
      name: this.FormControl.name,
      email: this.FormControl.email,
      msg: this.FormControl.msg,
      sub: this.FormControl.sub
    };
    this.mailservice.sendEmail( user).subscribe(
      data => {
        const res: any = data;
        console.log(
          `👏 > 👏 > 👏 > 👏 ${user.name} is successfully register and mail has been sent and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttionText = 'Submit';
      }, () => {
        this.loading = false;
        this.buttionText = 'Submit';
      }
    );
    this.FormControl.name = '';
    this.FormControl.email = '';
    this.FormControl.msg = '';
    this.FormControl.sub = '';
  }

}
