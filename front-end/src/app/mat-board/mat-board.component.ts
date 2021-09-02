import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ParkService } from '../shared/park.service';
import { Router } from '@angular/router';
import { ReservationService } from '../shared/reservation.service';
declare const require: any;

@Component({
  selector: 'app-mat-board',
  templateUrl: './mat-board.component.html',
  styleUrls: ['./mat-board.component.css']
})
export class MatBoardComponent implements OnInit {
  currentWeekNumber = require('current-week-number');
  marker = {} as any ;
  list = {} as any;
  times =  new Date();
  selected: string;
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


  }




}
