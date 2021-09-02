import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { ConsulteResComponent } from '../consulte-res/consulte-res.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any ;
  b: any;
  selected: string;
  fr = 'en';
  collapsed = true;

  // tslint:disable-next-line:variable-name
  constructor(public auth: AuthService,  private router: Router, public dialod: MatDialog, public translate: TranslateService) {
    translate.addLangs(['en' , 'fr' , 'ar']);
    translate.setDefaultLang('en');

   }

  ngOnInit(): void {
    this.auth.loginUser(this.user);
    this.auth.loggedIn();
  }
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('__paypal_storage__');
    localStorage.removeItem('typeCar');
    localStorage.removeItem('idPlace');
    localStorage.removeItem('lng');
    localStorage.removeItem('Property');
    localStorage.removeItem('roles');
    localStorage.removeItem('role');
    localStorage.removeItem('p');
    localStorage.setItem('matricule' , '');

    this.router.navigate(['/map']);

  }
  c() {
    if ( localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'sup' || localStorage.getItem('role') === 'supA' ) {
      return true;
    } else {
      return false;
    }
  }
  matricule() {
    if ( localStorage.getItem('matricule') !== '' ) {
      return true;
    } else {
      return false;
    }
  }

  openDialog() {
    this.dialod.open(ConsulteResComponent);
  }

  navigateToResource(): void {
    window.open('http://localhost:4200/ch');
  }

  filterChanged(selectedValue: string) {
    localStorage.removeItem('lng');
    this.selected = selectedValue;
    this.translate.use(this.selected);
    console.log( this.selected);
    console.log( selectedValue);
    localStorage.setItem('lng', this.selected);
  }



}
