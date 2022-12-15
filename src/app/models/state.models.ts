export const enum LoadingState {
    INIT = "INIT",
    LOADING = "LOADING",
    LOADED = "LOADED",
}

export type CallState = LoadingState | ErrorState;

export interface ErrorState {
    errorMsg: string;
}
