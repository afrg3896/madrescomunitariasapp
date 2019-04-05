import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ViewasisdiaPage } from '../viewasisdia/viewasisdia';

@IonicPage()
@Component({
  selector: 'page-viewasisweek',
  templateUrl: 'viewasisweek.html',
})
export class ViewasisweekPage {
  mes:any;
  year:any;
  userid:string;
  asistenciaweek: Observable<any[]>;
  asistenciadia: Observable<any[]>;
  week:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB:AngularFireDatabase,
    public afAuth: AngularFireAuth) {
    this.mes = this.navParams.get('item');
    this.year = this.navParams.get('year');
    console.log(this.mes);
    console.log(this.year);
    this.afAuth.authState.subscribe(user =>{
      if(user){
        this.userid = user.uid;
        console.log(this.userid);
        this.asistenciaweek = afDB.list(`/usuarios/${this.userid}/formularios/asistencia/${this.year}/mes/${this.mes.key}/semana/`).valueChanges();
      }
    });
  }

  onSelectChange(selectedValue:any){
    console.log(selectedValue);
    this.asistenciadia = this.afDB.list(`/usuarios/${this.userid}/formularios/asistencia/${this.year}/mes/${this.mes.key}/semana/${selectedValue}/dias/`).valueChanges();

  }

  viewasisdia(item:any){
    this.navCtrl.push(ViewasisdiaPage, {'item':item,'year':this.year, 'mes':this.mes.key, 'semana':this.week});
  }

}
