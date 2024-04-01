import { Component, Inject } from '@angular/core';  
import {  MAT_DIALOG_DATA,  MatDialogRef } from '@angular/material/dialog'; 
 
@Component({
  selector: 'cbx-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.scss'],
})
 export class DialogMessageComponent {
   width = 'auto';
   size = 'sm' ;
   bodyHtml : any ="";

  constructor(
    public dialogRef: MatDialogRef<DialogMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
   
    ) {
    if (data?.width) {
      this.width = data.width;
    }   
   }

   ngOnInit(){
    console.log('data', this.data)
   }
 
  onAceptar(value : boolean){
    this.dialogRef.close(value);
  }

}
