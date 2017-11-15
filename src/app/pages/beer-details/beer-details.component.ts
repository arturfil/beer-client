import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BeerApiService } from '../../services/beer-api.service';
import { AuthApiService } from '../../services/auth-api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {

  beerInfo: any;
  userInfo: any;

  constructor(
    private activatedThang: ActivatedRoute,
    private beerThang: BeerApiService,
    private routerThang: Router,
    private authThang: AuthApiService
  ) { }

  ngOnInit() {
    this.activatedThang.params.subscribe((myParams) => {
      this.beerThang.getBeerDetails(myParams.beerId)
        .subscribe(
          (theBeerFromApi) => {
            this.beerInfo = theBeerFromApi
          }
        );
    });

    this.authThang.getLoginStatus()
      .subscribe(
        (loggedInInfo: any) => {
          if (loggedInInfo.isLoggedIn) {
            this.userInfo = loggedInInfo.userInfo;
          }
        }
      )
  }

  deleteClick() {
    this.beerThang.deleteBeer(this.beerInfo._id)
      .subscribe(
        () => {
          this.routerThang.navigate(['/mybeers']);
        }
      )
  }

}
