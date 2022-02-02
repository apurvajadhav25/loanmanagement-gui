import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoanService } from 'src/app/service/loan/loan.service';

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

  constructor(private service: LoanService) { }


  ngOnInit(): void {
    this.loanForm = new FormGroup({
      accountNumber: new FormControl(''),
      type: new FormControl(''),
      roi: new FormControl(''),
      frequency: new FormControl(''),
      totalAmount: new FormControl(''),
      outStandingAmount: new FormControl(''),
      tenure: new FormControl(''),
      balanceTenure: new FormControl(''),
      address: new FormControl(''),
      emiAmount: new FormControl(''),
      interestAmount: new FormControl(''),
      description: new FormControl(''),
      firstDisbursal: new FormControl(''),
      lastDisbursal: new FormControl(''),
      dueOn: new FormControl(''),
      isActive: new FormControl(''),
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
    console.log(this.loanForm?.value);
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

}
