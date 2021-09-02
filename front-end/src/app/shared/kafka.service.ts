import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class KafkaService {
  private get = 'http://localhost:3000/api/consume';
  private loginUrl = 'http://localhost:3000/api/login';
  private socket;
  constructor(private http: HttpClient, private router: Router) { }


  getromKaf(id: number) {
    return this.http.get<any>(this.get + `/${id}`);
  }

}
