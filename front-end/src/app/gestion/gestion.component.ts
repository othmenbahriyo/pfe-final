import { Component, OnInit, AfterViewChecked, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ReservationService } from '../shared/reservation.service';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

declare let paypal: any;
@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit, AfterViewChecked  {
  data: any;
  addScript = false;
  paypalLoad = true;
  user = localStorage.getItem('name');
  nbplacePark = 0;
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AVBGG4w-m2xWDfeOhwA4b0EqhKXG-alPdUslptewJQQ7FxKIlXQGY7xxC4-9_gC5UcsI9SoQ5EL0QNuF',
      production: '<your-production-key-here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: 25, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
      });
    }
  };
  // tslint:disable-next-line:max-line-length
  constructor(public dialogRef: MatDialogRef<GestionComponent>, private router: Router, private route: ActivatedRoute, private auth: ReservationService, private dialod: MatDialog) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.data = JSON.parse(params.data);
    });
  }


  saveReservation() {
    this.auth.saveReservation(this.data)
    .subscribe(
      res => {
        this.router.navigate(['/map']);
        this.nbplacePark ++;
      },
      err => console.log(err)
    );
    localStorage.setItem('matricule', this.data.matricule);
    this.dialod.open(MyDialogComponent);
  }

  AnnulerReservation() {
    this.data = {
      name: '',
      Tpark: '',
      dateE: '',
      timeE: '',
      dateS: '',
      timeS: '',
      matricule: ''
    };
    this.router.navigate(['/map']);
  }




  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal');
        this.paypalLoad = false;
      });
    }
  }



  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      const scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }

}
