import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ParkingLotStoreService} from "../parking-lot-store.service";
import {Car} from "../../../models/car.model";

@Component({
    selector: 'app-car-list',
    template: `
        <ng-container *ngIf="cars$|async as cars">
            <table *ngIf="cars.length; else noCarsTemplate">
                <tr>
                    <th>Plate</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Color</th>
                </tr>
                <tr *ngFor="let car of cars; trackBy: trackByPlate">
                    <td>{{car.plate}}</td>
                    <td>{{car.brand}}</td>
                    <td>{{car.model}}</td>
                    <td>{{car.color}}</td>
                </tr>
            </table>

            <ng-template #noCarsTemplate>
                <p>No cars in the parking lot</p>
            </ng-template>
        </ng-container>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarListComponent {
    cars$ = this.store.cars$;
    trackByPlate = (index:number, el:Car) => el.plate

    constructor(private store: ParkingLotStoreService) {
    }
}
