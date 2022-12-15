// The state model
import {CallState} from "./state.models";
import {Car} from "./car.model";

interface ParkingState {
    cars: Car[]; // render the table with cars
    callState: CallState;
}
