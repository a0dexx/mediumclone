import { FeedStateInterface } from '../types/feedState.interface';
import { Action, createReducer, on } from '@ngrx/store';
import {
  getFeedAction,
  getFeedActionFailure,
  getFeedActionSuccess,
} from './actions/getFeed.action';

const initialState: FeedStateInterface = {
  data: null,
  isLoading: false,
  error: null,
};

const feedReducer = createReducer(
  initialState,
  on(
    getFeedAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),

  on(
    getFeedActionSuccess,
    (state, action): FeedStateInterface => ({
      ...state,
      data: action.feed,
      isLoading: false,
    })
  ),

  on(
    getFeedActionFailure,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: false,
    })
  )
);

export function reducers(state: FeedStateInterface, action: Action) {
  return feedReducer(state, action);
}
