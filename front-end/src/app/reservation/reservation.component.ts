import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReservationService } from '../shared/reservation.service';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ParkService } from '../shared/park.service';
import { NotificationsService } from 'angular2-notifications';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reserv =  {} as any;
  list = {} as any ;
  listUne = {} as any;
  listParking = {} as any;
  constructor(private auth: ReservationService, private router: Router, private parkService: ParkService,
              private service: NotificationsService, private dialod: MatDialog) { }

  private state$: Observable<object>;
  ngOnInit(): void {
    this.auth.getByMat(localStorage.getItem('matricule')).subscribe((res) => {
      this.list = res;
      this.listUne = this.list[(this.list.length - 1)];
    });
    this.auth.getListReservation()
    .subscribe(res => this.list = res);
    this.parkService.getListPark().subscribe((res) => {
      this.listParking = res;
      console.log(this.listParking);
    });
  }



  registerRes() {
    if (!this.reserv.name || !this.reserv.Tpark || !this.reserv.dateE ||
      !this.reserv.timeE || !this.reserv.dateS || !this.reserv.timeS   ) {
      this.service.error('ERROR', 'verifier vos champs et votre login' , {
        position: ['bottom', 'right'],
        timeOut: 5000,
        animation: 'fade',
        showProgressBar: true
      });

    } else {
      this.auth.saveReservation(this.reserv)
      .subscribe(
        res => {
          localStorage.setItem('matricule', this.reserv.matricule);
          this.router.navigate(['/map']);
        },
        err => console.log(err)
      );
      this.auth.deletelistReservation(this.list[0]._id).subscribe((res) => {
        console.log('sup');
      });
      this.dialod.open(MyDialogComponent);

    }

  }

  }


