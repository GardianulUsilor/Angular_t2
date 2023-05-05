import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Car } from '../interfaces/cars';
import carsData from './cars.json'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
    private carsList: Car[] = carsData;
    carSubject = new Subject<Car[]>();
    constructor(private httpClient: HttpClient) {}

    get cars(){
        return this.carsList;
    }
    set cars(carsToSet:Car[]){
        this.carsList = carsToSet;
        this.carSubject.next(carsToSet);
    }
    addCar(car:Car)
    {
        car.id = ((this.carsList.length).valueOf()+1).toString();
        this.carsList.push(car);
        this.carSubject.next(this.carsList);
        console.log(car)
    }
}