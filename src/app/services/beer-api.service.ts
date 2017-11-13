import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BeerInfo } from '../interfaces/beer-info';
import { environment } from '../../environments/environment';

@Injectable()
export class BeerApiService {

  baseUrl: string = environment.apiUrl;

  constructor(
    private httpThang: HttpClient
  ) { }

  // GET/api/beers
  getBeers() {
    return this.httpThang.get(
      this.baseUrl + '/api/items'
    );
  }

  // GET/api/beers/ID
  getBeerDetails(beerId: string) {
    return this.httpThang.get(
      this.baseUrl + '/api/beers/' + beerId
    );
  }

  // POST/api/beers
  postBeer(beerFields: BeerInfo) {
    return this.httpThang.post(
      this.baseUrl + '/api/beers/',
      beerFields,
      { withCredentials: true }
    );
  }

  // DELETE/api/items/ID
  deleteItem(itemId: string) { 
    return this.httpThang.delete(
      this.baseUrl + '/api/items/' + itemId,
      { withCredentials: true }
    );
  }

  // GET/api/myitems
  getMyItems() {
    return this.httpThang.get(
      this.baseUrl + '/api/myitems',
      { withCredentials: true }
    );
  }

}
