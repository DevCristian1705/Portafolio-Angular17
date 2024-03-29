import { Component, Input} from '@angular/core'; 
import { GlobalService } from '../../service/global';
import { Router } from '@angular/router';
const getStyles = (...args: string[]) => ["nombreBotton", ...args].filter(Boolean)


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
  
  @Input() type: "Dashboard" | "Classic" = "Classic";
  isSidebar : boolean = false;
  navbarArray$ = this.globalsrv.getNavBar();


  public get typeClass(): string[] {
    return getStyles(this.type)
  }


  constructor(
    private globalsrv: GlobalService,
    private router: Router
  ) { 
     
  }
   
  onNavigate(url:string){
    this.router.navigateByUrl(url);
  } 

  onContraerMenu(){
    
  }

  onActiveSideBar(isActive : boolean){
    this.isSidebar = isActive; 
  }

 

}
