import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar } from 'ionic-angular';
import { AsistenciadatePage } from '../asistenciadate/asistenciadate';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { ViewasistenciaPage } from '../viewasistencia/viewasistencia';

@IonicPage()
@Component({
  selector: 'page-asistencia',
  templateUrl: 'asistencia.html',
})
export class AsistenciaPage {
  @ViewChild(Navbar) navBar: Navbar;
  asistenciayear: Observable<any[]>;
  userid:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public afDB:AngularFireDatabase,
              public afAuth: AngularFireAuth) {
                this.afAuth.authState.subscribe(user =>{
                  if(user){
                    this.userid = user.uid;
                    console.log(this.userid);
                    this.asistenciayear = afDB.list(`/usuarios/${this.userid}/formularios/asistencia`).valueChanges();
                    console.log(this.asistenciayear);
                  }
                });
  }

  addantro(){
    this.navCtrl.push(AsistenciadatePage);
  }

  viewasistencia(item:any){
    this.navCtrl.push(ViewasistenciaPage, {'item':item});
  }
}
