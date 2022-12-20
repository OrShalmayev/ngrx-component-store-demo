import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ParkingLotStoreService} from "../parking-lot-store.service";
import {Car} from "../../../models/car.model";

@Component({
    selector: 'app-car-list',
    template: `
        <ng-container *ngIf="cars$|async as cars">
            <table *ngIf="cars.length; else noCarsTemplate">
                <thead>
                <tr>
                    <th class="first">Plate</th>
                    <th class="second">Brand</th>
                    <th class="third">Model</th>
                    <th class="fourth">Color</th>
                    <th class="fifth">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr *ngFor="let car of cars; trackBy: trackByPlate">
                    <td class="first">{{car.plate}}</td>
                    <td class="second">{{car.brand}}</td>
                    <td class="third">{{car.model}}</td>
                    <td class="forth">{{car.color}}</td>
                    <td class="fifth">
                        <button>Delete</button>
                    </td>
                </tr>
                </tbody>
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
    readonly cars$ = this.store.cars$;
    readonly trackByPlate = (index: number, el: Car) => el.plate

    constructor(private store: ParkingLotStoreService) {
    }
}
