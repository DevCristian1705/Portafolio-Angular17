import { Component, Input, inject} from '@angular/core'; 
import { GlobalService } from '../../service/global';
import { Router } from '@angular/router'; 
import { User } from '../../../auth/interfaces';
import { AuthService } from '../../../auth/service/auth.service';

const getStyles = (...args: string[]) => ["nombreBotton", ...args].filter(Boolean)


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  {
  
  @Input() type: "Dashboard" | "Classic" = "Classic";
  isSidebar : boolean = false;
  navbarArray = this.globalsrv.navbar;
  @Input() userSession? : User | null;

  public get typeClass(): string[] {
    return getStyles(this.type)
  }

  private authService = inject(AuthService);
  private router = inject(Router); 

  constructor(
    public globalsrv : GlobalService
  ) {   }
   
  onNavigate(url:string){
    this.router.navigateByUrl(url);
  } 
 
  onActiveSideBar(isActive : boolean){
    this.isSidebar = isActive; 
  }

  onLogout(){
    this.authService.logout();
  }

 

}
