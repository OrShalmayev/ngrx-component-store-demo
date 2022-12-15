import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ParkingLotStoreService} from "./parking-lot-store.service";

@Component({
    selector: 'app-parking-lot',
    template: `
        <header>
            <h1>Parking Lot Control</h1>
        </header>

        <ng-container *ngIf="vm$ | async as vm">
            {{vm |json}}
            <div class="messages">
                <p class="error" *ngIf="vm.error">{{vm.error}}</p>
            </div>

            <div class="box">
                <form (submit)="onSubmit($event)">
                    <input
                        type="text"
                        placeholder="Ex: 2FMDK3, 1GYS4C, 1GKS1E,1G6AS5"
                        [disabled]="vm.loading"
                    />
                    <button type="submit" [disabled]="vm.loading || !plate.length">
                        <ng-container *ngIf="vm.loading; else NotLoading">
                            Loading...
                        </ng-container>
                        <ng-template #NotLoading>
                            Add Car
                        </ng-template>
                    </button>
                </form>
                <div class="shortcuts">
                    <h5>Shortcuts</h5>
                    <p (click)="addPlate($event)" class="examples">
                        <button>2FMDK3</button>
                        <button>1GYS4C</button>
                        <button>1GKS1E</button>
                        <button>1G6AS5</button>
                    </p>
                </div>
            </div>

<!--            <app-car-list [cars]="vm.cars"></app-car-list>-->
        </ng-container>
    `,
    styles: [`
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ParkingLotStoreService]
})
export class ParkingLotComponent  {
    plate = ''
    vm$ = this.store.vm$

    constructor(private store: ParkingLotStoreService) {}

    onSubmit($event: Event) {
        $event.preventDefault()
        this.store.addCarToParkingLot(this.plate)
        this.plate = "";
    }

    addPlate($event: Event) {
        const target = $event.target as HTMLButtonElement

        if (target.nodeName === 'BUTTON') {
            this.plate = target.innerHTML
        }
    }

}
