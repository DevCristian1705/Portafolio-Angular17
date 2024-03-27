export interface MenuOptions {
    code: number,
    name: string,
    icon: string, 
    routerlink: string,
}
  
   
export interface ToolOptions  { 
    name: string,  
    routerlink: string,
}

export interface IListExpLaboral  { 
    name_company: string,  
    date_init: string,
    date_end: string,
    img_company: string,
    altImg : string
}

export interface IListProyectos  { 
    name_proyecto: string,  
    description: string,
    img_proyecto: string, 
    altImg : string
}
   
export interface IDatosProfile  { 
    titulo: string,  
    dato: string,
}

export interface IDatosDevelop  {  
    name: string,
    text_lineOne: string,
    text_linetwo: string,
    img_dev: string,
}