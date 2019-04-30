import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { icbf } from '../../dataimg/icbf.dataimg';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@IonicPage()
@Component({
  selector: 'page-viewantrotime',
  templateUrl: 'viewantrotime.html',
})
export class ViewantrotimePage {
  periodo:any;
  userid:string;
  year:string;
  child:Observable<any>;
  imagenicbf = icbf;
  pdfObj = null;
  childinfo:any;
  bodydata= [];
  loading:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl: ViewController,
              public afDB:AngularFireDatabase, public afAuth: AngularFireAuth,public platform:Platform,
              public file:File, public fileOpener:FileOpener,public loadingCtrl: LoadingController) {
              this.periodo = this.navParams.get('item');
              this.year = this.navParams.get('year');
              this.afAuth.authState.subscribe(user =>{
                if(user){
                  this.userid = user.uid;
                  this.child = afDB.list(`/usuarios/${this.userid}/formularios/antropometrico/${this.year}/periodo/${this.periodo.key}/tomas`).valueChanges();
                  this.childinfo = this.child;
                  this.childinfo.subscribe(data=>{
                    this.bodydata=data;
                    console.log(this.bodydata);
                  });
                }
              });
              this.loading = this.loadingCtrl.create({
                content: "Generando archivo PDF"
              });
  }

  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

  downloadPdf(){
    this.createPdf();
    if (this.platform.is('cordova')) {
      this.loading.present();
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
        this.file.writeFile(this.file.dataDirectory, 'captura_datos_antropometricos.pdf', blob, { replace: true }).then(fileEntry => {
          this.loading.dismiss();
          this.fileOpener.open(this.file.dataDirectory + 'captura_datos_antropometricos.pdf', 'application/pdf');
        })
      });
    } else {
      this.pdfObj.download();
    }
  }

  createPdf(){
    var docDefinition = {
      content: [
        {
            style: 'tableicbf',
                  table: {
                    body: [
                      [{ image:this.imagenicbf,
                      width: 50,
                      height: 50,},'Proceso \nPromoción y Prevención \nFormato de Captura de Datos Antropométricos de las Niñas y los Niños']
                    ]
                  }
          
        },
        {
          text:'Formato de Captura de Datos Antropométricos de las Niñas y Niños', style: 'header', margin: [0, 20, 0, 20]
        },
        {
          columns: [
            {
              type: 'none',
              ul: [
                'Nombre de la entidad administradora de servicio:',
                'Nombre de la unidad de servicio/unidad comunitaria de atención:',
                'Modalidad(Institucional,Familiar,Comunitaria o Propia):',
                'Servicio / Forma de atención:',
                'Grupo de atención / Unidad de atención:'
              ]
            }
          ],
          style:'subheader'
        },
        {
          style: 'tabledata',
          table: {
            body: this.buildTableBody(this.bodydata,['nuip','nombre','apellido','genero','nacimiento','fechaservicio','fechatoma','peso','talla','fechaperimetro','perimetro']),
            widths: ['12%', '12%', '12%', '12%','12%', '12%', '12%', '8%','8%', '12%', '8%'],
          }
          

        }
      ],
        styles: {
           tableicbf: {
            margin: [35, 20, 0, 20],
            width: '50%',
            bold: true,
            alignment:'center'
          },
          tabledata:{
            margin: [-10, 20, 50, 50],
            width:'40',
            bold: true,
            fontSize: 7,
            alignment:'center'
          },
          header: {
            fontSize: 18,
            bold: true,
            alignment:'center'
          },
          subheader: {
            fontSize: 12,
            bold: true,
            alignment:'justify'
          },
          tableHeader: {
            bold: true,
            fontSize: 10,
            color: 'black'
          }
        }
      }
      this.pdfObj = pdfMake.createPdf(docDefinition);
    }
    buildTableBody(datos, columnas){
      var cuerpo = [];

    		cuerpo.push(['Nuip','Nombres','Apellidos','Sexo \n(Masculino/Femenino)','Fecha de Nacimiento','Fecha Ingreso al \nServicio o Modalidad','Fecha de la Toma','Peso \n(cm)','Talla \n(cm)','Fecha de la toma \nPerímetro Braquial','Perímetro \n(cm)']);
    
    		datos.forEach(function(fila) {
    			var datoFila = [];
    
    			columnas.forEach(function(columan) {
    				datoFila.push(fila[columan]);
    			})
    
    			cuerpo.push(datoFila);
    		});
    
    		return cuerpo;
    }

}
