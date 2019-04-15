import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Navbar } from 'ionic-angular';
import { AntrodatePage } from '../antrodate/antrodate';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ViewantroPage } from '../viewantro/viewantro';
import { FormularioPage } from '../formulario/formulario';


@IonicPage()
@Component({
  selector: 'page-antropometrico',
  templateUrl: 'antropometrico.html',
})
export class AntropometricoPage {
  @ViewChild(Navbar) navBar: Navbar;
  antropoyear: Observable<any[]>;
  userid:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public afDB:AngularFireDatabase,
              public afAuth: AngularFireAuth,public modalCtrl:ModalController) {
                this.afAuth.authState.subscribe(user =>{
                  if(user){
                    this.userid = user.uid;
                    console.log(this.userid);
                    this.antropoyear = afDB.list(`/usuarios/${this.userid}/formularios/antropometrico`).valueChanges();
                    console.log(this.antropoyear);
                  }
                });
  }

  addantro(){
    this.navCtrl.push(AntrodatePage);
  }
  viewantro(item:any){
    this.navCtrl.push(ViewantroPage, {'item':item});
  }
  ionViewDidLoad() {
    this.navBar.backButtonClick = () => {
	    this.navCtrl.setRoot(FormularioPage);
	  }  
  }

}
