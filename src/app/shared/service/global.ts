
import { Injectable } from "@angular/core"; 
import { Observable, of } from "rxjs";
import { IDatosDevelop, IDatosProfile, IListExpLaboral, IListProyectos, MenuOptions, ToolOptions } from "../interface/listas";
 

@Injectable({
  providedIn: 'root',
})
  
export class GlobalService {
  //MENUS
  private datosDevelop : IDatosDevelop[] = [
    {
      name : "Cristian Martinez Fajardo",
      text_lineOne : "Fro",
      text_linetwo : "ntend Develop" ,
      img_dev : "../../assets/imagenes/person-develop.jpeg"
    } 
  ]

  private MenuOptions: MenuOptions[] = [
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

  private ToolBarOptions: ToolOptions[] = [
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
 
  private ExpLaboralOptions: IListExpLaboral[] = [
    { 
      name_company: 'BANCOM', 
      date_init: '21/11/2022',
      date_end: '25/03/2024',
      img_company: '../../assets/logos/logo-bancom.png',
      altImg : 'logo-bancom'
    }, 
    { 
      name_company: 'TI SOLUCIONES', 
      date_init: '01/01/2022',
      date_end: '15/11/2022',
      img_company: '../../assets/logos/logo-ti-soluciones.jpeg',
      altImg : 'logo-ti-soluciones'
    }, 
    { 
      name_company: 'DEL VALLE', 
      date_init: '15/06/2020',
      date_end: '20/06/2021',
      img_company: '../../assets/logos/logo-del-valle.jpg',
      altImg : 'logo-del-valle'
    }, 
    { 
      name_company: 'MIDIS - PAIS', 
      date_init: '10/05/2018',
      date_end: '03/03/2020',
      img_company: '../../assets/logos/logo-midis-pais.jpg',
      altImg : 'logo-midis'
    }, 
  ];

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
      name_proyecto: 'TEMPORIZADORES', 
      description: 'Sistema para indicar a los usuarios que puedes iniciar una actividad basada en un tiempo determinado que puede variar segun los parametros que se etablezcan, como intervalos, o tiempos exactos. ',
      img_proyecto: '', 
      altImg : ''
    }, 
  ];
  
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
  
  onCopyCodeText(text: any) {
    navigator.clipboard.writeText(text)
        .then(() => { console.log('Código copiado')})
        .catch((err) => { console.error('Error al copiar el código:', err);
    });
  }

  getMenu(): Observable<MenuOptions[]> {
    let menuOptions: Observable<MenuOptions[]> = of(this.MenuOptions); 
    return menuOptions;
  }

  getToolBar(): Observable<ToolOptions[]> { 
    let toolbarOptions: Observable<ToolOptions[]> = of(this.ToolBarOptions); 
    return toolbarOptions;
  }

  getExpLaboral(): Observable<IListExpLaboral[]> { 
    let expOptions: Observable<IListExpLaboral[]> = of(this.ExpLaboralOptions); 
    return expOptions;
  }

  getProyectos(): Observable<IListProyectos[]> { 
    let proyectosOptions: Observable<IListProyectos[]> = of(this.ProyectosOptions); 
    return proyectosOptions;
  }

  getDatosProfile(): Observable<IDatosProfile[]> { 
    let datosOptions: Observable<IDatosProfile[]> = of(this.datosProfileOptions); 
    return datosOptions;
  }

  getDatosDevelop(): Observable<IDatosDevelop[]> { 
    let datosDev: Observable<IDatosDevelop[]> = of(this.datosDevelop); 
    return datosDev;
  }

  onValidPass(event : any){   
    var contrasenna = event;
    let existeMayuscula = false;
    let existeMinuscula = false;
    let existeNumber = false;
    let existeSimbolo = false;
    let existelengValidate = false;   

    for (var i = 0; i < contrasenna.length; i++) {
        if (contrasenna.charCodeAt(i) >= 65 && contrasenna.charCodeAt(i) <= 90) {
            existeMayuscula = true;
        } else if ( contrasenna.charCodeAt(i) >= 97 && contrasenna.charCodeAt(i) <= 122 ) {
            existeMinuscula = true;
        } else if ( contrasenna.charCodeAt(i) >= 48 && contrasenna.charCodeAt(i) <= 57 ) {
            existeNumber = true;
        } else if (
            contrasenna.charCodeAt(i) >= 33 && contrasenna.charCodeAt(i) <= 47 ||
            contrasenna.charCodeAt(i) >= 58 && contrasenna.charCodeAt(i) <= 64 ||
            contrasenna.charCodeAt(i) >= 123 && contrasenna.charCodeAt(i) <= 126
            ) {
            existeSimbolo = true;
        }
    }

    if (contrasenna.length >= 8) { 
        existelengValidate = true;
    }

    if (existeMayuscula && existeMinuscula && existeSimbolo && existelengValidate && existeNumber) {  
        return true;
    }else{
        return false;
    } 
 
  }

    onValidateFormEmail(email: string) {
      let validateEmail: boolean = false;
      if (email) {
        const regex = /(\.{2,}|\.+$)/;
        const dotCount = email.split('.').length - 1;
        if (dotCount > 2 || regex.test(email)) {
          validateEmail = true;
        }
      }

      return validateEmail;
    }


    generateUniqueId(prefix: string): string {
      const randomBuffer = Math.floor(Math.random() * 1000000);
      return prefix + '-' + randomBuffer;
    }

}