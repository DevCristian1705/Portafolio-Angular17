import { Component } from "@angular/core";  
import { GlobalService } from "../shared/service/global";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent  {
  
  expLaboralArray$ = this.globalsrv.getExpLaboral();
  proyextosArray$ = this.globalsrv.getProyectos();
  profileArray$ = this.globalsrv.getDatosProfile();
  dataDevelopArray$ = this.globalsrv.getDatosDevelop();

  constructor( 
    private globalsrv : GlobalService
  ) {
  
  } 
}
