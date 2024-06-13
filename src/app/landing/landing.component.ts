import { Component } from "@angular/core";  
import { GlobalService } from "../shared/service/global";
import { IListExpLaboral, ISkills } from "../shared/interface/listas";
import { Router } from "@angular/router";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent {
  
  // proyextosArray$ = this.globalsrv.getProyectos();
  // profileArray$ = this.globalsrv.getDatosProfile(); 

  dataSkills : ISkills[] =  this.globalsrv.skills
  dataExpLaboral: IListExpLaboral[] = this.globalsrv.expLaboral

  constructor( 
    private globalsrv : GlobalService,
    private router : Router

  ) {
   
  } 
  

  onCloneText(cantidad : number = 4): any[]{
    return Array(cantidad).fill(0).map((x ,i ) => i);
  }

  onDashboard(){
    this.router.navigateByUrl('/dashboard')
  }
}
