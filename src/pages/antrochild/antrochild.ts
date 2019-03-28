import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,Navbar } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ModalandroPage } from '../modalandro/modalandro';
import { AntropometricoPage } from '../antropometrico/antropometrico';


@IonicPage()
@Component({
  selector: 'page-antrochild',
  templateUrl: 'antrochild.html',
})
export class AntrochildPage {
  @ViewChild(Navbar) navBar: Navbar;
  year:any;
  trimestre:any;
  userid:string;
  u:any = [];
  child: Observable<any[]>;
  antroyearkey:string;
  antroperiodo:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth, 
    public afDatabase:AngularFireDatabase,public modalCtrl:ModalController) {
      this.antroyearkey = this.navParams.get('year');
      this.antroperiodo = this.navParams.get('periodo');
      console.log(this.antroyearkey);
      console.log(this.antroperiodo);
      this.afAuth.authState.subscribe(user =>{
        if(user){
          this.userid = user.uid;
          this.child = afDatabase.list(`/usuarios/${this.userid}/children/`).valueChanges();
        }
      });
  }

  irAntroView(item:any){
    let modal = this.modalCtrl.create(ModalandroPage, {'item':item, 'llaveyear':this.antroyearkey, 'llaveperiodo':this.antroperiodo});
    modal.present();
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = () => {
	    this.navCtrl.push(AntropometricoPage);
	  }  
  }

}
