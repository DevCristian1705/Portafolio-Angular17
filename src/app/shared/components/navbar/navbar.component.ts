import { Component, Input} from '@angular/core'; 
import { GlobalService } from '../../service/global';
import { Router } from '@angular/router';
import { StorageService } from '../../../../utils/service/storage/storage.service'; 
import { STORAGE_KEY } from '../../../../utils/constants/storage';

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
  userSession  

  public get typeClass(): string[] {
    return getStyles(this.type)
  }


  constructor(
    private globalsrv: GlobalService,
    private storgaesrv : StorageService,
    private router: Router
  ) {  
    this.userSession = this.storgaesrv.isAuthenticated; 
  }
   
  onNavigate(url:string){
    this.router.navigateByUrl(url);
  } 

  onContraerMenu(){
      this.storgaesrv.removeData(STORAGE_KEY.sessionUser);
  }

  onActiveSideBar(isActive : boolean){
    this.isSidebar = isActive; 
  }

 

}
