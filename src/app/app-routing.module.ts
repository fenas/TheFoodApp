import { RestaurantsDetailsComponent } from './restaurants_details/restaurants-details/restaurants-details.component';
import { RestaurantsListComponent } from './restaurants_list/restaurants-list/restaurants-list.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'list/:location', component: RestaurantsListComponent },
  { path: 'details/:id', component: RestaurantsDetailsComponent },
  { path: 'error', component: ErrorPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
