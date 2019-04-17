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
    const restoId = this.route.snapshot.paramMap.get('id'); // getting restaurant id from route
    console.log(restoId);

    this.httpService.getRestoDetailsById(restoId).subscribe( // getting restaurant details from id
      result => {
        console.log(result);
        this.restoDetails = result; // storing restaurant details to local object
        // function to mark location on google map
        this.googleMap(this.restoDetails.location.latitude, this.restoDetails.location.longitude);
      },
      error => {
        console.log(error);
        alert(error);
      }
    );

  }

  googleMap(lat, lng) {
    this.lat = parseFloat(lat); // converting latitude from string to float and assigning to locat variable
    this.lng = parseFloat(lng); // converting longitude from string to float and assigning to locat variable
  }

}
