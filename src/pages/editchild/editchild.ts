import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { Child } from '../../models/childmodel';


@IonicPage()
@Component({
  selector: 'page-editchild',
  templateUrl: 'editchild.html',
})
export class EditchildPage {
  item:any;
  imagenPreview:string= "";
  imagen64:string = "";
  userid:string;
  editnombre:'';
  editapellido:'';
  editnuip:'';
  editfecha:'';
  editedad:'';
  editgenero:'';
  editinfo:'';
  editdireccion: '';
  editparentname:'';
  editparentlastname:'';
  editcedula:'';
  editparentage:'';
  editparentcivil:'';
  editparentesco:'';
  constructor(public navCtrl: NavController, public navParams: NavParams,  private viewCtrl: ViewController,
              public afAuth: AngularFireAuth, public afDatabase:AngularFireDatabase,private camera: Camera,
              public _cap:CargaArchivoProvider) {
                this.afAuth.authState.subscribe(user =>{
                  if(user){
                    this.userid = user.uid;
                  }
                });
    this.item = this.navParams.get('item');
    this.editnombre = this.item.nombre;
    this.editapellido= this.item.apellido;
    this.editnuip= this.item.nuip;
    this.editfecha= this.item.fecha;
    this.editedad= this.item.edad;
    this.editgenero= this.item.genero;
    this.editinfo= this.item.info;
    this.editdireccion= this.item.direccion;
    this.editparentname= this.item.parentname;
    this.editparentlastname= this.item.parentlastname;
    this.editcedula= this.item.cedula;
    this.editparentage= this.item.parentage;
    this.editparentcivil= this.item.parentcivil;
    this.editparentesco= this.item.parentesco;
    console.log(this.editnombre,this.editapellido);
  }

  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

  

  actualizar(){
      if(this.imagen64 != ''){
      this._cap.cargar_imgchild_firebase(this.imagen64,this.userid,this.item.uid,this.editnombre,this.editapellido,this.editnuip,this.editfecha,
        this.editedad,this.editgenero, this.editinfo,this.editdireccion,this.editparentname,this.editparentlastname,this.editcedula,
        this.editparentage,this.editparentcivil,this.editparentesco).then(()=>{
          this._cap.mostrar_toast('Información del Niño Actualizada');
          this.cerrar_modal();
      });
    }else{
      this._cap.cargar_dato_child(this.userid,this.item.uid,this.editnombre,this.editapellido,this.editnuip,this.editfecha,
        this.editedad,this.editgenero, this.editinfo,this.editdireccion,this.editparentname,this.editparentlastname,this.editcedula,
        this.editparentage,this.editparentcivil,this.editparentesco);
      this._cap.mostrar_toast('Información del Niño Actualizada');
      this.cerrar_modal();
    }
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
     // Handle error
     console.log('Error en camara', JSON.stringify(err));
    });
  }
}
