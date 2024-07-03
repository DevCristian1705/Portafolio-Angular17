import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent  {

  currentDate : Date = new Date();
  currentYear = this.currentDate.getFullYear();
  email :string = 'criizt.mart@gmail.com';
  
  constructor() { }


 
}
