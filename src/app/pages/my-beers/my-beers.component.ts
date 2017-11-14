import { Component, OnInit } from '@angular/core';
import { MaterializeModule } from 'angular2-materialize';
//services
import { BeerApiService } from '../../services/beer-api.service';
import { AuthApiService } from '../../services/auth-api.service';
import { environment } from '../../../environments/environment';

//components
//import { BeerFormComponent } from

@Component({
  selector: 'app-my-beers',
  templateUrl: './my-beers.component.html',
  styleUrls: ['./my-beers.component.css']
})
export class MyBeersComponent implements OnInit {

  imageDomain = environment.apiUrl
  errorMessage: string;

  myBeers: any[] = [];
  isFormOn = false;
  userInfo: any;

  constructor(
    private beerThang: BeerApiService,
    private authThang: AuthApiService
  ) { }

  ngOnInit() {
    this.beerThang.getMyBeers()
      .subscribe(
        (listOfBeers: any[]) => {
          this.myBeers = listOfBeers;
        },
        (errInfo) => {
          if (errInfo.status === 401) {
            this.errorMessage = "You need to be logged in.";
          } else {
            this.errorMessage = "Something went wrong, Please try again later."
          }
        }
      )
  }

  showsForm() {
    if (this.isFormOn) {
      this.isFormOn = false;
    } else {
      this.isFormOn = true;
    }
  }

  handleNewBeers(submissionInfo) {
    this.myBeers.unshift(submissionInfo);
    this.isFormOn = false;  
  }

}
