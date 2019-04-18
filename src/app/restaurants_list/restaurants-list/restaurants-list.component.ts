import { UIService } from 'src/app/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MainHttpService } from './../../main-http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})
export class RestaurantsListComponent implements OnInit, OnDestroy {
  restaurants = [];
  name = '';
  hintOn = false;
  isLoading = false;
  spinnerSubscription: Subscription;
  hintSubscription: Subscription;


  constructor(private httpService: MainHttpService, private route: ActivatedRoute, private router: Router,
    private uiService: UIService) { }

  ngOnInit() {

    const locationId = this.route.snapshot.paramMap.get('location'); // get the locationId from route
    console.log(locationId);


    this.httpService.getAllRestaurents(locationId).subscribe(result => { // getting restaurant list from location id
      console.log(result['restaurants']);
      this.restaurants = result['restaurants']; // storing the restaurant list to local array
      console.log(this.restaurants);
    }, error => {
      console.log(error);
      this.router.navigate(['/error']);
    }
    );

    this.hintSubscription = this.uiService.hintState.subscribe(hintOn => {
      this.hintOn = hintOn;
    }); // subscription to activate hints on the hope page below input field

    this.spinnerSubscription = this.uiService.spinnerState.subscribe(isLoading => {
      this.isLoading = isLoading;
    });  // subscription to get the changed states of the spinner on the homepage

  }

  searchResto() { // triggers when user again searches for a city
    this.httpService.getLocationIdFromCity(this.name); // gets location id from city name and passes to route
  }

  ngOnDestroy() {
    this.hintSubscription.unsubscribe();  // unsubscribe hints on component destroy
    this.spinnerSubscription.unsubscribe(); // unsubscribe spinner on component destroy

  }
}


