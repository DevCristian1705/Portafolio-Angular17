import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../../service/global';
import { Observable } from 'rxjs';
const getStyles = (...args: string[]) => ["nombreBotton", ...args].filter(Boolean)



@Component({
  selector: 'app-sidebar', 
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input() isShow : boolean = false; 
  @Input() type : "SideLanding" | 'SideDashboard' = "SideLanding";
  @Output() closed: EventEmitter<boolean> = new EventEmitter();
  sidebarArray$ = this.globalsrv.getSidebar(); 
  
  public get typeClass(): string[] {
    return getStyles(this.type)
  }


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
 
  onNavigate(url: string){
    this.router.navigateByUrl('/auth');
  }

 
}