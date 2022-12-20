import {Injectable} from '@angular/core';
import {delay, Observable, of, throwError} from "rxjs";
import {Car} from "../models/car.model";
import {carData, FAKE_DELAY, INIT_FAKE_DELAY, parkedCarData} from "../data/car.data";

@Injectable({
    providedIn: 'root'
})
export class ParkingLotService {
    private cars: Car[] = []

    constructor() {
    }
    getParkedCars() {
        return of(parkedCarData).pipe(delay(INIT_FAKE_DELAY))
    }

    add(plate: string): Observable<Car> {
        try {
            const existingCar = this.cars.find((eCar: Car) => eCar.plate === plate)

            if (existingCar) {
                throw `This car with plate ${plate} is already parked`
            }

            const car = this.getCarByPlate(plate)
            this.cars = [...this.cars, car]

            return of(car).pipe(delay(FAKE_DELAY))
        } catch (error) {
            return throwError(error)
        }
    }

    private getCarByPlate(plate: string): Car {
        const car = carData.find((item: Car) => item.plate === plate)

        if (car) {
            return car;
        }

        throw `The car with plate ${plate} is not registered`
    }
}
