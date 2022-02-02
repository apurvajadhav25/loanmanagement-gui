import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  items!: MegaMenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
          label: 'Customer', routerLink: 'customer'
      },
      {
        label: 'Loan', routerLink: 'loan'
      },
      {
        label: 'Bounce', routerLink: 'bounce'
      },
     
  ]
  }

}
