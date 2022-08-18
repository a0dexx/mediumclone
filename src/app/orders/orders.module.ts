import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersService } from './services/orders.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { GetOrdersEffect } from './store/effects/orders.effects';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderAddComponent } from './components/order-add/order-add.component';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { AwsComponent } from './components/awsOLD/aws.component';
import { WordsComponent } from './components/words/words.component';
import { FilterTestComponent } from './components/filter-test/filter-test.component';


const routes = [
  { path: 'test', component: TestComponent },
  { path: 'orders', component: OrdersListComponent },
  { path: 'order/add', component: OrderAddComponent },
  { path: 'order/:id', component: OrderDetailComponent },
  { path: 'aws', component: AwsComponent },
  { path: 'words', component: WordsComponent },
  { path: 'filter', component: FilterTestComponent },

];

@NgModule({
  declarations: [
    TestComponent,
    OrdersListComponent,
    OrderDetailComponent,
    OrderAddComponent,
    AwsComponent,
    WordsComponent,
    FilterTestComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('order', reducers),
    EffectsModule.forFeature([GetOrdersEffect]),
    MatOptionModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
  providers: [OrdersService],
})
export class OrdersModule {}
