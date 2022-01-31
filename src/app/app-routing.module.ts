import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './component/customer/customer.component';
import { PaymentComponent } from './component/payment/payment.component';
import { TopMenuComponent } from './component/top-menu/top-menu.component';

const routes: Routes = [
  {path: '', redirectTo: 'loan/customer', pathMatch: 'full'},
  {path: 'payment', component: PaymentComponent},
  {path: 'loan', component: TopMenuComponent,
    children: [
      {path: 'customer', component: CustomerComponent},
      {path: 'payment', component: PaymentComponent}
    ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
