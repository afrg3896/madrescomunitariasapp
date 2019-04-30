import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, LoadingController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { icbf } from '../../dataimg/icbf.dataimg';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

@IonicPage()
@Component({
  selector: 'page-view-ram',
  templateUrl: 'view-ram.html',
})
export class ViewRamPage {
  item:any;
  pdfObj = null;
  imagenicbf = icbf;
  loading:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, public platform:Platform,
              public file:File, public fileOpener:FileOpener,public loadingCtrl: LoadingController) {
                this.item = this.navParams.get('item');
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
        this.file.writeFile(this.file.dataDirectory, 'ficha_caracteristica_padres.pdf', blob, { replace: true }).then(fileEntry => {
          this.loading.dismiss();
          this.fileOpener.open(this.file.dataDirectory + 'ficha_caracteristica_padres.pdf', 'application/pdf');
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
            style: 'tableExample',
                  table: {
                    body: [
                      [{ image:this.imagenicbf,
                      width: 50,
                      height: 50,},'Proceso \nPromoción y Prevención \nFormato Veracidad Información Ficha Caracterización Padres'],
                    ]
                  }
          
        },
        { text: 'Formato Veracidad Información Ficha Caracterización Padres', style: 'header' },
 
        { text: 'Yo'+' '+ this.item.acudientenombre+' '+ this.item.acudienteapellido + ',' +
        ' identificado con Cédula de Ciudadanía No.'+ ' ' + this.item.acudientecedula+ ' ' + 'de'+ ' '+
        this.item.acudiendeexpedicion+ ','+' padre / madre o acudiente de la/el/ niño(a)'+' '+ this.item.childnombre+' '+
        this.item.childapellido+','+' identificado con NUIP No.'+' '+ this.item.childnuip+','+ ' usuario de la unidad de servicio'+' '
        + this.item.servicio+','+ ' manifiesto que la información registrada en la ficha de caracterización es verdadera, correcta y completa.'
         , style: 'story', margin: [0, 50, 0, 20] },

        {text:'En constancia se firma en' + ' ' + this.item.lugar + ',' + ' ' + new Date (this.item.fecha).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'}) +'.'},
        
        {text:'\n\n\nDatos del padre o acudiente de la/el niño(a)', style:'subheader'},
        
        {text:'\nNombre :'+ ' '+ this.item.acudientenombre+ ' '+ this.item.acudienteapellido},
        {text:'CC. No. :'+ ' '+ this.item.acudientecedula, style: 'story', margin: [0, 20, 0, 20]},
        {text:'Firma:' },

        {text:'\n\n\nDatos del profesional o Agente Educativo que diligenció la ficha',style:'subheader'},
        {text:'\nNombre :'+ ' '+ this.item.madrenombre + ' '+ this.item.madreapellido},
        {text:'CC. No. :' + ' '+ this.item.madrecedula,style: 'story', margin: [0, 20, 0, 20]},
        {text:'Firma:' }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment:'center'
        },
        subheader:{
          bold: true,
          alignment:'justify'
        },
        story: {
          italic: true,
          alignment: 'justify',
          width: '50%'
        },
        tableExample: {
          margin: [60, 20, 0, 20],
          width: '50%',
          bold: true,
          alignment:'center'
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);

  }
}
