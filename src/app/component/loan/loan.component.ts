import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoanService } from 'src/app/service/loan/loan.service';
import {DropdownModule} from 'primeng/dropdown';


@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  editEnabled = false;
  loanForm!: FormGroup;
  loan: any;
  isResult: boolean = true;
  submitted = false;
  display: boolean = false;
  loanTypes: any;
  frequency1: string = '';
  amount: any = 4500
  
  constructor(private service: LoanService) { 
    this.loanTypes = ['Pigmy','Daily Interest','Monthly Percentwise'];
  }


  ngOnInit(): void {
    this.loanForm = new FormGroup({
      accountNumber: new FormControl(''),
      type: new FormControl(''),
      loanAmount: new FormControl(''),
      frequency: new FormControl(''),
      noOfInstallments: new FormControl(''),
      interest: new FormControl(''),
      interestAmount: new FormControl(''),
      penaltyAmount: new FormControl(''),
      principalBalance: new FormControl(''),
      badDebtAmount: new FormControl(''),
      collectionDate: new FormControl(''),
      additionalCharges: new FormControl(''),
      emiAmount: new FormControl(''),
    })

    this.get();
  }

  get() {
    this.service.getLoan().subscribe((data) => {
        this.loan = data;
        if(this.loan.length===0) {
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
    console.log(customer);
    this.editEnabled = false;
    this.service.editLoan(customer).subscribe((data) => {
    this.get();
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
    this.service.deleteLoan(customer).subscribe((data) => {

    });
    this.ngOnInit();
  }

  show() {
    this.display = true;
  }

  onSubmit() {
    console.log(this.loanForm?.value)
    this.submitted = true;
    if (this.loanForm?.invalid) {
      return;
    }
    this.service.createLoan(this.loanForm?.value).subscribe(data=>{
      this.ngOnInit();
      console.log(data);
    });
    this.get();
    this.display=false;
  }

  dropdownChange(){
   let type = this.loanForm?.value.type
   if(type == "Monthly Percentwise")
   this.frequency1 = "Monthly"
   else if(type == "Daily Interest")
   this.frequency1 = "Weekly"
   else if(type == "Pigmy")
   this.frequency1 = "100 days"
  }

  c(){
    this.amount = this.loanForm?.value.loanAmount * this.loanForm?.value.interest/100 
  }

}
