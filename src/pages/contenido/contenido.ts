import { Component } from '@angular/core';
import { IonicPage, ModalController, AlertController } from 'ionic-angular';
import { SubirimagenPage } from '../subirimagen/subirimagen';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';
import { ImageviewPage } from '../imageview/imageview';
import { CalificarPage } from '../calificar/calificar';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { LoadingController } from 'ionic-angular';
import { SubirvideoPage } from '../subirvideo/subirvideo';
import { VideoviewPage } from '../videoview/videoview';

@IonicPage()
@Component({
  selector: 'page-contenido',
  templateUrl: 'contenido.html',
})
export class ContenidoPage {
  contenido: string = 'imagenes';
  posts: Observable<any[]>;
  videos: Observable<any[]>;
  constructor(private modalCtrl:ModalController, public _cap:CargaArchivoProvider, public loadingCtrl: LoadingController, 
              public afDB:AngularFireDatabase,public alertCtrl: AlertController) {
    this.loadingCtrl.create({
      content: "Por Favor Espere...",
      duration: 2000
    }).present();
    
    this.posts = afDB.list('post/', ref=> ref.orderByChild('key')).valueChanges();
    this.videos = afDB.list('videos/', ref=> ref.orderByChild('key')).valueChanges();
    console.log(this.videos);
    
  }

  mostrar_modal(){
    let modal = this.modalCtrl.create(SubirimagenPage);
    modal.present();
  }
  mostrar_modalvideo(){
    let modal = this.modalCtrl.create(SubirvideoPage);
    modal.present();
  }
  ver_imagen(post:any){
    let modal = this.modalCtrl.create(ImageviewPage, {'post':post});
    modal.present();
  }

  ver_video(video:any){
    let modal = this.modalCtrl.create(VideoviewPage, {'video':video});
    modal.present();
  }

  calificar(post:any){
    let modal = this.modalCtrl.create(CalificarPage, {'post':post});
    modal.present();
  }

}
