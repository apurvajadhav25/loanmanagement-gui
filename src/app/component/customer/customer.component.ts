import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CustomerService } from 'src/app/service/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  editEnabled = false;
  loanForm!: FormGroup;
  jewelleries: any;
  isResult: boolean = true;
  submitted = false;
  display: boolean = false;

  constructor(private service: CustomerService) { }

  ngOnInit(): void {
    this.loanForm = new FormGroup({
      name: new FormControl(''),
      isActive: new FormControl(''),
      emailId: new FormControl(''),
      mobileNumber: new FormControl(''),
      address: new FormControl(''),

    })

    this.getCustomers();
  }

  getCustomers() {
    this.service.getCustomers().subscribe((data) => {
        this.jewelleries = data;
        if(this.jewelleries.length===0) {
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
    console.log(index);
    this.editEnabled = false;
    this.service.editCustomer(customer).subscribe((data) => {
    this.getCustomers();
    });
    console.log('Row edit saved');
  }

  onRowEditCancel(customer: any, index: number) {
    console.log(index);
    this.editEnabled = false;
    console.log('Row edit cancelled');
  }

  deleteFilter(customer: any, index: number) {
    console.log(index);
    this.service.deleteCustomer(customer).subscribe((data) => {

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
    this.service.createCustomer(this.loanForm?.value).subscribe(data=>{
      this.ngOnInit();
      console.log(data);
    });
    this.getCustomers();
    this.display=false;
  }

}
