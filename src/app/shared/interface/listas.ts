export interface menuOptions {
    code: number,
    name: string,
    icon: string, 
    alt_icon?: string,   
    routerlink: string,
}
   
export interface NavbarOptions  { 
    name: string,  
    routerlink: string,
}

export interface IListExpLaboral  { 
    name_company: string,  
    date_init: string,
    date_end: string,
    img_company: string,
    altImg : string
    description : string
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
 
export interface IRespuestas {
	opcion : string;
 	respuesta: string; 
    clase : string
}
  
export interface IEncuesta  {
	id_encuesta : number;
	pregunta: string;
    imagen : string;
    respuesta_correcta : string;
	opciones_respuesta : IRespuestas[] 
}


export interface ISkills {  
    icon: string,   
    alt_icon: string,   
}