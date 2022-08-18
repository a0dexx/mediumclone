import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {OrdersService} from '../../services/orders.service';
import {Store} from '@ngrx/store';
import {getOrderAction} from '../../store/actions/orders.action';
import {map, Observable, of, startWith} from 'rxjs';
import {filter} from 'rxjs/operators';
import {OrderInterface} from '../../types/order.interface';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-aws',
  templateUrl: './aws.component.html',
  styleUrls: ['./aws.component.scss'],
})
export class AwsComponent implements OnInit {
  id!: string;

  jsonDataResult: any;
  filteredJson: any;

  workstreamJSON!:any;

  // id ='0'
  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private store: Store,
    private http: HttpClient
  ) {
  }

  myControl = new FormControl();


  filteredOptions!: Observable<any[]>;

  ngOnInit(): void {
     this.getWorkstreamData();

    // this.workstreamJSON = this.getWorkstreamData();


  }

  displayFn(selectedoption: any) {
    return selectedoption ? selectedoption.address : undefined;
  }


  getWorkstreamData() {
      this.http.get('assets/MOCK_FILTER2.json').subscribe((data:any) => {

      this.workstreamJSON = data[0].parentWorkstreams;
      console.log('data from http', data);
      // return data;
    });
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
  // getDataForSelect() {
  //   this.http.get('assets/MOCK_DATA.json').subscribe((res) => {
  //     // this.jsonDataResult = of(res);
  //     this.filteredJson = res;
  //
  //     this.filteredOptions = this.myControl.valueChanges
  //       .pipe(
  //         startWith(''),
  //         map(value => typeof value === 'string' ? value : value.address),
  //         map(address => address ? this._filter(address) : this.options.slice())
  //       );
  //     console.log('--- result :: ', this.jsonDataResult);
  //     console.log('--- filtered options :: ', this.filteredOptions);
  //   });
  // }

  // getMockData() {
  //   this.http.get('assets/MOCK_DATA.json').subscribe((res) => {
  //     this.jsonDataResult = of(res);
  //     this.filteredJson = this.jsonDataResult;
  //
  //     this.filteredOptions = this.myControl.valueChanges.pipe(
  //       startWith(''),
  //       map((value) => (typeof value === 'string' ? value : value.address)),
  //       map((value) => this._filter(value))
  //     );
  //     console.log('--- result :: ', this.jsonDataResult);
  //     console.log('--- filtered options :: ', this.filteredOptions);
  //
  //     this.filteredOptions.subscribe((val) => {
  //       console.log('val', val);
  //     });
  //   });
  // }

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
