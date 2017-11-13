import { Component, OnInit } from '@angular/core';

import { BeerApiService } from '../../services/beer-api.service';
import { AuthApiService } from '../../services/auth-api.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {

  imageDomain = environment.apiUrl

  beers: any[] = [];
  userInfo: any;
  
  constructor(
    private beerThang: BeerApiService,
    private authThang: AuthApiService,
  ) { }

  ngOnInit() {
    this.beerThang.getBeers()
      .subscribe(
        (beersFromApi: any[]) => {
          this.beers = beersFromApi;
        }
      );

      this.authThang.getLoginStatus()
        .subscribe(
          (loggedInInfo: any) => {
            if (loggedInInfo.isLoggedIn) {
              this.userInfo = loggedInInfo.userInfo;
            }
          }
        );
  }

  handleNewBeer(theBeer) {
    this.beers.unshift(theBeer);
  }

}
