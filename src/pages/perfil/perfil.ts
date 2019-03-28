import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { PrincipalPage } from '../principal/principal';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  userid:string;
  u:any = [];
  info = [];
  imagenPreview:string= "";
  imagen64:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth, public afDatabase:AngularFireDatabase,
              private camera: Camera, public _cap:CargaArchivoProvider) {
    this.afAuth.authState.subscribe(user =>{
      if(user){
        this.userid = user.uid;
        console.log(this.userid);
        this.getdata(this.userid).then((res:any)=>{
          this.u=res;
          this.u.map(element=>{
            this.info.push(element);
          })
        });
        console.log(this.info);
      }
    });
    
  }

  seleccionar_foto(){

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false,
      
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     console.log(imageData);
     this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
     this.imagen64 = imageData;
    }, (err) => {
     // Handle error
     console.log('Error en camara', JSON.stringify(err));
    });
  }


   getdata(uid){
     var promise  = new Promise ((resolve, reject)=>{
       this.afDatabase.database.ref(`usuarios/`).child(uid).child(`info`).once('value', (snapshot) =>{
         let temparr = [];
          temparr.push({
              nombre:snapshot.val().nombre,
              apellido:snapshot.val().apellido,
              email:snapshot.val().email,
              cel:snapshot.val().celular,
              direccion:snapshot.val().direccion,
              municipio:snapshot.val().municipio,
              imagen:snapshot.val().imagen
            });
           resolve(temparr);
         }).catch((err)=>{
           reject(err);
       })
     })
     return promise;
  }

  actualizar(){
    this._cap.cargar_imguser_firebase(this.imagen64,this.userid).then(()=>{
      this.navCtrl.setRoot(HomePage);
    });
  }
}
