import { Component, OnInit, AfterViewChecked, Inject } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { MatDialogRef } from '@angular/material/dialog';
import { ReservationService } from '../shared/reservation.service';
import { Router } from '@angular/router';
declare let paypal: any;
@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {
  list = {} as any ;
  idClient: string;
  constructor(public dialogRef: MatDialogRef<MyDialogComponent>, private auth: ReservationService, private router: Router) { }

  ngOnInit(): void {
    this.auth.getByMat(localStorage.getItem('matricule')).subscribe((res) => {
      this.list = res;
      this.idClient = this.list[0]._id ;
    });
  }




  onRate($event: {oldValue: number, newValue: number, starRating: StarRatingComponent}) {
    alert(`'THANK YOU',
      New Value: ${$event.newValue}`);
  }


}
