import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../../service/global';
 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() isShow : boolean = false;
  @Input() position : string | null = "";
  @Input() type = 'MenuPrimary';
  @Output() closed: EventEmitter<boolean> = new EventEmitter();
 
  menuArray = this.globalsrv.menu;

  constructor(
    private globalsrv: GlobalService,
    private router : Router
  ) {
   
   }

  ngOnInit(): void { 
  }

  onHiddenSidenav(){
    this.closed.emit(false);
  }

  onActive(url : string){ 
    this.onHiddenSidenav();
  }
 
  onNavigate(url : string){
    this.router.navigateByUrl(url);
  }

 
}
