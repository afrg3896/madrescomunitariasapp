import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { ViewantrotimePage } from '../viewantrotime/viewantrotime';


@IonicPage()
@Component({
  selector: 'page-viewantro',
  templateUrl: 'viewantro.html',
})
export class ViewantroPage {
  item:any;
  userid:string;
  antropoyear: Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              public afDB:AngularFireDatabase,public afAuth: AngularFireAuth,public modalCtrl:ModalController) {
    this.item = this.navParams.get('item');
    this.afAuth.authState.subscribe(user =>{
      if(user){
        this.userid = user.uid;
        console.log(this.userid);
        this.antropoyear = afDB.list(`/usuarios/${this.userid}/formularios/antropometrico/${this.item.key}/periodo`).valueChanges();
        console.log(this.antropoyear);
      }
    });

  }

  cerrar_modal(){
    this.viewCtrl.dismiss();

  }

  viewantroperiodo(item:any){
    this.modalCtrl.create(ViewantrotimePage, {'item':item,'year':this.item.key}).present();
  }

}
