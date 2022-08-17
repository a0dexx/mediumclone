import { Injectable } from '@angular/core';
// import { OrderRequestInterface } from '../types/orderRequest.interface';
import { OrderInterface } from '../types/order.interface';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrdersService {
  // orders!: OrderInterface[];
  orders: OrderInterface[] = [{ id: 0, name: 'eee', item: 'dsfd', qty: 1 }];
  counter: number = 0;

  constructor(private http: HttpClient) {}

  testLog(): void {
    console.log('this is hte test');
  }

  addOrder(order: OrderInterface) {
    console.log('order fro service', order);
    this.counter++;
    // order.id = this.counter;
    // order.id = 888;

    order = { ...order, id: this.counter };
    // order = { ...order, id: 55 };

    // // this.orders.push(order);
    // this.orders = [...this.orders, order];
    //
    // console.log('this.orders', this.orders);
    // return of(this.orders);

    const url =
      'https://pq7naokmqa.execute-api.eu-west-2.amazonaws.com/user-profile';
    // return this.http.post<any>(url,order).pipe(map((data) => data.body.Items));
    return this.http.post<any>(url,order).pipe();

  }

  getOrders(): Observable<OrderInterface[]> {
    const url =
      'https://pq7naokmqa.execute-api.eu-west-2.amazonaws.com/user-profile';
    return this.http.get<any>(url).pipe(map((data) => data.body.Items));
    //return of(this.orders);
  }

  getOrder(id: string|null): Observable<OrderInterface> {
    const url =
      'https://pq7naokmqa.execute-api.eu-west-2.amazonaws.com/user-profile/'+id;
    // return this.http.get<any>(url).pipe(map((data) => data.body.Items));
    return this.http.get<any>(url).pipe();
    //return of(this.orders);
  }

  deleteOrder(id:string){
    const url =
      'https://pq7naokmqa.execute-api.eu-west-2.amazonaws.com/user-profile/'+id;
    // return this.http.get<any>(url).pipe(map((data) => data.body.Items));
    return this.http.delete<any>(url).pipe();
  }

  // getOrders(): OrderInterface[] {
  //   return this.orders;
  // }
}
