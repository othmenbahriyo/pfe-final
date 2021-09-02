import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ParkService } from '../shared/park.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ReservationService } from '../shared/reservation.service';



@Component({
  selector: 'app-gpark',
  templateUrl: './gpark.component.html',
  styleUrls: ['./gpark.component.css']
})
export class GparkComponent implements OnInit {
  markers = {} as any;
  marker = [] as any ;
  list = {} as any;
  parking = {} as any;
  m = 0;
  isDraggable: boolean;
  selected: string;
  cmp = 0;
  nbv = 0;
  nbt = 0;
  nbc = 0;
  nbn = 0;
  nbp = 0;
  prix = 0;
  time: Date = new Date();
  currentWeekNumber = require('current-week-number');
  markerss = {} as any ;
  lists = {} as any;
  times =  new Date();
  priceT = 0;
  priceW = 0;
  priceD = 0;
  lun = 0 ;
  mar = 0 ;
  mer = 0 ;
  jeu = 0 ;
  ven = 0 ;
  sam = 0 ;
  dem = 0  ;
  d = 0;
  week = 0;
  week1;
  year = {jun: 0 , fev: 0 , mar: 0 , avr: 0 , mai: 0 , jon: 0 , jui: 0 , out: 0 , sep: 0 , oct: 0 , nouv: 0 , dec: 0};

  constructor(private auth: ParkService, private router: Router, private auths: ReservationService) { }

  ngOnInit(): void {
    const s = localStorage.getItem('role');
    const ss = JSON.parse(localStorage.getItem('roles'));
    // this.selected = ss.user.parking;
    // console.log('rrrrrttgg' , ss.user.parking);
    // this.auth.getByNamep(this.selected).subscribe((res) => {
    //   this.marker.push(res[0]);
    //   console.log('rrrrfffmar', this.marker);
    // });
    // console.log('rrrrfffmar2', this.marker);

    if ( s === 'sup' || s === 'admin' ) {
      this.selected = ss.user.parking;
      console.log('rrrrrttgg' , ss.user.parking);
      this.auth.getByNamep(this.selected).subscribe((res) => {
        this.marker = res;
        this.cmp = this.marker.length;
      });
      console.log('rrrrfffmar', this.marker);
    } else {

      this.auth.getListPark().subscribe((res) => {
        this.marker = res ,
        this.cmp = this.marker.length ;
      });
    }

    this.auths.getListReservation().subscribe(res => {
      this.list = res,
      console.log(this.list);
    });
    this.week = this.currentWeekNumber(this.times );
    console.log('week', this.week);
    // this.auth.getListPark().subscribe((res) => {
    //   this.marker = res;
    // });
    this.auths.getListReservation().subscribe(res => {
      this.list = res ;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0 ; i < this.list.length ; i++) {
        this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
        this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
        this.week1 = this.currentWeekNumber(this.list[i].timeE );
        console.log('week11' , this.week1 );
        if (this.week === this.week1) {
          switch (this.list[i].timeE.getDay() ) {
            case 1 : {
              this.lun ++;
              break;
            }
            case 2 : {
              this.mar ++;
              break;
            }
            case 3 : {
              this.mer ++;
              break;
            }
            case 4   : {
              this.jeu ++;
              break;
            }
            case 5 : {
              this.ven ++;
              break;
            }
            case 6 : {
              this.sam ++;
              break;
            }
            case 0 : {
              this.dem ++;
              break;
            }
          }
        }
        switch (this.list[i].timeE.getMonth()  ) {
          case 0 : {
            this.year.jun ++;
            break;
          }
          case 1 : {
            this.year.fev ++;
            break;
          }
          case 2 : {
            this.year.mar ++;
            break;
          }
          case 3   : {
            this.year.avr ++;
            break;
          }
          case 4 : {
            this.year.mai ++;
            break;
          }
          case 5 : {
            this.year.jon ++;
            break;
          }
          case 6 : {
            this.year.jui ++;
            break;
          }
          case 7 : {
            this.year.out ++;
            break;
          }
          case 8 : {
            this.year.sep ++;
            break;
          }
          case 9: {
            this.year.oct ++;
            break;
          }
          case 10 : {
            this.year.nouv ++;
            break;
          }
          case 11 : {
            this.year.dec ++;
            break;
          }

        }
    }

    });
  }



  filterChanged(selectedValue: string) {
    this.m = 0;
    this.selected = selectedValue;
    this.nbc = 0;
    this.nbn = 0;
    this.nbp = 0;
    this.nbv = 0;
    this.nbt = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.list.length; i++) {
        // tslint:disable-next-line:prefer-for-of
        this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
        this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
        console.log( this.list[i].timeE.getTime());

        this.priceT = 0;
        this.priceW = 0;
        this.priceD = 0;
        let nb = 0;
        let r = 0;
        let f = 0;
        this.selected = selectedValue;
        console.log('<weeeeek', this.week);
        // tslint:disable-next-line:prefer-for-of
        // tslint:disable-next-line:no-shadowed-variable
        for (let i = 0; i < this.marker.length; i++) {
          this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
          this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
          if (  this.selected === this.marker[i].name ) {
            // tslint:disable-next-line:prefer-for-of
            for  (let j = 0; j < this.list.length; j++) {
              this.week1 = this.currentWeekNumber(this.list[i].timeE );
              console.log('<weeeeek111111', this.week1);
              if ( this.selected === this.list[j].name  ) {
                nb++;
                console.log('fffgt', nb);
                this.priceT = this.marker[i].price * nb;
              }
              if ( this.selected === this.list[j].name && this.list[j].timeE.getDay() === this.times.getDay()  ) {
                r++;
                console.log('rheeee', r);
                this.priceD = this.marker[i].price * r;
              }
              if ( this.selected === this.list[j].name && this.week1 === (this.week - 2)  ) {
                f++;
                console.log('rheeee', f);
                this.priceW = this.marker[i].price * f;
              }
            }

          }
        }



      }
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < this.marker.length; j++) {
        if (selectedValue === this.marker[j].name) {
          console.log(this.marker[j].nbplace);
          this.nbv = this.marker[j].nbplace - this.m;
          this.nbt = this.marker[j].nbplace;
        }


      }
    console.log('ti nb', this.m);
    return this.m;
  }


  getNbCarsDay() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.list.length ; i++) {
     this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
     this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
     this.d += this.list[i].price;
     return this.d;

 }
}



 nbRepition() {
   let nb = 0;
   // tslint:disable-next-line:prefer-for-of
   for (let i = 0 ; i < this.list.length ; i++) {
     this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
     this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
     if (this.selected === this.list[i].name ) {
         nb ++;
         console.log('gggg');
     }
     }
   console.log('ti nb', nb);
   return nb;
 }




}


