import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-parking-lot',
    templateUrl: './parking-lot.component.html',
    styleUrls: ['./parking-lot.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParkingLotComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
