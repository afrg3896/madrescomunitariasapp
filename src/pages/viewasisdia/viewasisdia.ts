import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { FileOpener } from '@ionic-native/file-opener';
import { icbf } from '../../dataimg/icbf.dataimg';
import { File } from '@ionic-native/file';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@IonicPage()
@Component({
  selector: 'page-viewasisdia',
  templateUrl: 'viewasisdia.html',
})
export class ViewasisdiaPage {
  dia:any;
  semana:any;
  mes:any;
  year:any;
  userid:string;
  asistenciachild: Observable<any[]>;
  bodydata= [];
  imagenicbf = icbf;
  asistenciainfo:any;
  pdfObj = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB:AngularFireDatabase,
    public afAuth: AngularFireAuth,public platform:Platform,public file:File, public fileOpener:FileOpener) {
    this.dia= this.navParams.get('item');
    this.semana = this.navParams.get('semana');
    this.mes = this.navParams.get('mes');
    this.year = this.navParams.get('year');

    this.afAuth.authState.subscribe(user =>{
      if(user){
        this.userid = user.uid;
        this.asistenciachild = this.afDB.list(`/usuarios/${this.userid}/formularios/asistencia/${this.year}/mes/${this.mes}/semana/${this.semana}/dias/${this.dia.key}/lista/`).valueChanges();
        this.asistenciainfo = this.asistenciachild;
        this.asistenciainfo.subscribe(data=>{
          this.bodydata=data;
          console.log(this.bodydata);
        });
      
      }
    });
  }

  downloadPdf(){
    this.createPdf();
    if (this.platform.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
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
                      height: 50,},'Proceso \nPromoción y Prevención \nFormato Registro Asistencia ']
                    ]
                  }
          
        },
        {
          text:'Formato Registro de Asistencia', style: 'header', margin: [0, 20, 0, 20]
        },
        {
          columns: [
            {
              type: 'none',
              ul: [
                'Nombre de la entidad administradora de servicio:',
                'NIT:',
                'Número de Contrato:',
                'Año:',
                'Mes:',
                'Día:',
                'Modalidad de Atención:',
                'Servicio de Arención:'
              ]
            }
          ],
          style:'subheader'
        },
        {
          style: 'tabledata',
          table: {
            body: this.buildTableBody(this.bodydata,['nuip','nombre','apellido','asiste','motivo']),
            widths: ['20%', '20%', '20%', '20%','20%'],
          }
          

        }
      ],
        styles: {
           tableicbf: {
            margin: [150, 20, 0, 20],
            width: '50%',
            bold: true,
            alignment:'center'
          },
          tabledata:{
            margin: [10, 10, 0, 10],
            width:'50',
            bold: true,
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
          }
        }
      }
      this.pdfObj = pdfMake.createPdf(docDefinition);
    }
    buildTableBody(datos, columnas){
      var cuerpo = [];

    		cuerpo.push(['No. de Documento','Nombres','Apellidos','Presente','Motivo de la Ausencia']);
    
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
