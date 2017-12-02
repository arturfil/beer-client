import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

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

  myUploader = new FileUploader(
    {
      url: environment.apiUrl + '/api/beers',
      itemAlias: 'beerImage'
    }
  )

  newBeer: BeerInfo = {
    beerName: '',
    beerBrewery: '',
    beerOrigin: '',
    beerType: '',
    beerImage: ''
  }

  queryInput: string;
  errorMessage: string;

  @Output() newBeerNotifier = new EventEmitter();

  constructor(
    private beerThang: BeerApiService
  ) { }

  ngOnInit() {
  }

  saveNewBeer() {
    if(this.myUploader.getNotUploadedItems().length > 0) {
      this.saveBeerWithImage()
    } else {
      this.saveBeerNoImage()
    }
  }

  saveBeerWithImage() {
    this.myUploader.onBuildItemForm = (beer, form) => {
      form.append('beerName', this.newBeer.beerName);
      form.append('beerOrigin', this.newBeer.beerOrigin);
      form.append('beerBrewery', this.newBeer.beerBrewery);
      form.append('beerType', this.newBeer.beerType);

    };

    this.myUploader.onSuccessItem = (beer, response) => {
      const fullBeerDetails = JSON.parse(response);
      console.log('New beer success', fullBeerDetails);

    // notify the parent about the new item through the output
      this.newBeerNotifier.emit({
        beer: fullBeerDetails,
        queryInput: this.queryInput
      });

      this.errorMessage = '';
      this.newBeer = {
        beerName: '',
        beerBrewery: '',
        beerType: '',
        beerOrigin: '',
        beerImage: ''
      }
    }

    this.myUploader.onErrorItem = (beer, response) => {
      console.log('New beer error', response);

      this.errorMessage = 'Unkown error, try again later'
    } // onErrorItem

    //Start the Ajax request
    this.myUploader.uploadAll();
  }

  saveBeerNoImage() {
    //send 'this.newItem' to the backend for saving
    this.beerThang.postBeer(this.newBeer)
      .subscribe(
        (fullBeerDetails) => {
          console.log('New beer success', fullBeerDetails);
          this.newBeerNotifier.emit({
            beer: fullBeerDetails,
            queryInput: this.queryInput
          });

          this.errorMessage = '';
          this.newBeer = {
            beerName: '',
            beerBrewery: '',
            beerOrigin: '',
            beerType: '',
            beerImage: ''
          }
        },
        (errorInfo) => {
          console.log('New beer error', errorInfo);
          if(errorInfo.status === 400) {
            this.errorMessage = 'Validation Error.'
          } else {
            this.errorMessage = 'Uknown error. Try again later.'
          }
        }
      )
  }

}