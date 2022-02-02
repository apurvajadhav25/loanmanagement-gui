import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BounceService } from 'src/app/service/bounce/bounce.service';
import {CalendarModule} from 'primeng/calendar';
import { LoanService } from 'src/app/service/loan/loan.service';

@Component({
  selector: 'app-bounce',
  templateUrl: './bounce.component.html',
  styleUrls: ['./bounce.component.css']
})
export class BounceComponent implements OnInit {

  editEnabled = false;
  loanForm!: FormGroup;
  customers: any;
  isResult: boolean = true;
  submitted = false;
  display: boolean = false;
  accountNumber: any;

  constructor(private service: BounceService,
              private loanService: LoanService) {
                this.loanService.getLoan().subscribe((data)=>{
                  this.accountNumber = data
                })
               }

  ngOnInit(): void {
    this.loanForm = new FormGroup({
      date: new FormControl(''),
      accountNumber: new FormControl('')
    })

    this.getCustomers();
  }

  getCustomers() {
    this.service.getBounces().subscribe((data) => {
        this.customers = data;
        console.log(this.customers)
        if(this.customers.length===0) {
          this.isResult=false;
        } else {
          this.isResult=true;
        }
    }); 
    this.loanForm.reset();
  }

  onRowEditInit(customer: any, index: number) {
    console.log(index);
    this.editEnabled = true;
    console.log('Row edit initialized');
  }

  onRowEditSave(customer: any, index: number) {

    customer.accountNumber = customer.accountNumber.accountNumber
    console.log(customer.accountNumber)
    this.editEnabled = false;
    this.service.editBounce(customer).subscribe((data) => {
    this.getCustomers();
    });
    console.log('Row edit saved');
  }

  onRowEditCancel(customer: any, index: number) {
    console.log(index);
    this.editEnabled = false;
    console.log('Row edit cancelled');
  }

  deleteCustomer(customer: any, index: number) {
    console.log(index);
    this.service.deleteBounce(customer).subscribe((data) => {

    });
    this.ngOnInit();
  }

  show() {
    this.display = true;
  }

  onSubmit() {
    console.log(this.loanForm?.value);
    this.submitted = true;
    if (this.loanForm?.invalid) {
      return;
    }
    this.service.createBounce(this.loanForm?.value).subscribe(data=>{
      this.ngOnInit();
    });
    this.getCustomers();
    this.display=false;
  }

}
