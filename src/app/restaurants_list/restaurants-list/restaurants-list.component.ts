import { ActivatedRoute } from '@angular/router';
import { MainHttpService } from './../../main-http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})
export class RestaurantsListComponent implements OnInit {
  restaurants = [];
  name = '';


  constructor(private httpService: MainHttpService, private route: ActivatedRoute) { }

  ngOnInit() {

    const locationId = this.route.snapshot.paramMap.get('location'); // get the locationId from route
    console.log(locationId);


    this.httpService.getAllRestaurents(locationId).subscribe(result => { // getting restaurant list from location id
      console.log(result['restaurants']);
      this.restaurants = result['restaurants']; // storing the restaurant list to local array
      console.log(this.restaurants);
    }, error => {
      console.log(error);
      alert(error);
    }
    );

  }

  searchResto() { // triggers when user again searches for a city
    this.httpService.getLocationIdFromCity(this.name); // gets location id from city name and passes to route
  }
}


