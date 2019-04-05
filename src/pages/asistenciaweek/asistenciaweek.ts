import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar  } from 'ionic-angular';
import { AsistenciaPage } from '../asistencia/asistencia';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Antroperiodo } from '../../models/antroperiodo.model';
import { Asistencias } from '../../models/asistencia.model';
import { AsistenciadiaPage } from '../asistenciadia/asistenciadia';


@IonicPage()
@Component({
  selector: 'page-asistenciaweek',
  templateUrl: 'asistenciaweek.html',
})
export class AsistenciaweekPage {
  @ViewChild(Navbar) navBar: Navbar;
  semana="Primera";
  asistenciayearkey:string;
  asistenciameskey:string;
  asistencia:Antroperiodo={
    periodo:'',
    key:''
  }
  userid:string;
  u:any = [];
  info = [];
  i=0;
  sw=0;
  pos=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth,
              public afDatabase:AngularFireDatabase) {
              this.asistenciayearkey = this.navParams.get('year');
              this.asistenciameskey = this.navParams.get('mes');
              this.afAuth.authState.subscribe(user =>{
                if(user){
                  this.userid = user.uid;
                  this.getData(this.userid,this.asistenciayearkey,this.asistenciameskey).then((res:any)=>{
                    this.u=res;
                    this.u.map(element=>{
                      this.info.push(element);
                    })
                  });
                  console.log(this.info);
                }
              });

  }
  onSelectChange(selectedValue:any){
  }
  ionViewDidLoad() {
    this.navBar.backButtonClick = () => {
	    this.navCtrl.push(AsistenciaPage);
	  }  
  }

  irasistenciadia(){

    if(this.info.length ==0 || this.info === undefined){
      this.create_periodo(this.semana);
    }else{
      while(this.i<this.info.length && this.sw==0){
        if(this.info[this.i].periodo === this.semana){
          this.sw=1;
          this.pos=this.i;
        }
        this.i=this.i+1;
      }
      this.i=0;
      if(this.sw==1){
        this.sw=0;
        this.navCtrl.push(AsistenciadiaPage,{'year':this.asistenciayearkey,'mes':this.asistenciameskey, 'semana':this.info[this.pos].key});
      }else{
        if(this.sw==0){
          this.create_periodo(this.semana);
        }
      }

    }
    this.sw=0;


  }

  
  create_periodo(periodo:string){
    this.asistencia.periodo = periodo;
    this.afAuth.authState.take(1).subscribe(aut =>{
      this.asistencia.key = this.afDatabase.database.ref('usuarios/' + this.userid + '/formularios/asistencia/' + this.asistenciayearkey + '/mes/' + this.asistenciameskey + '/semana/').push().key;
      this.afDatabase.object(`usuarios/${this.userid}/formularios/asistencia/${this.asistenciayearkey}/mes/${this.asistenciameskey}/semana/${this.asistencia.key}/`).set(this.asistencia)
      .then(()=>this.navCtrl.push(AsistenciadiaPage,{'year':this.asistenciayearkey, 'mes':this.asistenciameskey, 'semana':this.asistencia.key}));
    });
  }

  getData(uid,llavey,llavem){
    let promise = new Promise((resolve,reject)=>{
      this.afDatabase.database.ref('usuarios/').child(uid).child('/formularios/').child('/asistencia/').child(llavey).child('/mes/')
                                              .child(llavem).child('/semana/').once('value', (snapshot) =>{
        let data = snapshot.val();
        let temparr =[];
        for (var key in data){
          temparr.push(data[key]);
        }
          resolve(temparr);
        }).catch((err)=>{
          reject(err);
        })
    })
  return promise;
  }
}
