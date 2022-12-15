import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ParkingLotStoreService} from "./parking-lot-store.service";

@Component({
    selector: 'app-parking-lot',
    template: `
        <ng-container *ngrxLet="vm$ as vm">
            {{vm |json}}
        </ng-container>
    `,
    styles: [`
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ParkingLotStoreService]
})
export class ParkingLotComponent implements OnInit {
    vm$ = this.parkingLotStore.vm$;
    constructor(private readonly parkingLotStore: ParkingLotStoreService) {
    }

    ngOnInit(): void {
    }

}
