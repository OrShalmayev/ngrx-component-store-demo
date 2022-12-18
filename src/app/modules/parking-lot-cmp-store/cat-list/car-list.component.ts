import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ParkingLotStoreService} from "../parking-lot-store.service";

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
                <ng-template ngFor let-car [ngForOf]="cars" let-i="index">
                    <tr>
                        <td>{{car.plate}}</td>
                        <td>{{car.brand}}</td>
                        <td>{{car.model}}</td>
                        <td>{{car.color}}</td>
                    </tr>
                </ng-template>
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

    constructor(private store: ParkingLotStoreService) {
    }
}
