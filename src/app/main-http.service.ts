import { UIService } from './ui.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MainHttpService {

  apiKey = `f07e20ca14095e886d9106692aad2c9e`;
  locationId: number;
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'user-key': this.apiKey
    })
  };





  constructor(private http: HttpClient, private router: Router, private Uiservice: UIService) { }

  getLocationIdFromCity(city: string) {

    console.log(city);

    this.Uiservice.spinnerState.next(true); // to activate spinner on the homepage
    this.http.get(`https://developers.zomato.com/api/v2.1/cities?q=${city}`, this.httpHeader).subscribe(
      result => {
        this.Uiservice.spinnerState.next(false); // to deactivate spinner
        const locationdetails = result['location_suggestions'];

        if (locationdetails.length === 0) {
          this.Uiservice.hintState.next(true);
          console.log('eroor');
        } else {
          this.Uiservice.hintState.next(false);
          this.locationId = locationdetails['0'].id;
          this.router.navigate(['/list', this.locationId.toString()]);
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

    this.http.get(`https://developers.zomato.com/api/v2.1/cities?lat=${lat}&lon=${long}`, this.httpHeader).subscribe(
      result => {
        this.Uiservice.spinnerState.next(false); // to deactivate spinner
        const locationdetails = result['location_suggestions'];
        this.locationId = locationdetails['0'].id;
        this.router.navigate(['/list', this.locationId.toString()]);
        console.log(result);
        console.log(locationdetails);
        console.log(this.locationId);
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllRestaurents(locationId) {
    // const params = new HttpParams()
    //   .set('entity_id', this.locationId.toString())
    //   .set('sort', 'rating');

    console.log(locationId);
    // const Id = this.locationId;
    // console.log(Id);
    // return this.http.get(`https://developers.zomato.com/api/v2.1/search?entity_id=${Id}&count=10&sort=rating`, this.httpHeader);
    return this.http.get(`https://developers.zomato.com/api/v2.1/search?entity_id=${locationId}&count=10&sort=rating`, this.httpHeader);

  }


  getRestoDetailsById(restoId) {
    console.log(restoId);

    return this.http.get(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${restoId}`, this.httpHeader);

  }


  getRestoDetailByName(name) {

    return this.http.get(`https://developers.zomato.com/api/v2.1/search?q=${name}&count=10&sort=rating`, this.httpHeader);


  }


}
