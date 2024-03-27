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
  @Input() type : 'SidenavPrimary' | 'SidenavSecondary' = 'SidenavPrimary';
  @Output() closed: EventEmitter<boolean> = new EventEmitter();
 
  menuArray$ = this.globalsrv.getMenu();

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

 

  onLogin(){
    this.router.navigateByUrl('/auth');
  }

  onRegistro(){
    this.router.navigateByUrl('/auth/registro');
  }
}
