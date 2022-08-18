import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { Store } from '@ngrx/store';
import { getOrderAction } from '../../store/actions/orders.action';
import { map, Observable, of, startWith } from 'rxjs';
import { filter } from 'rxjs/operators';
import { OrderInterface } from '../../types/order.interface';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-aws',
  templateUrl: './aws.component.html',
  styleUrls: ['./aws.component.scss'],
})
export class AwsComponent implements OnInit {
  id!: string;

  jsonDataResult: any;
  filteredJson: any;

  // id ='0'
  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private store: Store,
    private http: HttpClient
  ) {}

  myControl = new FormControl();

  options = [
    { id: '1', address: '123 Main Street Hollywood CA 90210' },
    { id: '2', address: '123 Main Street Unit 1 Hollywood CA 90210' },
    { id: '3', address: '45 Main Street Hollywood CA 90210' },
    { id: '4', address: '345 Main Street Unit 1 Hollywood CA 90210' },
  ];

  filteredOptions!: Observable<any[]>;

  ngOnInit(): void {
    //   this.getMockData();
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   console.log('jsaon data', this.jsonDataResult);
  //   // return this.jsonDataResult.parent_stream.filter((option:any) => option.toLowerCase().includes(filterValue));
  //   return this.jsonDataResult.pipe(
  //     map((data: any) => {
  //       console.log('the data', data);
  //       // return data.filter((r: any) =>
  //       //   r.parent_stream == filterValue
  //       // );
  //     })
  //   );
  // }
  //
  displayFn(selectedoption:any){
    return selectedoption ? selectedoption.address : undefined;
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log('jsaon data', this.jsonDataResult);
    // return this.jsonDataResult.parent_stream.filter((option:any) => option.toLowerCase().includes(filterValue));
    return this.jsonDataResult.pipe(
      map((data: any) => {
        console.log('the data', data);
        // return data.filter((r: any) =>
        //   r.parent_stream == filterValue
        // );
      })
    );
  }

  getDataForSelect() {
    this.http.get('assets/MOCK_DATA.json').subscribe((res) => {
      // this.jsonDataResult = of(res);
      this.filteredJson = res;

      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.address),
          map(address => address ? this._filter(address) : this.options.slice())
        );
      console.log('--- result :: ', this.jsonDataResult);
      console.log('--- filtered options :: ', this.filteredOptions);
    });
  }

  getMockData() {
    this.http.get('assets/MOCK_DATA.json').subscribe((res) => {
      this.jsonDataResult = of(res);
      this.filteredJson = this.jsonDataResult;

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value.address)),
        map((value) => this._filter(value))
      );
      console.log('--- result :: ', this.jsonDataResult);
      console.log('--- filtered options :: ', this.filteredOptions);

      this.filteredOptions.subscribe((val) => {
        console.log('val', val);
      });
    });
  }

  filterByParent(myfilter: string) {
    console.log('filterby', myfilter);

    this.filteredJson = this.jsonDataResult.pipe(
      map((data: any) => {
        console.log('the data', data);
        return data.filter((r: any) => r.parent_stream == myfilter);
      })
    );

    // this.jsonDataResult.filter((data: any) => data.parent_stream == 'ps1');
    // this.jsonDataResult.subscribe((data: any) => {
    //   console.log(data);
    // });
    console.log(this.jsonDataResult);
  }
}
