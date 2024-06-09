import { Component, OnInit } from "@angular/core";  
import { GlobalService } from "../shared/service/global";
import { ISkills } from "../shared/interface/listas";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  
  expLaboralArray$ = this.globalsrv.getExpLaboral();
  proyextosArray$ = this.globalsrv.getProyectos();
  profileArray$ = this.globalsrv.getDatosProfile();
  dataDevelopArray$ = this.globalsrv.getDatosDevelop();
  dataSkills : ISkills[] = []

  constructor( 
    private globalsrv : GlobalService
  ) {
  
  } 

  ngOnInit(): void {
   this.onLoadSkill()
  }

  onLoadSkill(){
    this.globalsrv.getskilss()
    .subscribe(resp => this.dataSkills = resp)
  }
}
