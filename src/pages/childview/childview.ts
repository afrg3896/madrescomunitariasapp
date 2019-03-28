import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-childview',
  templateUrl: 'childview.html',
})
export class ChildviewPage {
  item:any;
  imagenPreview:string= "";
  imagen64:string;
  userid:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,private camera: Camera,
              public _cap:CargaArchivoProvider, public afAuth: AngularFireAuth) {
    this.item = this.navParams.get('item');
    console.log(this.item);
    this.afAuth.authState.subscribe(user =>{
      this.userid = user.uid;
    });
  }

  cerrar_modal(){
    this.viewCtrl.dismiss();
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
  actualizar(){
    this._cap.cargar_imgchild_firebase(this.imagen64,this.userid,this.item.uid).then(()=>{
      this.cerrar_modal();
    });
  }
}

