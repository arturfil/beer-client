import { Component, OnInit, Output, EventEmitter } from '@angular/core';

//import interface
import { BeerInfo } from '../../interfaces/beer-info';

// services
import { BeerApiService } from '../../services/beer-api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-beer-form',
  templateUrl: './beer-form.component.html',
  styleUrls: ['./beer-form.component.css']
})
export class BeerFormComponent implements OnInit {

  newBeer: BeerInfo = {
    beerName: '',
    beerBrewery: '',
    beerOrigin: '',
    beerType: '',
    beerImage: ''
  }

  errorMessage: string;

  @Output() newBeerNotifier = new EventEmitter();

  constructor(
    private beerThang: BeerApiService
  ) { }

  ngOnInit() {
  }

  saveNewBeer() {
    this.beerThang.postBeer(this.newBeer)
      .subscribe(
        // SUCCESS 
        (fullBeerDetails) => {
          console.log('New Beer success', fullBeerDetails);

          //notify the parent about the new beer throught the output
          this.newBeerNotifier.emit(fullBeerDetails);

          this.errorMessage = '';
          this.newBeer = {
            beerName: '',
            beerBrewery: '',
            beerImage: '',
            beerOrigin: '',
            beerType: ''
          };
        },
        (errorInfo) => {
          console.log('New beer Error', errorInfo);
          if (errorInfo.status === 400) {
            this.errorMessage = 'Validation error.';
          } else {
            this.errorMessage = 'Unknown error. Please try again Later.'
          }
        }
      )
  }

}
