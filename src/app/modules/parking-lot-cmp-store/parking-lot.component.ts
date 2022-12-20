import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import {FormControl, Validator, Validators} from "@angular/forms";
import {filter, fromEvent, Subject, switchMapTo, take, takeUntil, tap, withLatestFrom} from "rxjs";
import {concatLatestFrom} from "@ngrx/effects";
import {switchMap} from "rxjs/operators";
import {Car} from "../../models/car.model";
import {ParkingLotStore} from "./parking-lot.store";

@Component({
    selector: 'app-parking-lot',
    template: `
        <ng-container *ngIf="vm$ | async as vm">
            <div class="messages">
                <p class="error" *ngIf="vm.error">{{vm.error}}</p>
            </div>

            <div class="box">
                <div class="add-car">
                    <input
                        type="text"
                        [formControl]="carPlateControl"
                        [placeholder]="vm.loading ? 'Please wait...' : 'Ex: ' + vm.commonPlates"
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

            <app-car-list class="box"></app-car-list>

            <div class="box">
                <div class="terminal">
                    <pre>
                        {{vm | json}}
                    </pre>
                </div>
            </div>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ParkingLotStore]
})
export class ParkingLotComponent implements AfterViewInit, OnDestroy {
    readonly destroyed$: Subject<void> = new Subject<void>();
    readonly vm$ = this.store.vm$
    readonly carPlateControl = new FormControl('', [Validators.required])
    @ViewChild('addCarButton') addCarButton!: ElementRef;

    constructor(private store: ParkingLotStore) {
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
                this.store.addCarToParkingLotEffect(plate)
                this.carPlateControl.reset()
            }),
            takeUntil(this.destroyed$)
        ).subscribe()
    }

    addPlate($event: Event) {
        const target = $event.target as HTMLButtonElement
        this.store.setLoaded();
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
