import { Injectable } from '@angular/core';
import { Coffee } from './logic/Coffee';
import { PlaceLocation } from './logic/PlaceLocation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  endpoint: string;

  constructor(private httpClient: HttpClient) {
    if (window.location.hostname === 'localhost') {
      this.endpoint = 'http://localhost:3000';
    } else {
      // For Android emulator
      this.endpoint = 'http://10.0.2.2:3000';
    }
  }
  coffeeEntity = '/coffees';

  getList(callback: Function) {
    this.httpClient
      .get(`${this.endpoint}${this.coffeeEntity}`)
      .subscribe((response) => callback(response));
  }

  get(coffeeId: string, callback: Function) {
    this.httpClient
      .get(`${this.endpoint}${this.coffeeEntity}/${coffeeId}`)
      .subscribe((response) => callback(response));
  }

  save(coffee: Coffee, callback: Function) {
    if (coffee._id) {
      // It's an update
      // http://localhost:3000/coffees/12333
      // TODO: Error checking
      this.httpClient
        .put(`${this.endpoint}${this.coffeeEntity}/${coffee._id}`, coffee)
        .subscribe((response) => callback(true));
    } else {
      // It's a new item
      this.httpClient
        .post(`${this.endpoint}${this.coffeeEntity}`, coffee)
        .subscribe((response) => callback(true));
    }
  }
}
