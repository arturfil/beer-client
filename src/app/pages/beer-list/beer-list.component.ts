import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

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
  
  modalActions = new EventEmitter<string | MaterializeAction>();
  carouselActions = new EventEmitter<string | MaterializeAction>();

  prev() {
    this.carouselActions.emit({action:"carousel", params:['prev']});
  }

  next() {
    this.carouselActions.emit({ action: "carousel", params: ['next'] });
  }
 
  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }

  handleNewBeer(theBeer) {
    this.beers.unshift(theBeer);
  }

}
