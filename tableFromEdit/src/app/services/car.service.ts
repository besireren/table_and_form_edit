import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car, Color } from '../models/car.model';
import { ICarSerive } from './car.service.interface';

@Injectable({
  providedIn: 'root'
})
export class CarService implements ICarSerive{

  constructor(private httpClient: HttpClient) { }

  getCars() {
    return this.httpClient.get('/api/data') as Observable<Car[]>;
  }

  addCar(car:Car) {
    return this.httpClient.post('/api/data',car) as Observable<Car>;
  }

  setCar(car:Car) {
    return this.httpClient.patch('/api/data/'+car.id,car) as Observable<Car>;
  }

  getColors() {
    return this.httpClient.get('/api/colors') as Observable<Color[]>;
  }

}
