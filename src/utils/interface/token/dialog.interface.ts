export interface IDialogData {
  titulo: string,
  body?: string,
  imagenModal?: string,
  sizeButton: string,
  firstButton?: string,
  secondtButton: string,
  closeAuto?: boolean
}



export interface DialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  maxWidth?: string;
  width?: string;
  data?: any;
  disableClose?: boolean;
  size? : string;
}