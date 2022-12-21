import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy, OnInit,
    ViewChild
} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {defer, filter, fromEvent, pluck, Subject, take, takeUntil, tap, throttleTime} from "rxjs";
import {switchMap} from "rxjs/operators";
import {ParkingLotStore} from "./parking-lot.store";
import {debug} from "../../shared/utils/rxjs.utils";

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
                        [placeholder]="vm.loading ? 'Please wait...' : 'Enter plate'"
                        [disabled]="vm.loading"
                    />
                    <button
                        class="btn-1"
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
                    <p class="examples">
                        <button
                            *ngFor="let plate of vm.commonPlates; trackBy: trackByIndex"
                            #btn
                            (click)="carPlateControl.setValue(btn.innerHTML)"
                        >
                            {{plate}}
                        </button>
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
    private readonly destroyed$: Subject<void> = new Subject<void>();
    readonly vm$ = this.store.vm$
    readonly carPlateControl = new FormControl('', [Validators.required])
    @ViewChild('addCarButton') addCarButton!: ElementRef;
    private readonly addCarBtnClicked$ = defer(() => fromEvent(this.addCarButton.nativeElement, 'click'))

    constructor(private store: ParkingLotStore) {
        this.debuggers()
    }

    ngAfterViewInit(): void {
        this.onAddCar()
    }

    private onAddCar() {
        this.addCarBtnClicked$.pipe(
            tap(() => {
                const plate = this.carPlateControl.getRawValue() as string;
                this.store.addCarEffect(plate)
                this.carPlateControl.reset()
            }),
            takeUntil(this.destroyed$),
            debug('addCarButton clicked')
        ).subscribe()
    }

    trackByIndex = (index: number) => index;

    private debuggers() {
        this.store.vm$.pipe(debug('viewModel changed')).subscribe()
        this.store.loading$.pipe(debug('loading changed')).subscribe()
        this.store.commonPlates$.pipe(debug('commonPlates changed')).subscribe()
        this.store.cars$.pipe(debug('cars changed')).subscribe()
    }

    ngOnDestroy(): void {
        this.destroyed$.next()
        this.destroyed$.complete()
    }
}
