import {  Component, ElementRef, Renderer2 } from '@angular/core';
import { GlobalService } from '../../../shared/service/global';
import { IEncuesta, IRespuestas } from '../../../shared/interface/listas';
import { messageEncuesta } from '../../../shared/components/message-type/message-type';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogEncuestaComponent } from '../../../shared/components/dialog/dialog-encuesta/dialog-encuesta.component';
 

@Component({
  selector: 'app-encuesta', 
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss'
})
export class EncuestaComponent {
 
  currentQuestion : IEncuesta = {} as IEncuesta; 
  isQuestionValid : boolean[] = []; 
  questions : IEncuesta[] = [];
  isAnswer : boolean = false;
 

  constructor(
    private globalsrv : GlobalService,
    public dialog: MatDialog, 
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router, 
  ){  
  }
 
  get encuestas(): IEncuesta[] {
    return [...this.globalsrv.encuestas];
  }

  ngOnInit(){
    this.onLoadEncuestas(); 
  }

  onLoadEncuestas(){  
    this.questions =  [...this.encuestas]; 
    this.onFirstQuestion(); 
  }

  onFirstQuestion() { 
    this.isAnswer = false;
    let [ firstQuestion ] = [...this.questions]
    this.currentQuestion = {...firstQuestion}; 
  } 


  onValidAnswer( answerUser : string){ 
    this.isAnswer = true;
    this.onAnimationTitleRemove();
    this.onAnimationRemove(); 

    const { respuesta_correcta, id_encuesta } = this.currentQuestion; 
    if( respuesta_correcta === answerUser ) this.isQuestionValid.push(true) 
    
    const currentQuestionCopy = { ...this.currentQuestion };
    currentQuestionCopy.opciones_respuesta = [...this.currentQuestion.opciones_respuesta.map((option) => ({ ...option }))];
    
    this.currentQuestion.opciones_respuesta.forEach(element => {  
      if(element.opcion === respuesta_correcta ){   
        element.opcion = '✔';
        element.clase = 'resp--valid';  
      }else{   
        element.opcion = 'X';
        element.clase = 'resp--error'; 
      } 
    }); 

  
    setTimeout(() => {     
      //Restablece los valores originales luego de aplicar los estilos
      this.encuestas[id_encuesta].opciones_respuesta = currentQuestionCopy.opciones_respuesta; 
      this.onNextQuestion();
    }, 1000); 
  }

  onNextQuestion(){   
    if (this.questions.length === 1 ) { 

      messageEncuesta.finish.puntaje = this.isQuestionValid.length;
      messageEncuesta.finish.total = this.encuestas.length;

      const dialogRef = this.dialog.open(DialogEncuestaComponent, {
        disableClose: false, width: '350px', data: messageEncuesta.finish 
      });

      dialogRef.afterClosed().subscribe((resp: boolean) => { 
        if(!resp){    
          this.router.navigateByUrl('/dashboard')
          return; 
        }  
        this.isQuestionValid = [];   
        this.onLoadEncuestas(); 
      }); 
      return; 
    } 

    this.onAnimation();
    this.onAnimationTitle(); 
    this.questions.shift();
    this.onFirstQuestion(); 
   
 
  }
   
  onAnimationTitle(){ 
    const elements = this.el.nativeElement.querySelectorAll('.opcion-titulo');
    elements.forEach((element: any) => {  
      this.renderer.addClass(element, 'loader-title-encuesta');   
    });
  }

  onAnimationTitleRemove(){ 
  const elements = this.el.nativeElement.querySelectorAll('.opcion-titulo');
  elements.forEach((element: any) => {  
      this.renderer.removeClass(element, 'loader-title-encuesta');  
  });
  }
 
  onAnimation(){ 
    const elements = this.el.nativeElement.querySelectorAll('.encuesta');
    elements.forEach((element: any) => { 
      this.renderer.addClass(element, 'change-question-fade');  
    });
  }
 

  onAnimationRemove(){ 
    const elements = this.el.nativeElement.querySelectorAll('.encuesta');
    elements.forEach((element: any) => { 
      this.renderer.removeClass(element, 'change-question-fade');  
    });
  }

 
}
