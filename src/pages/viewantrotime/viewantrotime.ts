import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-viewantrotime',
  templateUrl: 'viewantrotime.html',
})
export class ViewantrotimePage {
  periodo:any;
  userid:string;
  year:string;
  child:Observable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl: ViewController,
              public afDB:AngularFireDatabase, public afAuth: AngularFireAuth) {
              this.periodo = this.navParams.get('item');
              console.log(this.periodo.key);
              this.year = this.navParams.get('year');
              console.log(this.year);
              this.afAuth.authState.subscribe(user =>{
                if(user){
                  this.userid = user.uid;
                  this.child = afDB.list(`/usuarios/${this.userid}/formularios/antropometrico/${this.year}/periodo/${this.periodo.key}/tomas`).valueChanges();
                  console.log(this.child);
                }
              });
  }

  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

}
