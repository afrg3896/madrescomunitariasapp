import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-subirvideo',
  templateUrl: 'subirvideo.html',
})
export class SubirvideoPage {
  titulo:string = "";
  userid:string;
  nombre=[];
  videoPreview:string= "";
  disableButton:boolean;
  tipo:string = 'video';
  tipoyoutbe:string = 'youtube';
  youtube:string ='http://www.youtube.com/embed/';
  descripcion:string="";
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              public _cap:CargaArchivoProvider, public afDB:AngularFireDatabase, public afAuth:AngularFireAuth,
              public loadingCtrl: LoadingController,public alertCtrl: AlertController) {
                this.afAuth.authState.subscribe(user =>{
                  this.userid = user.uid;
                  console.log(this.userid);
                  this.getdata(this.userid).then((res:any)=>{
                    this.nombre=res;
                    console.log(this.nombre['nombre']);  
                  });
                });
  }

  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

  grabar(){
    this.disableButton =true;
    let archivo = {
      fuente:this.videoPreview,
      nombre:this.nombre['nombre'],
      apellido:this.nombre['apellido'],
      rating:0,
      titulo:this.titulo,
      descripcion:this.descripcion,
      tipo:this.tipo,
      fecha:Date.now()
    }
    this._cap.cargar_video_firebase(archivo)
        .then(()=>{
          this.cerrar_modal();
        });
  }
  getdata(uid){
    let promise  = new Promise ((resolve, reject)=>{
      this.afDB.database.ref(`usuarios/`).child(uid).child(`info`).once('value', (snapshot) =>{
        let temparr = snapshot.val();
          resolve(temparr);
        }).catch((err)=>{
          reject(err);
      })
    })
    return promise;
 }

 doPrompt() {
  this.disableButton =true;
  let prompt = this.alertCtrl.create({
    title: 'Youtube',
    message: "Añade la extensión del link de yotube: youtube.com/watch?v=...",
    inputs: [
      {
        name: 'Link',
        placeholder: 'Ej: 0j-80cSRVOk'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          let link = this.youtube + data.Link;
          console.log(link);
          let nombrearchivo = new Date().valueOf().toString();
          this._cap.cargar_videos(this.titulo,this.descripcion,link,this.nombre['nombre'],this.nombre['apellido'],0,nombrearchivo,this.tipoyoutbe,Date.now());
          }
        }
      ]
    });
  prompt.present();
  }
}