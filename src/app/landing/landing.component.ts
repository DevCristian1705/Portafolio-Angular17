import { Component, OnInit } from "@angular/core";  
import { GlobalService } from "../shared/service/global";
import { IListExpLaboral, ISkills } from "../shared/interface/listas";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  
  proyextosArray$ = this.globalsrv.getProyectos();
  profileArray$ = this.globalsrv.getDatosProfile(); 

  dataSkills : ISkills[] = []
  dataExpLaboral: IListExpLaboral[] = []

  constructor( 
    private globalsrv : GlobalService
  ) {
  
  } 

  ngOnInit(): void {
   this.onLoadSkill();
   this.onLoadExpLaboral();
  }

  onLoadSkill(){
    this.globalsrv.getskilss()
    .subscribe(resp => this.dataSkills = resp)
  }

  onLoadExpLaboral(){
    this.globalsrv.getExpLaboral()
    .subscribe(resp => this.dataExpLaboral = resp)
  }

}
