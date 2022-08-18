import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-filter-new',
  templateUrl: './filter-new.component.html',
  styleUrls: ['./filter-new.component.scss']
})
export class FilterNewComponent implements OnInit {
  options!: Array<any>;
  PScontrol = new FormControl();
  WScontrol = new FormControl();

  PSoptions!: Array<any>;
  WSoptions!: Array<any>;

  PSfilteredOptions!: Observable<any[]>;
  WSfilteredOptions!: Observable<any[]>;


  @Input() workStreamData!: any;

  workingData: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.processData()
  }

  processData() {

    console.log('data coming in to filter component', this.workStreamData)


    this.WScontrol.disable();
    this.PScontrol.valueChanges.subscribe((value: any) => {
      console.log('selected value', value);
      console.log('selected value workstreams', value.workstreams);
      if (value.workstreams) {
        this.WSoptions = value.workstreams;
        this.WScontrol.enable();
        this.WSfilteredOptions = this.WScontrol.valueChanges.pipe(
          startWith(''),
          map((value) =>
            typeof value === 'string' ? value : value.name
          ),
          map((name) =>
            name ? this._PSfilter(name) : this.WSoptions.slice()
          )
        );
      } else {
        console.log('should be empty')
        this.WScontrol.setValue('');
        this.WScontrol.disable();
      }
    })


    this.PSfilteredOptions = this.PScontrol.valueChanges.pipe(
      startWith(''),
      map((value) =>
        typeof value === 'string' ? value : value.name
      ),
      map((name) =>
        name ? this._PSfilter(name) : this.workStreamData.slice()
      )
      // groupBy(value => value.parent_stream)
    )


  }


  private _PSfilter(name: string) {
    console.log('filtering?');
    return this.workStreamData.filter((option: any) =>
      option.name.toLowerCase().includes(name.toLowerCase())
    );
  }


  displayFn(parentWorkstream: any) {
    console.log('from display', parentWorkstream)

    return parentWorkstream && parentWorkstream.name ? parentWorkstream.name : undefined;
  }

  update() {
    console.log(this.PScontrol.value);
  }
}
