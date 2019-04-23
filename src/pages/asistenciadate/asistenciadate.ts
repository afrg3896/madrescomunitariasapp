import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Antroyear } from '../../models/antroyear.model';
import { Antroperiodo } from '../../models/antroperiodo.model';
import { AsistenciamesPage } from '../asistenciames/asistenciames';

@IonicPage()
@Component({
  selector: 'page-asistenciadate',
  templateUrl: 'asistenciadate.html',
})
export class AsistenciadatePage {
  yearx="2019";
  userid:string;
  u:any = [];
  info = [];
  antroyear:Antroyear ={
    year:'',
    key:''
  }
  i=0;
  sw=0;
  pos=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public afAuth: AngularFireAuth, public afDatabase:AngularFireDatabase) {

                this.afAuth.authState.subscribe(user =>{
                  if(user){
                    this.userid = user.uid;
                    console.log(this.userid);
                    this.getData(this.userid).then((res:any)=>{
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


  irasistenciames(){
    if(this.info.length ==0 || this.info === undefined){
      this.create_year(this.yearx);
    }else{
      while(this.i<this.info.length && this.sw==0){
        if(this.info[this.i].year === this.yearx){
          this.sw=1;
          this.pos=this.i;
        }
        this.i=this.i+1;
      }
      this.i=0;
      if(this.sw==1){
        this.sw=0;
        this.navCtrl.push(AsistenciamesPage,{'year':this.info[this.pos].key});
      }else{
        if(this.sw==0){
          this.create_year(this.yearx);
        }
      }

    }
    this.sw=0;
  }

  create_year(year:string){
    this.antroyear.year = year;
    this.afAuth.authState.take(1).subscribe(aut =>{
      this.antroyear.key = this.afDatabase.database.ref('usuarios/' + this.userid + '/formularios/asistencia/').push().key;
      this.afDatabase.object(`usuarios/${this.userid}/formularios/asistencia/${this.antroyear.key}`).set(this.antroyear)
      .then(()=>this.navCtrl.push(AsistenciamesPage,{'year':this.antroyear.key}));
    });
  }

  getData(uid){
    let promise = new Promise((resolve,reject)=>{
      this.afDatabase.database.ref('usuarios/').child(uid).child('/formularios/').child('/asistencia/').once('value', (snapshot) =>{
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
