import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { RamPage } from '../ram/ram';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ViewRamPage } from '../view-ram/view-ram';

@IonicPage()
@Component({
  selector: 'page-addram',
  templateUrl: 'addram.html',
})
export class AddramPage {

  userid:string;
  u:any = [];
  ram: Observable<any[]>;
  constructor(public navCtrl: NavController,
              public afAuth: AngularFireAuth, 
              public loadingCtrl: LoadingController,
              public afDatabase:AngularFireDatabase, 
              public modalCtrl:ModalController) {

                this.afAuth.authState.subscribe(user =>{
                  if(user){
                    this.userid = user.uid;
                    console.log(this.userid);
                    this.ram = afDatabase.list(`/usuarios/${this.userid}/formularios/ram`).valueChanges();
                  }
                });
                


  }

  viewRam(item:any){
    let modal = this.modalCtrl.create(ViewRamPage, {'item':item});
    modal.present();
  }


  addram(){
    this.navCtrl.push(RamPage);
  }
}
