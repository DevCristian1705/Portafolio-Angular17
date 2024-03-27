 import { Component, Inject, SecurityContext } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';
 
@Component({
  selector: 'cbx-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.scss'],
})
 export class DialogMessageComponent {
   width = 'auto';
   size = 'sm' ;
   bodyHtml : any ="";
   data: any;
//   constructor(
//     // private dialogRef: DialogRef,
//     // @Inject(DIALOG_DATA) public data: any,
//     private sanitizer: DomSanitizer
//     ) {
//     if (data?.width) {
//       this.width = data.width;
//     } 
//     if (data) {
//       this.size = data.sizeButton ? data.sizeButton : this.size;
//     }
  
//   }

//   ngOnInit(){
//     this.bodyHtml =  this.sanitizer.sanitize(SecurityContext.HTML, this.data.body);
//   }

  onAceptar() {
   // this.dialogRef.close(true);
  }

}
