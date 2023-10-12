import { Observable } from "rxjs";
import { Car } from "../models/car.model";

export interface ICarSerive {
    getCars(): Observable<Car[]>;
}