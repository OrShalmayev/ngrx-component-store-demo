import {Injectable} from '@angular/core';
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {ParkingState} from "./models/parking-state";
import {ParkingLotService} from "../../services/parking-lot.service";
import {LoadingState} from "../../models/state.models";
import {catchError, concatMap} from "rxjs/operators";
import {Car} from "../../models/car.model";
import {EMPTY, Observable} from "rxjs";
import {getError} from "../../shared/utils/state.utils";

@Injectable()
export class ParkingLotStoreService extends ComponentStore<ParkingState> {
    constructor(private parkingLotService: ParkingLotService) {
        super({
            cars: [],
            callState: LoadingState.INIT
        });
    }

    // SELECTORS
    private readonly cars$: Observable<Car[]> = this.select(state => state.cars);
    private readonly loading$: Observable<boolean> = this.select(
        state => state.callState === LoadingState.LOADING
    );
    private readonly error$: Observable<string> = this.select(state =>
        getError(state.callState)
    );


    // ViewModel for the component
    readonly vm$ = this.select(
        this.cars$,
        this.loading$,
        this.error$,
        (cars, loading, error) => ({
            cars,
            loading,
            error
        })
    );

    // UPDATERS (reducer)
    readonly updateError = this.updater((state: ParkingState, error: string) => {
        return {
            ...state,
            callState: {
                errorMsg: error
            }
        };
    });

    readonly setLoading = this.updater((state: ParkingState) => {
        return {
            ...state,
            callState: LoadingState.LOADING
        };
    });

    readonly setLoaded = this.updater((state: ParkingState) => {
        return {
            ...state,
            callState: LoadingState.LOADED
        };
    });

    readonly updateCars = this.updater((state: ParkingState, car: Car) => {
        return {
            ...state,
            error: "",
            cars: [...state.cars, car]
        };
    });

    // EFFECTS
    readonly addCarToParkingLot = this.effect((plate$: Observable<string>) => {
        return plate$.pipe(
            concatMap((plate: string) => {
                this.setLoading();
                return this.parkingLotService.add(plate).pipe(
                    tapResponse(
                        car => {
                            this.setLoaded();
                            this.updateCars(car);
                        },
                        (e: string) => this.updateError(e)
                    ),

                    catchError(() => EMPTY)
                );
            })
        );
    });
}
