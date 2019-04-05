import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar } from 'ionic-angular';
import { Antroperiodo } from '../../models/antroperiodo.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AsistenciaPage } from '../asistencia/asistencia';
import { AsistenciaweekPage } from '../asistenciaweek/asistenciaweek';

@IonicPage()
@Component({
  selector: 'page-asistenciames',
  templateUrl: 'asistenciames.html',
})
export class AsistenciamesPage {
  @ViewChild(Navbar) navBar: Navbar;
  asistenciayearkey:string;
  periodox="Enero";
  userid:string;
  antroperiodo:Antroperiodo={
    periodo:'',
    key:''
  }
  u:any = [];
  info = [];
  i=0;
  sw=0;
  pos=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth,
              public afDatabase:AngularFireDatabase) {
                this.asistenciayearkey = this.navParams.get('year');
                console.log(this.asistenciayearkey);
                this.afAuth.authState.subscribe(user =>{
                  if(user){
                    this.userid = user.uid;
                    this.getData(this.userid,this.asistenciayearkey).then((res:any)=>{
                      this.u=res;
                      this.u.map(element=>{
                        this.info.push(element);
                      })
                    });
                    console.log(this.info);
                  }
                });
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = () => {
	    this.navCtrl.push(AsistenciaPage);
	  }  
  }
  onSelectChange(selectedValue:any){
  }
  
  irasistenciaweek(){
    if(this.info.length ==0 || this.info === undefined){
      this.create_periodo(this.periodox);
    }else{
      while(this.i<this.info.length && this.sw==0){
        if(this.info[this.i].periodo === this.periodox){
          this.sw=1;
          this.pos=this.i;
        }
        this.i=this.i+1;
      }
      this.i=0;
      if(this.sw==1){
        this.sw=0;
        this.navCtrl.push(AsistenciaweekPage,{'year':this.asistenciayearkey,'mes':this.info[this.pos].key});
      }else{
        if(this.sw==0){
          this.create_periodo(this.periodox);
        }
      }

    }
    this.sw=0;


  }

  create_periodo(periodo:string){
    this.antroperiodo.periodo = periodo;
    this.afAuth.authState.take(1).subscribe(aut =>{
      this.antroperiodo.key = this.afDatabase.database.ref('usuarios/' + this.userid + '/formularios/asistencia/' + this.asistenciayearkey + '/mes/').push().key;
      this.afDatabase.object(`usuarios/${this.userid}/formularios/asistencia/${this.asistenciayearkey}/mes/${this.antroperiodo.key}`).set(this.antroperiodo)
      .then(()=>this.navCtrl.push(AsistenciaweekPage,{'year':this.asistenciayearkey, 'mes':this.antroperiodo.key}));
    });
  }

  getData(uid,llavey){
    let promise = new Promise((resolve,reject)=>{
      this.afDatabase.database.ref('usuarios/').child(uid).child('/formularios/').child('/asistencia/').child(llavey).child('/mes/').once('value', (snapshot) =>{
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
