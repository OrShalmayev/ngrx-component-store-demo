// Utility function to extract the error from the state
import {CallState, ErrorState, LoadingState} from "../../models/state.models";

export function getError(callState: CallState): LoadingState | string | null {
    if ((callState as ErrorState).errorMsg) {
        return (callState as ErrorState).errorMsg;
    }

    return null;
}
