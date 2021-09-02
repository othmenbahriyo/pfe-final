import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData =  {} as any;
  listUser =  {} as any;
  valid = false;
  length = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getListusers().subscribe((res) => {
      this.listUser = res;
    });
  }
  notValid() {
    console.log('rrrrrrfgddf', this.registerUserData.password.length);
    if (this.registerUserData.password.length < 8) {
      this.length = true;
    } else {
      this.length = false;
    }
  }
  registerUser() {
    this.notValid();
    const f = this.listUser.find(b => this.registerUserData.email === b.email);
    // tslint:disable-next-line:prefer-for-of
    if (f != null ) {
        console.log('rrrr');
        this.valid = true;
      } else {
        this.valid = false;
        if ( this.registerUserData.email || this.registerUserData.password ) {
          this.auth.registerUser(this.registerUserData)
          .subscribe(
            res => {
              this.router.navigate(['/login']);
            },
            err => console.log(err)
          );
        }

    }




  }

}
