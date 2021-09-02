import { Component, OnInit } from '@angular/core';
import { ParkService } from '../shared/park.service';
import { Router } from '@angular/router';
import { ReservationService } from '../shared/reservation.service';
import { SocketService } from '../socket.service';
@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.css']
})
export class GmapsComponent implements OnInit {
  marker = {} as any;
  markers = {} as any;
  reserv = {} as any;
  list = {} as any;
  selected: string;
  t = [] as any;
  k;
  Property;
  matricule;
  capteur: string;
  valid: boolean;
  tt = [] as any;
  tts = [false, true, true, false];
  place = [] as any;
  places = [] as any;
  ts = [] as any;
  constructor(private auth: ParkService, private res: ReservationService, private router: Router, private socket: SocketService) { }

  ngOnInit(): void {
    this.reserv.timeE = new Date();
    this.reserv.timeS = new Date();
    this.reserv.dateE = new Date();
    let nbs = 0;
    this.place = [];
    this.refreshEmployeeList();
    this.res.getListReservation().subscribe((res) => {
      this.list = res;
    });
    this.socket.listen('vv').subscribe((res) => {
      console.log(res);
      this.ts.push(res);
      const kk = this.ts[(this.ts.length - 1)];
      console.log('dddddcccccdtstststssdsdsdsdsdsssssss', this.ts[(this.ts.length - 1)][0][2]);
    });
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.list.length ; i++) {
      this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
      this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
      console.log('vvvvvvvvvvvvvv', this.list[i].timeS.getTime());
      console.log('vvvvvvvvvvvvnjnjnjnjnjnvv', this.reserv.dateE);
      if (this.selected === this.list[i].name &&
        (this.list[i].timeS.getTime() >= this.reserv.timeE.getTime() && this.list[i].timeE.getTime() <= this.reserv.timeE.getTime()) ) {
          nbs ++;
          console.log('ti + nb', nbs);
          // tslint:disable-next-line:radix
          this.place.push(parseInt(this.list[i].place));
          console.log('gggg' , this.place );
      }
  }

  }


  refreshEmployeeList() {
    const s = localStorage.getItem('role');
    const ss = JSON.parse(localStorage.getItem('roles'));
    if ( s === 'sup' || s === 'admin' ) {
      this.selected = ss.user.parking;
      console.log('rrrrrttgg' , ss.user.parking);
      this.auth.getByNamep(this.selected).subscribe((res) => {
        this.marker = res;
      });
      console.log('rrrrfffmar', this.marker);
    } else {

      this.auth.getListPark().subscribe((res) => {
        this.marker = res;
      });
    }
  }

  filterChanged(selectedValue: string) {
    this. kafka();
    let nbs = 0;
    let nb = 0 ;
    localStorage.setItem('Property', 'etat');
    this.Property = localStorage.getItem('Property');
    // l =  this.listPlaces.filter(e => !this.place.includes(e));
    this.selected = selectedValue;
    this.tt = [] as any;
    console.log(selectedValue);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < 200; i++) {
      this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
      this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
      console.log('vvvvvvvvvvvvvv', this.list[i].timeS.getTime() >= this.reserv.timeE.getTime());
      console.log('vvvvvvvvvvvvnjnjnjnjnjnvv', this.selected);
      if (this.marker[i].name === this.selected || this.marker[i].name.toString() + ' ' === this.selected ) {
        console.log('oui');
        nb = this.marker[i].nbplace;
        console.log('nb', nb);
        console.log('nbi', this.list[i].timeS.getTime() >= this.reserv.timeE.getTime());
        // tslint:disable-next-line:prefer-for-of
        for (let k = 0 ; k < this.list.length ; k++) {
          this.list[k].timeS = new Date(Number(Date.parse(this.list[k].timeS)));
          this.list[k].timeE = new Date(Number(Date.parse(this.list[k].timeE)));
          if (this.selected === this.list[k].name &&
            (this.list[k].timeS.getTime() >= this.reserv.timeE.getTime() && this.list[k].timeE.getTime() <= this.reserv.timeE.getTime()) ) {
              nbs ++;
              console.log('ti + nb', nbs);
              console.log('ti + nbp', this.list[k]);
              // tslint:disable-next-line:radix
              this.place.push(parseInt(this.list[k].place));
              console.log('gggg' , this.place );
          }
      }
        this.t = this.marker[i].capteur;
        for (let j = 1; j < 4 /*nb*/; j++) {
          // l =  this.places.filter(e => !this.place.includes(e));
          console.log('ffffff', this.ts[(this.ts.length - 1)][0][2]);
          // tslint:disable-next-line:max-line-length
          if ( this.ts[(this.ts.length - 1)][0][2] === 'true' && this.place.indexOf(j) >= 0 && this.ts[(this.ts.length - 1)][0][1] === this.t[i].firstName ) {
            console.log(this.ts);
            this.tt.push({first: this.ts[(this.ts.length - 1)][0][0] , last: 'blue' } );
          } else if ( this.ts[(this.ts.length - 1)][0][2] === 'false' && this.place.indexOf(j) >= 0 ) {
            console.log(this.ts);
            this.tt.push({first: this.ts[(this.ts.length - 1)][0][0] , last: 'orange' } );
          } else if ( this.ts[(this.ts.length - 1)][0][2] === 'true' && this.place.indexOf(j) <= 0 ) {
            console.log(this.ts);
            this.tt.push({first: this.ts[(this.ts.length - 1)][0][0] , last: 'red' } );
          } else {
            console.log('how', this.ts);
            this.tt.push({first: this.ts[(this.ts.length - 1)][0][0] , last: 'green' } );
          }
          console.log('ttttt', this.tt);
        }


      }
    }

  }
  kafka() {
    let nbs = 0;
    this.place = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.list.length ; i++) {
      this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
      this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
      console.log('vvvvvvvvvvvvvv', this.list[i].timeS.getTime());
      console.log('vvvvvvvvvvvvnjnjnjnjnjnvv', this.reserv.dateE);
      if (this.selected === this.list[i].name &&
        (this.list[i].timeS.getTime() >= this.reserv.timeE.getTime() && this.list[i].timeE.getTime() <= this.reserv.timeE.getTime()) ) {
          nbs ++;
          console.log('ti + nb', nbs);
          // tslint:disable-next-line:radix
          this.place.push(parseInt(this.list[i].place));
          console.log('gggg' , this.place );
      }
  }
    localStorage.setItem('Property', 'etat');
    this.Property = localStorage.getItem('Property');
    return nbs;
  }

  addCapteur() {
    // tslint:disable-next-line:no-unused-expression

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.marker.length; i++) {
      if (this.selected === this.marker[i].name) {
        const f = this.t.find(b => this.capteur === b);
        console.log(f == null);
        if (f == null || this.k != null || this.capteur != null) {
        console.log(this.t);
        this.t.push({firstName: this.capteur , lastName: this.k });
        this.marker[i].capteur = this.t;
        this.auth.updatepark(this.marker[i]).subscribe((res) => {
    });
        this.capteur = '';
        this.k = '';
        this.valid = false;
        } else {
          this.valid = true;
        }
          }}
  }


  deleteCapteur(j) {
    // tslint:disable-next-line:no-unused-expression

    // tslint:disable-next-line:prefer-for-of
    if (confirm('Are you sure to delete this record ?') === true) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.marker.length; i++) {
      if (this.selected === this.marker[i].name) {
        this.t.splice(j, 1);
        this.marker[i].capteur = this.t;
        this.auth.updatepark(this.marker[i]).subscribe((res) => {
    });
        this.capteur = '';
  }}
}
}
nbRepition() {

}


}

