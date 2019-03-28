import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { FormBuilder,FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Antroyear } from '../../models/antroyear.model';
import { AntroperiodoPage } from '../antroperiodo/antroperiodo';


@IonicPage()
@Component({
  selector: 'page-antrodate',
  templateUrl: 'antrodate.html',
})
export class AntrodatePage {
  userid:string;
  myForm: FormGroup;
  antroyear:Antroyear ={
    year:'',
    key:''
  }
  u:any = [];
  info = [];
  yearx:any;
  i=0;
  sw=0;
  pos=0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, public modalCtrl:ModalController,
              public afAuth: AngularFireAuth, public afDatabase:AngularFireDatabase,public alertCtrl: AlertController) {
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

  irantropo(){
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
        this.navCtrl.push(AntroperiodoPage,{'year':this.info[this.pos].key});
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
      this.antroyear.key = this.afDatabase.database.ref('usuarios/' + this.userid + '/formularios/antropometrico/').push().key;
      this.afDatabase.object(`usuarios/${this.userid}/formularios/antropometrico/${this.antroyear.key}`).set(this.antroyear)
      .then(()=>this.navCtrl.push(AntroperiodoPage,{'year':this.antroyear.key}));
    });
  }

  getData(uid){
    let promise = new Promise((resolve,reject)=>{
      this.afDatabase.database.ref('usuarios/').child(uid).child('/formularios/').child('/antropometrico/').once('value', (snapshot) =>{
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
