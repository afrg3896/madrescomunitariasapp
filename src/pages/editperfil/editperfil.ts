import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions  } from '@ionic-native/camera';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-editperfil',
  templateUrl: 'editperfil.html',
})
export class EditperfilPage {
  userid:string;
  u:any = [];
  info = [];
  imagenPreview:string= "";
  imagen64:string="";
  nombre:string="";
  apellido:string="";
  celular:string="";
  direccion:string="";
  municipio:string="";
  region:string="";
  cedula:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth, public afDatabase:AngularFireDatabase,
    private camera: Camera, public _cap:CargaArchivoProvider) {

      this.afAuth.authState.subscribe(user =>{
        if(user){
          this.userid = user.uid;
          console.log(this.userid);
          this.getdata(this.userid).then((res:any)=>{
            this.u=res;
            this.nombre = this.u[0].nombre;
            this.apellido = this.u[0].apellido;
            this.celular = this.u[0].cel;
            this.direccion = this.u[0].direccion;
            this.municipio = this.u[0].municipio;
            this.region = this.u[0].region;
            this.cedula = this.u[0].cedula;
            console.log(this.apellido);

            this.u.map(element=>{
              this.info.push(element);
            })
          });
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
     this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
     this.imagen64 = imageData;
    }, (err) => {
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
             cel:snapshot.val().celular,
             cedula:snapshot.val().cedula,
             direccion:snapshot.val().direccion,
             municipio:snapshot.val().municipio,
             region:snapshot.val().region,
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
   if(this.imagen64 != ''){
    this._cap.cargar_imguser_firebase(this.imagen64,this.userid,this.nombre,this.apellido,this.cedula,this.celular,this.direccion,this.municipio,this.region).then(()=>{
      this._cap.mostrar_toast('Información Actualizada');
      this.navCtrl.push(HomePage);
      
    });
  }else{
    this._cap.cargar_dato_user(this.userid,this.nombre,this.apellido,this.cedula,this.celular,this.direccion,this.municipio,this.region);
      this._cap.mostrar_toast('Información Actualizada');
      this.navCtrl.push(HomePage);
  }
}

}
