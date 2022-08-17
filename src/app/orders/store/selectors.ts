import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../shared/types/appState.interface';

import { OrderStateInterface } from '../types/orderState.interface';

export const orderFeatureSelector =
  createFeatureSelector<OrderStateInterface>('order');

export const isSubmittingSelector = createSelector(
  orderFeatureSelector,
  (orderState: OrderStateInterface) => orderState.isLoading
);

export const validationErrorsSelector = createSelector(
  orderFeatureSelector,
  (orderState: OrderStateInterface) => orderState.error
);


export const ordersSelector = createSelector(
  orderFeatureSelector,
  (orderState: OrderStateInterface) => orderState.orders
);

export const selectedOrderSelector = createSelector(
  orderFeatureSelector,
  (orderState: OrderStateInterface) => orderState.selectedOrder
);

// export const isLoggedInSelector = createSelector(
//   orderFeatureSelector,
//   (orderState: OrderStateInterface) => orderState.isLoggedIn
// );
// export const isAnonymousSelector = createSelector(
//   orderFeatureSelector,
//   (orderState: OrderStateInterface) => orderState.isLoggedIn === false
// );
//
// export const currentUserSelector = createSelector(
//   orderFeatureSelector,
//   (orderState: OrderStateInterface) => orderState.currentUser
// );
