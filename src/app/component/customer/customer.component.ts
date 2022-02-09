import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { jsPDF } from 'jspdf';
import { CustomerService } from 'src/app/service/customer/customer.service';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  editEnabled = false;
  loanForm!: FormGroup;
  customers: any;
  isResult: boolean = true;
  submitted = false;
  display: boolean = false;

  @ViewChild('content') content!: ElementRef ;

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
        this.customers = data;
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
    console.log(customer);
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

  deleteCustomer(customer: any, index: number) {
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

  SavePDF():void{  
    let DATA = document.getElementById('content') as HTMLCanvasElement;
      
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('angular-demo.pdf');
    });     
  }
     
  }  
  
    


