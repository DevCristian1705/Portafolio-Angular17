import { Component} from '@angular/core'; 
import { GlobalService } from '../../service/global';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
 
  flgMenuMobile : boolean = false;
  toolArray$ = this.globalsrv.getToolBar();

  constructor(
    private globalsrv: GlobalService,
    private router: Router
  ) { 
     
  }
   
  onLogin(){
    this.router.navigateByUrl('/auth');
  } 

  onActiveMenuMobile(isActive : boolean){
    this.flgMenuMobile = isActive; 
  }

 

}
