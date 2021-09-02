import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ParkService } from '../shared/park.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {  NotificationsService } from 'angular2-notifications';
import { HttpClient } from '@angular/common/http';
import { ngfModule, ngf } from 'angular-file';
@Component({
  selector: 'app-add-park',
  templateUrl: './add-park.component.html',
  styleUrls: ['./add-park.component.css']
})
export class AddParkComponent implements OnInit {
  markers = {} as any;
  marker = {} as any ;
  list = {} as any;
  parking = {} as any;
  M: any;
  t = ',';
  file: any ;
  k = {};
  path;
  imagePreview: any;
  image: any;
  edits = false;
  role = '';
  selected: string;
  editss = false;
  options = {
    componentRestrictions : {
      country: ['TUN']
    }
  };
  p = [] as any;
  uploadfile: File;
  defaultvalue: string;
  constructor(private auth: ParkService, private router: Router, private http: HttpClient, private service: NotificationsService) {
   }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    // tslint:disable-next-line:no-unused-expression
    if (localStorage.length === 0) {
      window.location.replace('login');
    }
    this.resetForm();
    this.refreshEmployeeList();


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



  // tslint:disable-next-line:variable-name
  onDeletee(_id: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.auth.deletePark(_id).subscribe((res) => {
        this.refreshEmployeeList();
      });
    }
  }


  resetForm() {
    this.markers.name = '';
    this.markers.latitude = '';
    this.markers.longitude = '';
    this.markers.price = '';
    this.markers.nbplace = '';
  }

saveParking() {
  this.t = 'Your devices, ';
  this.p.push({firstName: 'Your devices' , lastName: '' });
  // const formData: FormData = new FormData();
  // formData.append('profile', this.uploadfile, this.uploadfile.name);
  this.markers.image = this.imagePreview;
  this.markers.capteur = this.p;
  console.log(this.markers);
  if (this.markers.name !== '') {
    console.log(this.markers.name);
    this.auth.savePark(this.markers).subscribe(
      res => {
        res = this.markers ;
        this.resetForm();
        this.refreshEmployeeList();
      },
      err => console.log(err)
  ); } else {
    return this.service.error('ERROR', 'Check your fields' , {
      position: ['bottom', 'right'],
      timeOut: 5000,
      animation: 'fade',
      showProgressBar: true
    });
  }

  console.log('fil l5er' , this.markers);

}

public handleAddressChange(address: any) {
  this.markers.name = address.formatted_address;

}


onEdit(emp) {
  console.log(emp);
  this.markers.name = emp.name;
  this.markers.latitude = emp.latitude;
  this.markers.longitude = emp.longitude;
  this.markers.price = emp.price;
  this.markers.nbplace = emp.nbplace;
  this.markers._id = emp._id;

}




onSubmit() {
    this.t = 'Your devices, ';
    this.p.push({firstName: 'Your devices' , lastName: '' });
    this.markers.capteur = this.p;

    if (this.markers.name != null) {
    this.auth.updatepark(this.markers).subscribe((res) => {
      this.resetForm();
      this.refreshEmployeeList();
      this.edits = true;
    });
  } else {
    this.editss = true;
  }

}

// selectImage(event) {
//   const fd = new FormData();
//   if (event.target.files.length > 0) {
//     console.log(event.target.files);
//     const file = event.target.files[0];
//     this.image = file;
//     file.path = 'uploads\\' + file.name ;
//     console.log('ffff' , this.image);

//   }

// }

// selectImage(event) {
//   console.log(event);
//   const img = event.target.files[0] as File ;
//   this.image = img;
//   console.log(this.image.name);
// }

selectImage(event: Event) {

const file = (event.target as HTMLInputElement).files[0];
console.log(file);
const reader = new FileReader();
reader.onload = () => {
this.imagePreview = reader.result;
console.log('ima', this.imagePreview);
};
reader.readAsDataURL(file);


}



}
