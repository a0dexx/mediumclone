import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';

import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from '../actions/getCurrentUser.action';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistenceService } from '../../../shared/services/persistence.service';
import { Router } from '@angular/router';

@Injectable()
export class GetCurrentUserEffects {
  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.persistenceService.get('accessToken');
        //
        // if (!token) {
        //   return of(getCurrentUserFailureAction);
        // }
        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            // this.persistenceService.set('accessToken', currentUser.token);
            return getCurrentUserSuccessAction({ currentUser });
          }),
          catchError(() => {
            return of(getCurrentUserFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService
  ) {}
}
