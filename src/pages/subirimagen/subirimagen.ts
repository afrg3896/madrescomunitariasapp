import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'page-subirimagen',
  templateUrl: 'subirimagen.html',
})
export class SubirimagenPage {
  titulo:string = "";
  imagenPreview:string= "";
  imagen64:string;
  userid:string;
  nombre=[];
  tipo:string='imagen';
  constructor(private viewCtrl: ViewController,
              private camera: Camera,
              public _cap:CargaArchivoProvider, public afDB:AngularFireDatabase, public afAuth:AngularFireAuth) {
                this.afAuth.authState.subscribe(user =>{
                    this.userid = user.uid;
                    console.log(this.userid);
                    this.getdata(this.userid).then((res:any)=>{
                      this.nombre=res;
                      console.log(this.nombre);  
                    });
                  });
        }

  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

  mostrar_camara(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
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

  crear_post(){
    let archivo = {
      fuente:this.imagen64,
      nombre:this.nombre['nombre'],
      apellido:this.nombre['apellido'],
      rating:0,
      titulo:this.titulo,
      tipo:this.tipo
    }
    console.log(archivo.nombre);
    this._cap.cargar_imagen_firebase(archivo)
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
}
