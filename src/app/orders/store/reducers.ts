import { Action, createReducer, on } from '@ngrx/store';
import {
  getOrdersAction,
  getOrdersActionSuccess,
  getOrdersActionFailure,
  addOrderAction,
  addOrderActionSuccess,
  addOrderActionFailure,
  getOrderAction,
  getOrderActionSuccess,
  getOrderActionFailure,
  deleteOrderAction,
  deleteOrderActionSuccess,
  deleteOrderActionFailure,
} from './actions/orders.action';
import { OrderStateInterface } from '../types/orderState.interface';

const initialState: OrderStateInterface = {
  isLoading: false,
  error: null,
  orders: null,
  selectedOrder: null,
};

const orderReducer = createReducer(
  initialState,
  on(
    getOrdersAction,
    (state): OrderStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getOrdersActionSuccess,
    (state, action): OrderStateInterface => ({
      ...state,
      isLoading: false,
      selectedOrder: null,

      orders: action.orders,
    })
  ),
  on(
    getOrdersActionFailure,
    (state, action): OrderStateInterface => ({
      ...state,
      isLoading: false,
      error: 'orders fail',
      orders: null,
      selectedOrder: null,
    })
  ),

  on(
    getOrderAction,
    (state): OrderStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getOrderActionSuccess,
    (state, action): OrderStateInterface => ({
      ...state,
      isLoading: false,

      selectedOrder: action.order,
    })
  ),
  on(
    getOrderActionFailure,
    (state, action): OrderStateInterface => ({
      ...state,
      isLoading: false,
      error: 'order fail',

      selectedOrder: null,
    })
  ),

  on(
    addOrderAction,
    (state): OrderStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    addOrderActionSuccess,
    (state, action): OrderStateInterface => ({
      ...state,
      isLoading: false,

      selectedOrder: action.order,
    })
  ),
  on(
    addOrderActionFailure,
    (state, action): OrderStateInterface => ({
      ...state,
      isLoading: false,
      error: null,
      orders: null,
      selectedOrder: null,
    })
  ),

  on(
    deleteOrderAction,
    (state): OrderStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    deleteOrderActionSuccess,
    (state, { id }): OrderStateInterface => ({
      ...state,
      isLoading: false,
      orders: state.orders!.filter((x:any) => x.id !== id),
      selectedOrder: null,
    })
  ),
  on(
    deleteOrderActionFailure,
    (state, action): OrderStateInterface => ({
      ...state,
      isLoading: false,
      error: null,
      orders: null,
      selectedOrder: null,
    })
  )
);

export function reducers(state: OrderStateInterface, action: Action) {
  return orderReducer(state, action);
}
