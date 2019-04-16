import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MainHttpService } from 'src/app/main-http.service';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/ui.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  isLoading = false;
  hintOn = false;
  lat = 0;
  long = 0;
  Geofeedback = null;
  spinnerSubscription: Subscription;
  hintSubscription: Subscription;


  constructor(private router: Router, private httpService: MainHttpService, private uiService: UIService) { }

  ngOnInit() {

    this.spinnerSubscription = this.uiService.spinnerState.subscribe(isLoading => {
      this.isLoading = isLoading;
    });  // subscription to get the changed states of the spinner on the homepage search button
    this.hintSubscription = this.uiService.hintState.subscribe(hintOn => {
      this.hintOn = hintOn;
    }
    );
  }



  onSubmit(form: NgForm) {
    console.log(form);
    console.log(form.value.city);
    console.log(form.value.location);
    const city = form.value.city;
    // const location = form.value.location;
    this.isLoading = true;
    this.httpService.getLocationIdFromCity(city);

  }

  detectLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
    console.log('detect');
  }

  showPosition(position) {
    console.log('detected');
    this.lat = position.coords.latitude;
    this.long = position.coords.longitude;
    console.log(`lattitude ${this.lat}
  longitude ${this.long}`);

    this.httpService.getLocationIdfromCoordinates(this.lat, this.long);

  }

  ngOnDestroy() {
    this.spinnerSubscription.unsubscribe();
    this.hintSubscription.unsubscribe();

  }

}



