import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import {ParkingLotStoreService} from "./parking-lot-store.service";
import {FormControl, Validator, Validators} from "@angular/forms";
import {filter, fromEvent, Subject, switchMapTo, take, takeUntil, tap, withLatestFrom} from "rxjs";
import {concatLatestFrom} from "@ngrx/effects";
import {switchMap} from "rxjs/operators";

@Component({
    selector: 'app-parking-lot',
    template: `
        <header>
            <h1>Parking Lot Control</h1>
        </header>

        <ng-container *ngIf="vm$ | async as vm">
            <div class="messages">
                <p class="error" *ngIf="vm.error">{{vm.error}}</p>
            </div>

            <div class="box">
                <div class="add-car">
                    <input
                        type="text"
                        [formControl]="carPlateControl"
                        [placeholder]="vm.loading ? 'Loading...' : 'Ex: ' + vm.commonPlates"
                        [disabled]="vm.loading"
                    />
                    <button
                        class=""
                        #addCarButton
                        type="button"
                        [disabled]="vm.loading || carPlateControl.valid===false"
                    >
                        <ng-container *ngIf="vm.loading; else NotLoading">
                            Loading...
                        </ng-container>
                        <ng-template #NotLoading>
                            Add Car
                        </ng-template>
                    </button>
                </div>

                <div class="shortcuts">
                    <h5>Shortcuts</h5>
                    <p (click)="addPlate($event)" class="examples">
                        <button *ngFor="let plate of vm.commonPlates; trackBy: trackByIndex">{{plate}}</button>
                    </p>
                </div>
            </div>

            <app-car-list></app-car-list>
        </ng-container>
    `,
    styles: [`
        :host {
            width: 80%;
            padding: 2rem;
            background-color: #fff;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ParkingLotStoreService]
})
export class ParkingLotComponent implements AfterViewInit, OnDestroy {
    destroyed$: Subject<void> = new Subject<void>();
    vm$ = this.store.vm$
    carPlateControl = new FormControl('', [Validators.required])
    @ViewChild('addCarButton') addCarButton!: ElementRef;

    constructor(private store: ParkingLotStoreService) {
    }

    ngAfterViewInit(): void {
        this.handleAddCar()
    }

    private handleAddCar() {
        fromEvent(this.addCarButton.nativeElement, 'click').pipe(
            switchMap(() => this.store.loading$.pipe(take(1))),
            filter(loading => loading === false),
            tap(() => {
                const plate = this.carPlateControl.getRawValue() as string;
                this.store.addCarToParkingLot(plate)
                this.carPlateControl.reset()
            }),
            takeUntil(this.destroyed$)
        ).subscribe()
    }

    addPlate($event: Event) {
        const target = $event.target as HTMLButtonElement

        if (target.nodeName === 'BUTTON') {
            this.carPlateControl.setValue(target.innerHTML)
        }
    }

    trackByIndex = (index: number) => index;

    ngOnDestroy(): void {
        this.destroyed$.next()
        this.destroyed$.complete()
    }
}
