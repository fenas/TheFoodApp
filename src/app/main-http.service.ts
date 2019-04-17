import { UIService } from './ui.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MainHttpService {

  apiKey = `f07e20ca14095e886d9106692aad2c9e`; // api key for zomatto open source api
  locationId: number;
  httpHeader = { // api http header
    headers: new HttpHeaders({
      // 'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'user-key': this.apiKey
    })
  };


  constructor(private http: HttpClient, private router: Router, private Uiservice: UIService) { }

  getLocationIdFromCity(city: string) {

    console.log(city);

    this.Uiservice.spinnerState.next(true); // to activate spinner on the homepage
    // http get request location id from city name
    this.http.get(`https://developers.zomato.com/api/v2.1/cities?q=${city}`, this.httpHeader).subscribe(
      result => {
        this.Uiservice.spinnerState.next(false); // to deactivate spinner
        const locationdetails = result['location_suggestions']; // getting the location response array

        if (locationdetails.length === 0) {  // if location response obtained is an empty array
          this.Uiservice.hintState.next(true); // turn on hint/alert
          console.log('error');
          alert('error fetching details');

        } else {
          this.Uiservice.hintState.next(false); // turn off hint/alert
          this.locationId = locationdetails['0'].id; // exracting location id from response
          this.router.navigate(['/list', this.locationId.toString()]); // navigate by passing location id to route
          console.log(result);
          console.log(locationdetails);
          console.log(this.locationId);
        }
      },
      error => {
        console.log(error);
      }
    );

  }

  getLocationIdfromCoordinates(lat, long) {
    console.log(`${lat} and ${long}`);
    this.Uiservice.spinnerState.next(true); // to activate spinner on the homepage
    // http get request for location id from coordinates 
    this.http.get(`https://developers.zomato.com/api/v2.1/cities?lat=${lat}&lon=${long}`, this.httpHeader).subscribe(
      result => {
        this.Uiservice.spinnerState.next(false); // to deactivate spinner
        const locationdetails = result['location_suggestions']; // getting the location response array
        this.locationId = locationdetails['0'].id; // exracting location id from response
        this.router.navigate(['/list', this.locationId.toString()]); // navigate by passing location id to route
        console.log(result);
        console.log(locationdetails);
        console.log(this.locationId);
      },
      error => {
        console.log(error);
        alert(error);
      }
    );
  }

  getAllRestaurents(locationId) {
    console.log(locationId);
    // http get request for restaurant list
    return this.http.get(`https://developers.zomato.com/api/v2.1/search?entity_id=${locationId}&count=10&sort=rating`, this.httpHeader);

  }


  getRestoDetailsById(restoId) {
    console.log(restoId);
    // http get request for restaurant details
    return this.http.get(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${restoId}`, this.httpHeader);

  }


  getRestoDetailByName(name) {
    // http get request for restaurant details from name
    return this.http.get(`https://developers.zomato.com/api/v2.1/search?q=${name}&count=10&sort=rating`, this.httpHeader);


  }


}
