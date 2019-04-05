import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { ViewasisweekPage } from '../viewasisweek/viewasisweek';


@IonicPage()
@Component({
  selector: 'page-viewasistencia',
  templateUrl: 'viewasistencia.html',
})
export class ViewasistenciaPage {
  mes:any;
  userid:string;
  asistenciames: Observable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public afDB:AngularFireDatabase,
    public afAuth: AngularFireAuth) {
    this.mes = this.navParams.get('item');
    console.log(this.mes);
    this.afAuth.authState.subscribe(user =>{
      if(user){
        this.userid = user.uid;
        console.log(this.userid);
        this.asistenciames = afDB.list(`/usuarios/${this.userid}/formularios/asistencia/${this.mes.key}/mes/`).valueChanges();
      }
    });
  }

  viewasisweek(item:any){
      this.navCtrl.push(ViewasisweekPage, {'item':item,'year':this.mes.key});
  }

}
