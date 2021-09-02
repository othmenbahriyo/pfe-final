import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { ParkService } from '../shared/park.service';


@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {
  registerUserData =  {} as any;
  listAdmin = {} as any ;
  data = [] as any ;
  park = {} as any ;
  reserv = {} as any ;
  keyword = 'name';
  selected: string;
  role = '';
  selecteds = '';

  constructor(private auth: AuthService, private router: Router, private parkService: ParkService) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    const s = localStorage.getItem('role');
    const ss = JSON.parse(localStorage.getItem('roles'));

    if ( s === 'sup' || s === 'admin' ) {
      this.selected = ss.user.parking;
      console.log('rrrrrttgg' , ss.user.parking);
      this.parkService.getByNamep(this.selected).subscribe((res) => {
        this.data = res;
      });
    } else {

      this.parkService.getListPark().subscribe((res) => {
        this.data = res;
      });
    }




    this.auth.getListuser().subscribe((res) => {
      this.listAdmin = res;
    });

  }

  registerUser() {
    if (this.selecteds === 'sup') {
      this.auth.registerSup(this.registerUserData)
      .subscribe(
        res => {
          this.router.navigate(['/ad']);
        },
        err => console.log(err)
      );

    } else if (this.selecteds === 'admin') {
      this.registerUserData.parking = this.park.name;
      this.auth.registerAdmin(this.registerUserData)
      .subscribe(
        res => {
          this.router.navigate(['/ad']);
        },
        err => console.log(err)
      );
      this.parkService.savePark(this.park).subscribe(
        res => {

        },
        err => console.log(err)
    );
    } else {
      this.auth.registerSupA(this.registerUserData)
      .subscribe(
        res => {
          this.router.navigate(['/map']);
        },
        err => console.log(err)
      );
    }


  }
  // tslint:disable-next-line:variable-name
  onDeletee(_id: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.auth.deletePark(_id).subscribe((res) => {
        this.ngOnInit();
      });
    }
  }
  filterChanged(event) {
    this.selecteds = event;
    console.log(this.selecteds);

  }
  selectEvent(item) {
    console.log(item.name);
    this.registerUserData.parking = item.name;

}

onChangeSearch(val: string) {

  // fetch remote data from here
  // And reassign the 'data' which is binded to 'data' property.
}

onFocused(e) {
  console.log('focus');

}
}
