import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {} as any;
  listUser = {} as any;
  list = {} as any;
  incorrect = false;


  constructor(private auth: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.auth.getListusers().subscribe((res) => {
      this.listUser = res;
    });
  }



  loginUser() {

    if (this.loginUserData.email === 'admin' && this.loginUserData.password === 'admin' ) {
      localStorage.setItem('role', 'admin');
      this.router.navigate(['/admin']);
    }
    // tslint:disable-next-line:prefer-for-of

    this.auth.loginUser(this.loginUserData)
    .subscribe(
      res => {

        localStorage.setItem('token', res.token);
        localStorage.setItem('name', this.loginUserData.email);
        this.router.navigate(['/map']);
        localStorage.setItem('role', 'user');
        this.incorrect = false;
      },
      err => console.log(err)
    );
    this.auth.loginAdmin(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', 'admin');
        localStorage.setItem('role', 'admin');
        localStorage.setItem('roles', JSON.stringify(res));
        this.router.navigate(['/map']);
        window.open('http://localhost:4200/ch');
        this.incorrect = false;
      },
      err => console.log(err)
    );
    this.auth.loginSUP(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', 'superviseur');
        localStorage.setItem('roles', JSON.stringify(res));
        localStorage.setItem('role', 'sup');
        this.router.navigate(['/table']);
        window.open('http://localhost:4200/ch');
        this.incorrect = false;
      },
      err => console.log(err)
    );
    this.auth.loginSUPA(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', 'superAdmin');
        localStorage.setItem('roles', JSON.stringify(res));
        localStorage.setItem('role', 'supA');
        this.router.navigate(['/gpark']);
        this.incorrect = false;
      },
      err => console.log(err)
    );
    this.incorrect = true;

  }

}
