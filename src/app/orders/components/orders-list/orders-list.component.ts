import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderInterface } from '../../types/order.interface';
import { OrdersService } from '../../services/orders.service';
import { select, Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ordersSelector } from '../../store/selectors';
import { addOrderAction, deleteOrderAction, getOrdersAction } from '../../store/actions/orders.action';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {



  form!: FormGroup;

  testObj: OrderInterface = { name: 'eee', item: 'asdf', qty: 1 };

  constructor(
    private fb: FormBuilder,
    private ordersService: OrdersService,
    private store: Store,
    private http: HttpClient
  ) {}


  orders$!: Observable<OrderInterface[] | null>;
  // error$!: Observable<string | null>;
  // isLoading$!: Observable<boolean>;

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
    console.log('orders$', this.orders$);
  }

  initializeForm(): void {
    console.log('initialize form');

  }

  initializeValues(): void {
    this.store.dispatch(getOrdersAction());
    this.orders$ = this.store.pipe(select(ordersSelector));
    // this.error$ = this.store.pipe(select(errorSelector));
    // this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }


  aws() {
    const url =
      'https://pq7naokmqa.execute-api.eu-west-2.amazonaws.com/user-profile';
    // this.http.get(url).subscribe((data) => {
    //   console.log('from aws no ngrx',data);
    // });
    console.log('aws');


    this.store.dispatch(getOrdersAction());
    // this.orders$ = this.store.pipe(select(ordersSelector));
    console.log(this.orders$);
  }

  delete(id?:number) {
    console.log('deleteing');
    const id_string = String(id);
    // this.ordersService.deleteOrder(id_string).subscribe(val => {
    //   console.log('delete response',val);
    // });

    this.store.dispatch(deleteOrderAction({ id: id_string }));
  }
}
