import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BounceComponent } from './component/bounce/bounce.component';
import { CustomerComponent } from './component/customer/customer.component';
import { LoanComponent } from './component/loan/loan.component';
import { TopMenuComponent } from './component/top-menu/top-menu.component';

const routes: Routes = [
  {path: '', redirectTo: 'loan/customer', pathMatch: 'full'},
  {path: 'loan', component: TopMenuComponent,
    children: [
      {path: 'customer', component: CustomerComponent},
      {path: 'loan', component: LoanComponent},
      {path: 'bounce', component: BounceComponent},
    ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
