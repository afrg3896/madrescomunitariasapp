import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-viewasisdia',
  templateUrl: 'viewasisdia.html',
})
export class ViewasisdiaPage {
  dia:any;
  semana:any;
  mes:any;
  year:any;
  userid:string;
  asistenciachild: Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB:AngularFireDatabase,
    public afAuth: AngularFireAuth) {
    this.dia= this.navParams.get('item');
    this.semana = this.navParams.get('semana');
    this.mes = this.navParams.get('mes');
    this.year = this.navParams.get('year');
    console.log(this.dia.key);
    console.log(this.semana);
    console.log(this.mes);
    console.log(this.year);

    this.afAuth.authState.subscribe(user =>{
      if(user){
        this.userid = user.uid;
        this.asistenciachild = this.afDB.list(`/usuarios/${this.userid}/formularios/asistencia/${this.year}/mes/${this.mes}/semana/${this.semana}/dias/${this.dia.key}/lista/`).valueChanges();
      }
    });
  }

}
