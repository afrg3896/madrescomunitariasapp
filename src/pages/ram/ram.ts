import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ModalramPage } from '../modalram/modalram';

@IonicPage()
@Component({
  selector: 'page-ram',
  templateUrl: 'ram.html',
})
export class RamPage {
  userid:string;
  u:any = [];
  child: Observable<any[]>;
  constructor(public navCtrl: NavController,
              public afAuth: AngularFireAuth, 
              public afDatabase:AngularFireDatabase,public modalCtrl:ModalController) {

                this.afAuth.authState.subscribe(user =>{
                  if(user){
                    this.userid = user.uid;
                    console.log(this.userid);
                    this.child = afDatabase.list(`/usuarios/${this.userid}/children/`).valueChanges();
                  }
                });
              

  }
  irRamView(item:any){
    let modal = this.modalCtrl.create(ModalramPage, {'item':item});
    modal.present();
  }


}
