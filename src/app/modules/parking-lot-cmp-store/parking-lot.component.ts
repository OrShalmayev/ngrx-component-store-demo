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
                <form>
                    <input
                        type="text"
                        [formControl]="carPlateControl"
                        placeholder="Ex: 2FMDK3, 1GYS4C, 1GKS1E,1G6AS5"
                        [disabled]="vm.loading"
                    />
                    <button #addCarButton type="button" [disabled]="vm.loading || carPlateControl.valid===false">
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
export class ParkingLotComponent implements AfterViewInit, OnDestroy {
    destroyed$: Subject<void> = new Subject<void>();
    vm$ = this.store.vm$
    carPlateControl = new FormControl('', [Validators.required, Validators.nullValidator])
    @ViewChild('addCarButton') addCarButton!: ElementRef;

    constructor(private store: ParkingLotStoreService) {
    }

    ngAfterViewInit(): void {
        this.handleAddCar()
    }

    private handleAddCar() {
        fromEvent(this.addCarButton.nativeElement,'click').pipe(
            switchMap(()=>this.store.loading$.pipe(take(1))),
            filter(loading => loading===false),
            tap(()=>{
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

    ngOnDestroy(): void {
        this.destroyed$.next()
        this.destroyed$.complete()
    }
}
