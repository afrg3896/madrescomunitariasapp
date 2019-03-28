import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-imageview',
  templateUrl: 'imageview.html',
})
export class ImageviewPage {
  item:any;
  userid:string;
  info = [];
  comentarios: Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl: ViewController,
              public alertCtrl: AlertController,public _cap:CargaArchivoProvider,public afAuth: AngularFireAuth,
              public afDatabase:AngularFireDatabase) {
    this.item = this.navParams.get('post');
    this.afAuth.authState.subscribe(user =>{
      this.userid = user.uid;
      this.getdata(this.userid).then((res:any)=>{
        this.info=res;
      });
    });
    this.comentarios = afDatabase.list(`post/${this.item.key}/comentarios/`, ref=> ref.orderByChild('key')).valueChanges();
  }

  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

  comentar(){
    let prompt = this.alertCtrl.create({
      title: 'Comentario',
      message: "Agrega tu comentario",
      inputs: [
        {
          name: 'Comment'
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
          text: 'Guardar',
          handler: data => {
            let comentario = data.Comment;
            let fecha = Date.now();
            this._cap.cargar_comentario(this.info['nombre'],this.info['apellido'],this.info['imagen'],fecha,comentario,this.item.key, this.item.tipo);
            this.cerrar_modal();
            }
          }
        ]
      });
    prompt.present();
  }

  getdata(uid){
    var promise  = new Promise ((resolve, reject)=>{
      this.afDatabase.database.ref(`usuarios/`).child(uid).child(`info`).once('value', (snapshot) =>{
        let temparr = snapshot.val();
          resolve(temparr);
        }).catch((err)=>{
          reject(err);
      })
    })
    return promise;
 }
}
