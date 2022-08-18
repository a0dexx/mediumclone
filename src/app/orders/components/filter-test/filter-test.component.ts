import {Component, Input, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { groupBy, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'app-filter-test',
  templateUrl: './filter-test.component.html',
  styleUrls: ['./filter-test.component.scss'],
})
export class FilterTestComponent implements OnInit {
  options!: Array<any>;
  PScontrol = new FormControl();
  WScontrol = new FormControl();

  PSoptions!: Array<any>;
  WSoptions!: Array<any>;

  PSfilteredOptions!: Observable<any[]>;
  WSfilteredOptions!: Observable<any[]>;


  @Input() workStreamData:any;


  constructor(private http: HttpClient) {}

  ngOnInit() {


    console.log('the data', this.workStreamData);


    this.WScontrol.disable();
    this.http.get<any>('assets/MOCK_FILTER.json').subscribe((res) => {
      // this.options = res;

      this.PScontrol.valueChanges.subscribe((value) => {
        console.log('whats the val', value);

        if(value){
          this.WScontrol.enable();
          console.log('value is there')



          this.PSfilteredOptions = this.WScontrol.valueChanges.pipe(
            startWith(''),
            map((value) =>
              typeof value === 'string' ? value : value.parent_stream
            ),
            map((parent_stream) =>
              parent_stream ? this._filter(this.PSoptions,parent_stream) : this.PSoptions.slice()
            )
            // groupBy(value => value.parent_stream)
          );


        }else {
          console.log('should be empty')

          this.WScontrol.setValue('');
          this.WScontrol.disable();
        }
      });


      this.WScontrol.valueChanges.subscribe((value) => {
        console.log('whats the val 2', value);
      });


      this.PSoptions = this.getParentStreamValues(res);

      this.PSfilteredOptions = this.PScontrol.valueChanges.pipe(
        startWith(''),
        map((value) =>
          typeof value === 'string' ? value : value.parent_stream
        ),
        map((parent_stream) =>
          parent_stream ? this._filter(this.PSoptions,parent_stream) : this.PSoptions.slice()
        )
        // groupBy(value => value.parent_stream)
      );

    });



  }

  getParentStreamValues(data: any) {
    console.log('original data', data);

    const psValues: Array<any> = [];

    data.forEach((item: any) => {
      if (!psValues.includes(item.parent_stream)) {
        psValues.push(item.parent_stream);
      }
    });

    console.log('modified data', psValues);

    return psValues;
  }

  getWorkStreamValues() {}

  private _filter(options:any,value: string) {
    console.log('filtering?');
    return this.options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
  }

  displayFn(selectedoption: any) {
    return selectedoption ? selectedoption : undefined;
  }

  update() {
    console.log(this.PScontrol.value.id);
  }
}
