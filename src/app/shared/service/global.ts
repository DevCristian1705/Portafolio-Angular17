
import { Injectable } from "@angular/core"; 
import {  Observable,  of } from "rxjs";
import {  IDatosProfile, IEncuesta, IListExpLaboral, IListProyectos, NavbarOptions, menuOptions, ISkills } from "../interface/listas";
 

@Injectable({
  providedIn: 'root',
})
  
export class GlobalService {
 
 //MENUS
  private menuOptions: menuOptions[] = [
    {
      code: 1,
      name: 'Dashboard',
      routerlink : '/dashboard',
      icon: '../../../assets/iconos/icono-home.png',
      alt_icon: 'icono dashboar'
    },  
    {
      code: 2,
      name: 'Generador Otp',
      routerlink : '/dashboard/generate-otp',
      icon: '../../../assets/iconos/icono-proyectos.png',
      alt_icon: 'icono proyectos'  
    }, 
    {
      code: 3,
      name: 'Simulador de Cambio',
      routerlink : '/dashboard/simulator-change',
      icon: '../../../assets/iconos/icono-proyectos.png',
      alt_icon: 'icono proyectos'
    }, 
    {
      code: 4,
      name: 'Encuesta',
      routerlink : '/dashboard/encuesta',
      icon: '../../../assets/iconos/icono-proyectos.png',
      alt_icon: 'icono proyectos'  
    }, 
    // {code: 4,name: 'Org de tareas', router : 'dashboard/proyecto/org-task'},
    // {code: 5,name: 'Calendario', router : 'dashboard/proyecto/calendar'}
  ];

  get menu(): menuOptions[] {
    return this.menuOptions;
  }

  //SIDEBAR
  private sideBarOptions: menuOptions[] = [
    {
      code: 1,
      name: 'Inicio',
      icon: '../../../assets/iconos/icono-home.png',
      routerlink: 'home',
    },
    {
      code: 2,
      name: 'Contacto',
      icon: '../../../assets/iconos/icono-contacto.png',
      routerlink: '#contact',
    },
    {
      code: 3,
      name: 'Experiencia',
      icon: '../../../assets/iconos/icono-experiencia.png',
      routerlink: '#jobs',
    },
    {
      code: 4,
      name: 'Proyectos',
      icon: '../../../assets/iconos/icono-proyectos.png',
      routerlink: '#proyectos',
    },
  ];

  get sidebar(): menuOptions[] {
    return this.sideBarOptions;
  }

  //TOOL
  private navBarOption: NavbarOptions[] = [
    { 
      name: 'Inicio', 
      routerlink: '#home',
    },
    { 
      name: 'Experiencia',  
      routerlink: '#jobs',
    },
    { 
      name: 'Proyectos',  
      routerlink: '#proyectos',
    },
    { 
      name: 'Contacto',  
      routerlink: '#contact',
    }
  ];

  get navbar(): NavbarOptions[] {
    return this.navBarOption;
  }

  //EXP LABORAL
  private ExpLaboralOptions: IListExpLaboral[] = [
    { 
      name_company: 'BANCOM', 
      date_init: '21/11/2022',
      date_end: '25/03/2024',
      img_company: '../../assets/logos/logo-bancom.png',
      altImg : 'logo-bancom',
      description : 'En esta empresa del rubro banca, forme parte del equipo Frontend, donde utilce tecnologias como: angular, html, scss, git, devops, entre otras herramientas para llevar a cabo los proyectos solicitados'
    }, 
    { 
      name_company: 'TI SOLUCIONES', 
      date_init: '01/01/2022',
      date_end: '15/11/2022',
      img_company: '../../assets/logos/logo-ti-soluciones.jpeg',
      altImg : 'logo-ti-soluciones',
      description : 'En TI-soliciones estuve a cargo del lado Frontend, un proyecto ERP desde 0, junto con el quipo, contruimos la parte administrativa y contable, donde aplicamos las bondades de angular como LazyLoad, Modulos, y SPA, se aplico programacion reactiva en todo el proyecto'
    }, 
    { 
      name_company: 'DEL VALLE', 
      date_init: '15/06/2020',
      date_end: '20/06/2021',
      img_company: '../../assets/logos/logo-del-valle.jpg',
      altImg : 'logo-del-valle',
      description : 'En Valle se trabajo con la version 10 de Angular, donde migramos modulos hechos en C++, y se construyeron nuevos sistemas, como Doctor TDV, Evaluacion y renovacion de personal, Programa "Tu Idea", entre otros que me ayudaron a seguir aprendiendo.'
    }, 
    { 
      name_company: 'MIDIS - PAIS', 
      date_init: '10/05/2018',
      date_end: '03/03/2020',
      img_company: '../../assets/logos/logo-midis-pais.jpg',
      altImg : 'logo-midis',
      description : 'Mi experiencia en el MIDIS fue el inicio de mi pasion por el desarrollo web, aqui no solo vi Frontend, si no que ocupe el cargo de fullStack, para esto me onvolucre desde 0 a los requerimientos de las distintas areas del programa PAIS.'
    }, 
  ];

  get expLaboral(): IListExpLaboral[] {
    return this.ExpLaboralOptions;
  }

  // PROYECTOS
  private ProyectosOptions: IListProyectos[] = [
    { 
      name_proyecto: 'GENERADOR CODIGO OTP', 
      description: 'Sistema genera un codigo aleatorio de 4, 6 o hasta de 8 digitos, alfanumericos, string, o numberos, que deben ser insertados en el validador para certificar que el codigo es correcto',
      img_proyecto: '', 
      altImg : ''
    }, 
    { 
      name_proyecto: 'SIMULADOR DE CAMBIO', 
      description: 'Sistema permite simular el cambio de un monto ingresado, que se calculara con el tipo de cambio actual para saber cuanto dinero tenemos que enviar o cuanto dinero vamos a recibir.',
      img_proyecto: '', 
      altImg : ''
    }, 
    { 
      name_proyecto: 'BACKGROUND RANDOM', 
      description: 'Sistema genera  un codigo hexadecimal que se asignara como color de fondo a un area, cada vez que le demos click en el boton generar este tomara un nuebo valor por lo tanto el color cambiara',
      img_proyecto: '', 
      altImg : ''
    }, 
    { 
      name_proyecto: 'ADJUNTAR ARCHIVOS', 
      description: 'Sistema nos permite adjuntar archivos, aqui podemos limitar al usuario, indicando que tipo de formatos y peso estan permitidos y ',
      img_proyecto: '', 
      altImg : ''
    }, 
    { 
      name_proyecto: 'CARRITO DE COMPRA', 
      description: 'Sistema enfocado a crecer como ecomeerce, donde podemos jugar listando productos en el carrito de compra que va determinar el precio cuando se agrege o se quiten los productos dentro del carrito ',
      img_proyecto: '', 
      altImg : ''
    }, 
    { 
      name_proyecto: 'CRONOMETRO', 
      description: 'Sistema para indicar a los usuarios que puedes iniciar una actividad basada en un tiempo determinado que puede variar segun los parametros que se etablezcan, como intervalos, o tiempos exactos. ',
      img_proyecto: '', 
      altImg : ''
    }, 
    { 
      name_proyecto: 'ENCUESTA', 
      description: 'Sistema que te muestra una pregunta y sus opciones segun tu respuesta se marcara como CORRECTO o ERROR, y se iran contabilizando para al final de la encuenta te mostremos un puntaje',
      img_proyecto: '', 
      altImg : ''
    }, 
    { 
      name_proyecto: 'ORGANIZADOR DE TAREAS', 
      description: 'Sistema donde te mostramos 3 columnas, POR HACER, EN PROCESO, FINALIZADO, se le da al usuario la opcion de crear la tarea, con un TITULO, DESCRIPCION, Y un boton de HECHO para poder cambiar el estado, tambien puede usar la opcion de Drag and Drop para mover las historias al siguiente estado,',
      img_proyecto: '', 
      altImg : ''
    }, 
    { 
      name_proyecto: 'CALENDARIO', 
      description: 'Sistema para añadir tareas en los dais del calendario, por mes y año, de forma que el usuario pueda ver sus tareas por fecha',
      img_proyecto: '', 
      altImg : ''
    }, 
    { 
      name_proyecto: 'SISTEMA DE PEDIDOS', 
      description: 'Sistema para llevar el conteo de pedidos, por responsables, cada responsoable muestra un total, y al ver el detalle de dicho responsable podremos ver a los pedidos por responsable.',
      img_proyecto: '', 
      altImg : ''
    }, 
  ];

  get proyectos(): IListProyectos[] {
    return this.ProyectosOptions;
  }

  //DATOS PERFIL
  private datosProfileOptions: IDatosProfile[] = [
    { 
      titulo: 'Nombre Completo', 
      dato: 'Cristian Hactor Martinez Fajardo'
    }, 
    { 
      titulo: 'Dirección', 
      dato: 'Chincha - Ica - Perú'
    }, 
    { 
      titulo: 'Celular', 
      dato: '934560280'
    }, 
    { 
      titulo: 'Email', 
      dato: 'criiz.mar@gmail.com'
    }, 
    { 
      titulo: 'LinkendIn', 
      dato: 'www.linkedin.com/in/cristian-martinez-fajardo'
    }, 
  ]

  get perfil(): IDatosProfile[] {
    return this.datosProfileOptions;
  }

  //Datos de Encuenta
  private datosEncuesta : IEncuesta[] = [
    {
      id_encuesta : 0,
      pregunta: '¿Cuál es la capital de Perú?',
      imagen : 'assets/encuesta/capital-peru.jpeg',
      respuesta_correcta : 'A',
      opciones_respuesta : [
      { opcion : 'A', respuesta: 'LIMA', clase: 'resp--default'},
      { opcion : 'B', respuesta: 'CUZCO', clase: 'resp--default' },
      { opcion : 'C', respuesta: 'PARIS', clase: 'resp--default' }] 
    },
    {
      id_encuesta : 1,
      pregunta: '¿Cuál es el valor de "PI"?',
      imagen : 'assets/encuesta/valor-pi.jpeg',
      respuesta_correcta : 'A',
      opciones_respuesta : [
      { opcion : 'A', respuesta: '3.14..', clase: 'resp--default'},
      { opcion : 'B', respuesta: '27, 000', clase: 'resp--default' },
      { opcion : 'C', respuesta: '0', clase: 'resp--default'}] 
    },
    {
      id_encuesta : 2,
      pregunta: '¿Qué platos son típicos en el Perú?',
      imagen : 'assets/encuesta/platos-tipicos.jpeg',
      respuesta_correcta : 'D',
      opciones_respuesta : [
      { opcion : 'A', respuesta: 'Ceviche', clase: 'resp--default' },
      { opcion : 'B', respuesta: 'Arroz con Pato', clase: 'resp--default' },
      { opcion : 'C', respuesta: 'Carapulcra', clase: 'resp--default' },
      { opcion : 'D', respuesta: 'Todas las anteriores', clase: 'resp--default' }] 
    },
    {
      id_encuesta : 3,
      pregunta: '¿De dónde son originarios los perros Husky-Siberianos?',
      imagen : 'assets/encuesta/siberianos.jpeg',
      respuesta_correcta : 'B',
      opciones_respuesta : [
      { opcion : 'A', respuesta: 'Angola', clase: 'resp--default' },
      { opcion : 'B', respuesta: 'Siberia', clase: 'resp--default' },
      { opcion : 'C', respuesta: 'Costa Rica', clase: 'resp--default' }] 
    },
    {
      id_encuesta : 4,
      pregunta: '¿Cuál es el símbolo químico del agua?',
      imagen : 'assets/encuesta/h20.jpg',
      respuesta_correcta : 'C',
      opciones_respuesta : [
      { opcion : 'A', respuesta: 'Ag', clase: 'resp--default' },
      { opcion : 'B', respuesta: 'Co', clase: 'resp--default' },
      { opcion : 'C', respuesta: 'H2O', clase: 'resp--default' }] 
    },
  ]
 
  get encuestas(): IEncuesta[] {
    return this.datosEncuesta;
  }

  private datosSkills : ISkills[] = [
    {
      icon: 'assets/iconos/angular.png',
      alt_icon: 'icono de angular',
    },{
      icon: 'assets/iconos/js.webp',
      alt_icon: 'icono de JavaScritp',
    },{
      icon: 'assets/iconos/ts.png',
      alt_icon: 'icono de TypeScritp',
    },{
      icon: 'assets/iconos/html.png',
      alt_icon: 'icono de Html',
    },{
      icon: 'assets/iconos/scss.png',
      alt_icon: 'icono de Scss',
    },{ 
      icon: 'assets/iconos/jira.png',
      alt_icon: 'icono de Jira',
    },{
      icon: 'assets/iconos/git.png',
      alt_icon: 'icono de Git',
    },{
      icon: 'assets/iconos/github.png',
      alt_icon: 'icono de Github',
    },{
      icon: 'assets/iconos/azure.png',
      alt_icon: 'icono de Azure',
    },{
      icon: 'assets/iconos/boostrap.webp',
      alt_icon: 'icono de boostrap',
    },{
      icon: 'assets/iconos/laravel.png',
      alt_icon: 'icono de laravel',
    },{
      icon: 'assets/iconos/material.png',
      alt_icon: 'icono de Azure',
    },{
      icon: 'assets/iconos/php.png',
      alt_icon: 'icono de php',
    },{
      icon: 'assets/iconos/primeng.png',
      alt_icon: 'icono de primeng',
    },{
      icon: 'assets/iconos/sql.png',
      alt_icon: 'icono de sql',
    }
  ]

  get skills(): ISkills[] {
    return this.datosSkills;
  }

  
  onCopyCodeText(text: any) {
    navigator.clipboard.writeText(text)
        .then(() => { console.log('Código copiado')})
        .catch((err) => { console.error('Error al copiar el código:', err);
    });
  }
 
  generateUniqueId(prefix: string): string {
    const randomBuffer = Math.floor(Math.random() * 1000000);
    return prefix + '-' + randomBuffer;
  }

} 