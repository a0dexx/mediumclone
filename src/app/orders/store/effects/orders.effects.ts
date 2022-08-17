import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
// import { PersistenceService } from '../../../shared/services/persistence.service';
import { Router } from '@angular/router';

import {
  addOrderAction,
  addOrderActionFailure,
  addOrderActionSuccess,
  deleteOrderAction,
  deleteOrderActionFailure,
  deleteOrderActionSuccess,
  getOrderAction,
  getOrderActionSuccess,
  getOrdersAction,
  getOrdersActionFailure,
  getOrdersActionSuccess,
} from '../actions/orders.action';
import { OrdersService } from '../../services/orders.service';
import { OrderInterface } from '../../types/order.interface';
import { getCurrentUserFailureAction } from '../../../auth/store/actions/getCurrentUser.action';

@Injectable()
export class GetOrdersEffect {
  // getOrders$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(getOrdersAction),
  //       tap(() => {
  //         const ord = this.ordersService.getOrders();
  //         console.log('order getting??');
  //         getOrdersActionSuccess({ orders: ord });
  //         //.pipe(map(data => getOrdersActionSuccess({ orders: data })));
  //       })
  //     ),
  //   { dispatch: false }
  // );

  getOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrdersAction),
      switchMap(() => {
        return this.ordersService.getOrders().pipe(
          map((orders: OrderInterface[]) => {
            console.log('askjdfhdksajfh', orders);
            return getOrdersActionSuccess({ orders });
          }),
          catchError(() => {
            return of(getCurrentUserFailureAction());
          })
        );
      })
    )
  );

  getOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrderAction),
      switchMap(({ id }) => {
        return this.ordersService.getOrder(id).pipe(
          map((order: OrderInterface) => {
            console.log('get order', order);
            return getOrderActionSuccess({ order });
          }),
          catchError(() => {
            return of(getCurrentUserFailureAction());
          })
        );
      })
    )
  );

  addOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addOrderAction),
      switchMap(({ order }) => {
        console.log('valll', order);
        return this.ordersService.addOrder(order).pipe(
          map((order: OrderInterface) => {
            return addOrderActionSuccess({ order });
          }),
          catchError(() => {
            return of(getCurrentUserFailureAction());
          })
        );
      })
    )
  );

  deleteOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteOrderAction),
      switchMap(({ id }) => {
        console.log('valll', id);
        return this.ordersService.deleteOrder(id).pipe(
          map((orders: OrderInterface[]) => {
            return deleteOrderActionSuccess({id});
          }),
          catchError(() => {
            return of(deleteOrderActionFailure());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private ordersService: OrdersService
  ) {}
}
