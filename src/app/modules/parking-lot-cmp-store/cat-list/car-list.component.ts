import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Car} from "../../../models/car.model";
import {ParkingLotStore} from "../parking-lot.store";

@Component({
    selector: 'app-car-list',
    template: `
        <ng-container *ngIf="vm$|async as vm">
            <table *ngIf="vm.cars.length; else noCarsTemplate">
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
                <tr *ngFor="let car of vm.cars; trackBy: trackByPlate">
                    <td class="first">{{car.plate}}</td>
                    <td class="second">{{car.brand}}</td>
                    <td class="third">{{car.model}}</td>
                    <td class="forth">{{car.color}}</td>
                    <td class="fifth">
                        <button (click)="store.deleteCar(car)">Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </ng-container>
        <ng-template #noCarsTemplate>
            <p>No cars in the parking lot</p>
        </ng-template>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarListComponent {
    readonly vm$ = this.store.vm$;
    readonly trackByPlate = (index: number, el: Car) => el.plate

    constructor(public store: ParkingLotStore) {
    }
}
