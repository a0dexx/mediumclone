import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';


import {
  getFeedAction,
  getFeedActionSuccess,
  getFeedActionFailure,
} from '../actions/getFeed.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
// import { PersistenceService } from '../../../shared/services/persistence.service';
import { Router } from '@angular/router';
import { FeedService } from '../../services/feed.service';
import { GetFeedResponseInterface } from '../../types/getFeedResponse.interface';

@Injectable()
export class GetFeedEffect {
  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFeedAction),
      switchMap(({ url }) => {

        return this.feedService.getFeed( url ).pipe(
          map((feed: GetFeedResponseInterface) => {
            // this.persistenceService.set('accessToken', currentUser.token);
            return getFeedActionSuccess({ feed });
          }),
          catchError(() => {
            return of(getFeedActionFailure());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private feedService: FeedService
  )
  {}
}
