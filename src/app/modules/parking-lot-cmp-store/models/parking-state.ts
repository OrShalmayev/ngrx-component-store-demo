// The state model
import {CallState} from "../../../models/state.models";
import {Car} from "../../../models/car.model";
import {Observable} from "rxjs";

export interface ParkingState {
    cars: Car[]; // render the table with cars
    callState: CallState;
}
export type viewModelType = Observable<ParkingState & { loading: boolean, error: unknown }>;
