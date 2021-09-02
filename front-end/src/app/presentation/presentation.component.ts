import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ParkService } from '../shared/park.service';
import { Router } from '@angular/router';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Tile from 'ol/Tile';
import OSM from 'ol/source/OSM';
import OlPoint from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj.js';
import OlFeature from 'ol/Feature';
import * as L from 'leaflet';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit, AfterViewInit {
  latitude = [] as any;
  longitude = [] as any;
  marker = {}  as any ;
  markerr;
  map;


  // retrieve from https://gist.github.com/ThomasG77/61fa02b35abf4b971390
  smallIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize:  [41, 41]
  });
  longitudee: any;
  positions: any;
  parcThabor = [] as any;
  constructor(private auth: ParkService, private router: Router) { }
  ngOnInit(): void {
    this.auth.getListPark()
    .subscribe(
      res => {this.marker = res;
              for (let i = 0 ; i < 100 ; i++) {
          this.latitude.push(Number(this.marker[i].latitude));
          this.longitude.push(Number(this.marker[i].longitude));
          console.log('rrrrrr' , this.longitude);
          console.log('lat' , this.latitude[0]);
          // this.parcThabor.push({lat: this.marker[i].latitude , lng: this.marker[i].longitude });
          // console.log('rrrrr', this.parcThabor);
          const lat = Number(this.marker[i].latitude);
          const lon = Number(this.marker[i].longitude);
          this.parcThabor = L.marker([lon, lat]).addTo(this.map);
        }

    });



  }
  ngAfterViewInit(): void {
    this.createMap(this.parcThabor);
  }

  createMap(parcThabor: any) {
    // const parcThabor = [];
    // for (let i = 0 ; i < 100 ; i++) {
    //   parcThabor[i][0].push(this.marker[i].latitude);
    //   parcThabor[i][1].push(this.marker[i].longitude);
    //   console.log('tttttttttttttttttttttt', parcThabor);
    // }


    const zoomLevel = 7;

    this.map = L.map('map', {
      center: [ 34.9550514 , 9.7954153],
      zoom: zoomLevel
    });

    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 5,
      maxZoom: 17,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    mainLayer.addTo(this.map);
    const descriptionWikipedia = `
      Le parc du Thabor, situé à Rennes à proximité du centre-ville,
      est un parc public aménagé sur plus de dix hectares dont la particularité est de mêler un jardin à la française,
      un jardin à l’anglaise et un important jardin botanique.`;
    const popupOptions = {
      coords: parcThabor,
      text: descriptionWikipedia,
      open: true
    };
    // this.addMarker(popupOptions);
  }

  // addMarker({coords, text, open}) {
  //   // tslint:disable-next-line:prefer-for-of
  //   for (let i = 0; i < 1000; i++) {
  //     const marker = new L.marker([coords[0].lat, coords[0].lng] , { icon: this.smallIcon })


  //     if (open) {
  //     marker.addTo(this.map).bindPopup(text).openPopup();
  //   } else {
  //     marker.addTo(this.map).bindPopup(text);
  //   }
  // }
  // }
  dd() {
    console.log(this.longitude);
    console.log(this.latitude[0]);
  }
  onMapReady(map) {
    console.log('map', map);
    console.log('markers', map.markers);  // to get all markers as an array
  }
  onIdle(event) {
    console.log('map', event.target);
  }
  onMarkerInit(marker) {
    console.log('marker', marker);
  }
  onMapClick(event) {
    this.positions.push(event.latLng);
    event.target.panTo(event.latLng);
  }

}
