import { UIService } from './ui.service';
import { MainHttpService } from './main-http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { RestaurantsListComponent } from './restaurants_list/restaurants-list/restaurants-list.component';
import { RestaurantsDetailsComponent } from './restaurants_details/restaurants-details/restaurants-details.component';
import { AgmCoreModule } from '@agm/core';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RestaurantsListComponent,
    RestaurantsDetailsComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCKVok6uOzKZyAFz6NPt96S737a5TpwC_o'
    })
  ],
  providers: [MainHttpService, UIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
