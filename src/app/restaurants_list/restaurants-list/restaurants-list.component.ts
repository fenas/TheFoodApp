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

    const locationId = this.route.snapshot.paramMap.get('location');
    console.log(locationId);


    this.httpService.getAllRestaurents(locationId).subscribe(result => {
      console.log(result['restaurants']);
      this.restaurants = result['restaurants'];
      console.log(this.restaurants);
    });

  }

  searchResto() {
    this.httpService.getLocationIdFromCity(this.name);

    // this.httpService.getRestoDetailByName(this.name).subscribe(result => {
    //   console.log(result['restaurants']);
    //   this.restaurants = result['restaurants'];
    //   console.log(this.restaurants);
    // });

  }
}


