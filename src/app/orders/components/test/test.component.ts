import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
import { select, Store } from '@ngrx/store';
import {
  addOrderAction,
  getOrdersAction,
} from '../../store/actions/orders.action';
import { OrderInterface } from '../../types/order.interface';
import { HttpClient } from '@angular/common/http';
import { errorSelector, feedSelector, isLoadingSelector } from '../../../shared/modules/feed/store/selectors';
import { Observable } from 'rxjs';
import { GetFeedResponseInterface } from '../../../shared/modules/feed/types/getFeedResponse.interface';
import { ordersSelector } from '../../store/selectors';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  form!: FormGroup;

  testObj: OrderInterface = { name: 'eee', item: 'asdf', qty: 1 };

  constructor(
    private fb: FormBuilder,
    private testService: OrdersService,
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
    this.form = this.fb.group({
      name: ['', Validators.required],
      item: ['', Validators.required],
      qty: ['', Validators.required],
    });
  }

  initializeValues(): void {
    this.orders$ = this.store.pipe(select(ordersSelector));
    // this.error$ = this.store.pipe(select(errorSelector));
    // this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }

  onSubmit(): void {
    console.log(this.form.value);

    // this.store.dispatch(addOrderAction(this.form.value) )
    this.store.dispatch(addOrderAction({ order: this.form.value }));
    //this.store.dispatch(getOrdersAction() )
  }

  onTestLog() {
    this.testService.testLog();
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
}
