import { MainHttpService } from './../../main-http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-restaurants-details',
  templateUrl: './restaurants-details.component.html',
  styleUrls: ['./restaurants-details.component.css']
})
export class RestaurantsDetailsComponent implements OnInit {
  restoDetails: any;
  lat: number = 0;
  lng: number = 0;


  constructor(private httpService: MainHttpService, private route: ActivatedRoute) { }

  ngOnInit() {
    const restoId = this.route.snapshot.paramMap.get('id');
    console.log(restoId);

    this.httpService.getRestoDetailsById(restoId).subscribe(
      result => {
        console.log(result);
        this.restoDetails = result;
        // this.lat = this.restoDetails.location.latitude;
        // this.lng = this.restoDetails.location.longitude;
        this.googleMap(this.restoDetails.location.latitude, this.restoDetails.location.longitude);

        // console.log(`${this.lat} ${this.lng}`);
      },
      error => {
        console.log(error);
      }
    );

  }

  googleMap(lat, lng) {
    this.lat = parseFloat(lat);
    this.lng = parseFloat(lng);
  }
  // myMap() {

  //   let mapProp = {
  //     center: new google.maps.LatLng(51.508742, -0.120850),
  //     zoom: 5,
  //   };
  //   var map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
  // }

}
