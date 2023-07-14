// store/types/userTypes.ts
export const INCREASE_LOADING = 'INCREASE_LOADING';
export const DECREASE_LOADING = 'DECREASE_LOADING';

export interface Loading {
  loading: number
}

export interface IncreaseLoadingAction {
  type: typeof INCREASE_LOADING;
}

export interface DecreaseLoadingAction {
  type: typeof DECREASE_LOADING;
}

export type LoadingActionTypes = IncreaseLoadingAction | DecreaseLoadingAction;
