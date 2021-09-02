import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ParkService {
  park: Parking ;
  parks: Parking[];
  private saveParkingUrl = 'http://localhost:3000/api/addParking';
  private deleteparkUrl = 'http://localhost:3000/api/list/p';
  private updateparkUrl = 'http://localhost:3000/api/list/m';
  private getlistParkUrl = 'http://localhost:3000/api/list/parking';
  private getlistParkUrl1 = 'http://localhost:3000/api/list/parking';




  constructor(private http: HttpClient, private router: Router) { }



  // tslint:disable-next-line:variable-name
  deletePark(_id: string) {
    return this.http.delete(this.deleteparkUrl + `/${_id}`);
  }
  getListPark() {
    return this.http.get<any>(this.getlistParkUrl);
  }
  updatepark(emp) {
    return this.http.put(this.updateparkUrl + `/${emp._id}`, emp);
  }
  updateparkn(emp) {
    return this.http.put(this.updateparkUrl + `/${emp.name}`, emp);
  }
  savePark(user) {
    return this.http.post<any>(this.saveParkingUrl, user );
  }

  getByNamep(name: string) {
    return this.http.get(this.getlistParkUrl1 + `/${name}`);
  }
}

interface Parking {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  price: number;
  nbplace: number;
  capteur: [] ;
}
