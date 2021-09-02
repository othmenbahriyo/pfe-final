import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReservationService } from '../shared/reservation.service';
import { ParkService } from '../shared/park.service';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY} from '@angular/cdk/scrolling';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {
  listPark = {} as any;
  panelOpenState = false;
  listReservation = {} as any;
  image = '';
  nb = 0;
  matricule;
  listPlaces = [] ;
  place = [] ;
  listH = [];
  red = 'white';
  thi = true;
  a: number;
  dateE = '2020-06-13';
  timeEe = '2020-06-13T13:10:37.241Z';
  timeSs = '2020-06-13T13:10:37.241Z';
  datenow = Date;
  timeE: Date;
  timeS: Date;
  plac: any;
  data = {} as any ;

  // tslint:disable-next-line:max-line-length
  constructor(public dialod: MatDialog ,  private park: ParkService , private reserv: ReservationService, private route: ActivatedRoute ) {}

  ngOnInit() {
    this.timeE = new Date(Number(Date.parse(this.timeEe)));
    this.timeS = new Date(Number(Date.parse(this.timeSs)));
    console.log('tttttttttt' , this.timeS.getTime());
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.data = JSON.parse(params.data);
    });
    this.place = this.data.place;
    this.image = this.data.image;
    // this.reserv.getListReservation().subscribe(res => {
    //   this.listReservation = res;

    //   console.log(this.listReservation[1].place);
    //   for (let i = 0; i < 1000; i ++) {
    //     // tslint:disable-next-line:radix
    //     this.listReservation[i].timeE = new Date(Number(Date.parse(this.listReservation[i].timeE)));
    //     this.listReservation[i].timeS = new Date(Number(Date.parse(this.listReservation[i].timeS)));

    //     // tslint:disable-next-line:radix
    //     this.place.push(parseInt(this.listReservation[i].place));
    //     this.place.push(9);

    //   }

    // });  ======> 9adech min karehba fil park


    this.park.getListPark().subscribe((res) => {
      this.listPark = res ;
      this.nb = this.data.nbPDP ; // njibouha min 8adi 9adch min blassa fil park illi 5tartou ((((9adech yhiz)))
      for (let i = 1; i <= this.nb; i ++) {
        this.listPlaces.push(i);

      }
      console.log('place' , this.place);
      console.log('listplace' , this.listPlaces);
    });
    this.ff();

  }

    ff() {
      let l = [];
      this.listH = [];
      console.log( this.listPlaces.filter(e => !this.place.includes(e)) );
      l =  this.listPlaces.filter(e => !this.place.includes(e));
      console.log(this.listPlaces);
      console.log(this.place);
      for (let i = 1 ; i < this.nb + 1 ; i++) {
        if (l.indexOf(i) < 0   ) {
          // tslint:disable-next-line:max-line-length
          // && this.dateE === this.listReservation[i].dateS && this.timeE.getTime() >= this.listReservation[i].timeE.getTime() && this.timeS.getTime() <= this.listReservation[i].timeS.getTime()
          this.listH.push({red: 'red'  , label: i , disable: true  });
        } else {
          this.listH.push({red: 'white'  , label: i , disable: false});
        }
      }
      // this.listPlaces.forEach(element => {
      //   this.place.forEach(i => {
      //     if (i ===  element ) {
      //         this.listH.push({red: 'red'  , label: i , disable: true  });
      //     } else {
      //       this.listH.push({red: 'white'  , label: element , disable: false});
      //     }

      // });
      // });

    }

    fd() {
      console.log(this.plac);
      localStorage.setItem('idPlace' , this.plac);
    }
    radio() {
      this.thi = false;
    }
    car() {
      localStorage.setItem('typeCar' , 'car');
    }
    cam() {
      localStorage.setItem('typeCar' , 'camion');
    }

}
