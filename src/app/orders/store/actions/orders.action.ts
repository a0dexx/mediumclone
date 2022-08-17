import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { OrderInterface } from '../../types/order.interface';

export const getOrdersAction = createAction(ActionTypes.GET_ORDERS);
export const getOrdersActionSuccess = createAction(
  ActionTypes.GET_ORDERS_SUCCESS,
  props<{ orders: OrderInterface[] }>()
);
export const getOrdersActionFailure = createAction(
  ActionTypes.GET_ORDERS_FAILURE
);

export const getOrderAction = createAction(
  ActionTypes.GET_ORDER,
  props<{ id: string }>()
);
export const getOrderActionSuccess = createAction(
  ActionTypes.GET_ORDER_SUCCESS,
  props<{ order: OrderInterface }>()
);
export const getOrderActionFailure = createAction(
  ActionTypes.GET_ORDER_FAILURE
);

export const addOrderAction = createAction(
  ActionTypes.ADD_ORDER,
  props<{ order: OrderInterface }>()
);
export const addOrderActionSuccess = createAction(
  ActionTypes.ADD_ORDER_SUCCESS,
  props<{ order: OrderInterface }>()
);
export const addOrderActionFailure = createAction(
  ActionTypes.ADD_ORDER_FAILURE
);

export const deleteOrderAction = createAction(
  ActionTypes.DELETE_ORDER,
  props<{ id: string }>()
);
export const deleteOrderActionSuccess = createAction(
  ActionTypes.DELETE_ORDER_SUCCESS,
  props<{ id: string }>()
);
export const deleteOrderActionFailure = createAction(
  ActionTypes.DELETE_ORDER_FAILURE
);
