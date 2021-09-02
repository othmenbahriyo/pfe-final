import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ReservationService } from '../shared/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {  NotificationsService } from 'angular2-notifications';
import { AuthService } from '../shared/auth.service';
import { ParkService } from '../shared/park.service';
import { parse } from 'date-fns';
import { GestionComponent } from '../gestion/gestion.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  form: any;
  reserv = {} as any;
  list = {} as any ;
  listParking = [] as any ;
  keyword = 'name';
  lista = {} as any ;
  a: string;
  data = [];
  image = '' ;
  nbPPatking = 0;
  user = localStorage.getItem('name');
  image1 = 'assets/images/cap1.JPG';
  image2 = 'assets/images/Capture.JPG';
  nbPlaceParking = 0;
  blasaFilPark: number;
  karehbaMawjouda: number;
  place = [];
  nombrePlaceDP = 0;


  constructor(private auth: ReservationService, private router: Router,
              public dialog: MatDialog, private route: ActivatedRoute,
              private service: NotificationsService, private auths: AuthService,
              public dialod: MatDialog, private parkService: ParkService) {


      this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      Tpark: new FormControl('', Validators.required),
      matricule: new FormControl('', Validators.required),
      dateE: new FormControl('', Validators.required),
      timeE: new FormControl('', Validators.required),
      dateS: new FormControl('', Validators.required),
      timeS: new FormControl('', Validators.required)
    });
   }

       selectEvent(item) {
        console.log(item);
        this.nbPlace();
        this.reserv.Tpark = item.price ;
        this.reserv.name = item.name ;
        console.log(this.reserv.name);
        this.image = item.image ;
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', this.image);

    }

    onChangeSearch(val: string) {

      // fetch remote data from here
      // And reassign the 'data' which is binded to 'data' property.
    }

    onFocused(e) {
      console.log('focus');
      this.nbPlace();
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0 ; i < this.listParking.length ; i++) {
        if (this.listParking[i].name === this.reserv.name) {
          console.log(this.listParking[i].nbplace);
          this.blasaFilPark = this.listParking[i].nbplace;
          this.reserv.Tpark = this.listParking[i].price;
          return this.listParking[i].nbplace;
        }
      }
      // do something when input is focused
    }

  ngOnInit(): void {
    this.reserv.timeE = new Date();
    this.reserv.timeS = new Date();
    this.auth.getListReservation()
    .subscribe(res => this.list = res);
    this.parkService.getListPark().subscribe((res) => {
      this.listParking = res;
      console.log(this.listParking);
      this.data = this.listParking;
      console.log('dddddddddddddddddddd', this.data);
    });

    this.auth.getByMat(localStorage.getItem('matricule')).subscribe((res) => {
      this.lista = res;
      console.log('hyyy', this.lista[0]._id);
      this.a = this.lista[0]._id ;
    });
  }




/*
  getUrl() {
  // tslint:disable-next-line:max-line-length
  return 'url(\'https://www.primeparkingbook.com/wp-content/uploads/2019/12/ac1975e4-f8ee-4b5c-b76d-321325562de3.jpg\')';
}






 openDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
  });

    dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}



goToLink(url: string) {
  window.open(url, '_blank');
}*/



/*_____________________________________________ bch ysagel w les condition _______________________________ */

saveCall() {

  const data = {} as any ;
  data.name = this.reserv.name;
  data.Tpark = this.reserv.Tpark;
  data.dateE = this.reserv.dateE;
  data.dateS = this.reserv.dateS;
  data.matricule = this.reserv.matricule;
  data.timeE = this.reserv.timeE;
  data.timeS = this.reserv.timeS;
  data.place = localStorage.getItem('idPlace');
  data.typeCar = localStorage.getItem('typeCar');
  if ( this.nbRepition() >= this.nbPlace()) {
    return this.service.info('NO PLACE ', this.premierPlaceVide() , {
      position: ['bottom', 'right'],
      timeOut: 20000,
      animation: 'fade',
      showProgressBar: true
    });
  } else {
  if ( !this.reserv.Tpark || !this.reserv.dateE ||
    !this.reserv.timeE || !this.reserv.dateS || !this.reserv.timeS || this.timeRespect()   ) {
    this.service.error('ERROR', 'verifier vos champs et votre login' , {
      position: ['bottom', 'right'],
      timeOut: 5000,
      animation: 'fade',
      showProgressBar: true
    });

  } else if ( localStorage.getItem('name') == null ) {
    this.router.navigate(['/login']);
  } else {
    this.router.navigate(['/map'], {
      queryParams: {data: JSON.stringify(data)}
    });
    this.dialod.open(GestionComponent);
  }
  if ( this.karehbaMawjouda < this.blasaFilPark) {
    this.karehbaMawjouda ++;
    console.log('rrrr', this.karehbaMawjouda);
    localStorage.setItem('p', this.karehbaMawjouda.toString() );
  } else {
    this.karehbaMawjouda = 1 ;
  }
  }

}


/*----------------------------------------------------------9adech min karehba fil park---------------------------*/


nbRepition() {
  let nb = 0;
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0 ; i < this.list.length ; i++) {
    this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
    this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
    console.log('vvvvvvvvvvvvvv', this.list[i].timeS.getTime());
    if (this.reserv.name === this.list[i].name && this.reserv.dateE === this.list[i].dateS &&
      (this.list[i].timeS.getTime() >= this.reserv.timeE.getTime() && this.list[i].timeE.getTime() <= this.reserv.timeE.getTime()) ) {
        nb ++;
        console.log('ti + nb', nb);
        this.place.push(parseInt(this.list[i].place));
        console.log('gggg' , this.place );

    }


  }
  this.nbPlace();
  console.log('gggg1' , this.reserv.name );
  console.log('gggg2' , this.nombrePlaceDP);
  console.log('gggg3' , this.place);
  console.log('ti nb', nb);
  this.karehbaMawjouda = nb;
  return nb;
}



/*------------------------------------9adech min blassa fil parking illi ikhtarou-----------------------------------*/
nbPlace() {
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0 ; i < this.listParking.length ; i++) {
    if (this.listParking[i].name === this.reserv.name) {
      console.log(this.listParking[i].nbplace);
      this.blasaFilPark = this.listParking[i].nbplace;
      this.reserv.Tpark = this.listParking[i].price;
      this.nombrePlaceDP =  this.listParking[i].nbplace;
      return this.listParking[i].nbplace;
    }
  }

}



/*****************************************____________ ki tabda m3abya wa9tch awel blassa tafra8___________************************** */
premierPlaceVide() {
  // tslint:disable-next-line:prefer-for-of
  const d = [];
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0 ; i < this.list.length ; i++) {
    this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
    this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
    if (this.list[i].dateS === this.reserv.dateE) {
      if (this.list[i].timeS.getTime() > this.reserv.timeE.getTime()  ) {
        d.push(this.list[i]);
      }
    }
  }
  console.log('heeh', d);
  let max = d[0];
  for (let i = 1; i < d.length; ++i) {
    d[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
    if (d[i].timeS.getTime() < max.timeS.getTime()) {
      max = d[i];
  }

    return max.timeS ;
}

}

timeRespect() {
  if (this.reserv.timeE.getTime() > this.reserv.timeS.getTime()) {
    return true;
  } else {
    return false;
  }
}

filterChanged(selectedValue: string) {
  this.nbPlace();
}

choosePlace() {
  this.nbRepition();
  this.nbPlace();
  console.log('gggg1' , this.reserv.name );
  console.log('gggg2' , this.nombrePlaceDP);
  console.log('gggg3' , this.place);
  let dataa = {} as any;
  dataa.name = this.reserv.name;
  dataa.nbPDP = this.nombrePlaceDP;
  dataa.place = this.place;
  dataa.image = this.image;

  this.router.navigate(['/map'], {
    queryParams: {data: JSON.stringify(dataa)}
  });
  this.dialod.open(FooterComponent);
}

}


