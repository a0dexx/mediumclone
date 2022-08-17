import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { select, Store } from '@ngrx/store';
import { getOrderAction } from '../../store/actions/orders.action';
import { map, Observable, of, startWith } from 'rxjs';
import { filter } from 'rxjs/operators';
import { OrderInterface } from '../../types/order.interface';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { ordersSelector, selectedOrderSelector } from '../../store/selectors';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  id!: string;

  jsonDataResult: any;
  filteredJson: any;


  selectedOrder$!: Observable<OrderInterface | null>;
  // id ='0'
  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private store: Store,
    private http: HttpClient
  ) {}



  ngOnInit(): void {


    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') as string;
      console.log('route id', this.id);
    });

    this.ordersService.getOrder(this.id).subscribe((data) => {
      console.log('data from order-detail serveice', data);
    });

    this.store.dispatch(getOrderAction({ id: this.id }));

    this.selectedOrder$ = this.store.pipe(select(selectedOrderSelector));

  }








}
