import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AsistenciaChild } from '../../models/asistenciachild.model';
import { Antroperiodo } from '../../models/antroperiodo.model';

@IonicPage()
@Component({
  selector: 'page-asistenciadia',
  templateUrl: 'asistenciadia.html',
})
export class AsistenciadiaPage {
  asistenciayearkey:string;
  asistenciameskey:string;
  asistenciasemanakey:string;
  dia="Lunes";
  u:any = [];
  info = [];
  userid:string;
  presente:any[] = [];
  asiste:number =0;
  activar:boolean=false;
  asis:AsistenciaChild ={
    nuip:'',
    nombre:'',
    apellido: '',
    asiste:'',
    motivo:'',
    key:''
  }
  dias: Antroperiodo ={
    periodo:'',
    key:''
  }
  motivo:any[] = [];
  radio:any[] =[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
              public afAuth: AngularFireAuth, public afDatabase:AngularFireDatabase) {
    this.asistenciayearkey = this.navParams.get('year');
    this.asistenciameskey = this.navParams.get('mes');
    this.asistenciasemanakey = this.navParams.get('semana');
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
      }

    });


  }

  reviewChange(e:any,i:any){
    
  }

  updated(value,i:any,item:any,motivo:any){
    this.asiste = this.info.length;
    let obj={
      nuip: item.nuip,
      nombre:item.nombre,
      apellido:item.apellido,
      asistio:value,
      motivo:motivo
    }
    this.presente.splice(i,1,obj);
    
    console.log(this.presente);
}

  crear_asistencia(){
    this.dias.periodo = this.dia;
    this.afAuth.authState.take(1).subscribe(aut =>{
      this.dias.key = this.afDatabase.database.ref('usuarios/' + this.userid + '/formularios/asistencia/' + this.asistenciayearkey + '/mes/'+
                      this.asistenciameskey + '/semana/' + this.asistenciasemanakey + '/dias/').push().key;
      this.afDatabase.object(`usuarios/${this.userid}/formularios/asistencia/${this.asistenciayearkey}/mes/${this.asistenciameskey}/semana/${this.asistenciasemanakey}/dias/${this.dias.key}`).set(this.dias)
      .then(()=>{
        for(let i=0; i<this.presente.length;i++){
          let a ={
          nuip : this.presente[i].nuip,
          nombre :this.presente[i].nombre,
          apellido: this.presente[i].apellido,
          asiste : this.presente[i].asistio,
          motivo: this.motivo[i],
          key:''
          }
          if(this.motivo[i] === undefined || this.motivo.length ==0){
            a.motivo = '';
          }

          this.afAuth.authState.take(1).subscribe(aut =>{
            a.key = this.afDatabase.database.ref('usuarios/' + this.userid + '/formularios/asistencia/' + this.asistenciayearkey + '/mes/'+
                            this.asistenciameskey + '/semana/' + this.asistenciasemanakey + '/dias/' + this.dias.key + '/lista/').push().key;
            this.afDatabase.object(`usuarios/${this.userid}/formularios/asistencia/${this.asistenciayearkey}/mes/${this.asistenciameskey}/semana/${this.asistenciasemanakey}/dias/${this.dias.key}/lista/${a.key}`).set(a)
            .then();
        });
        }
      });
    });
  }


  getData(uid){
    let promise = new Promise((resolve,reject)=>{
      this.afDatabase.database.ref('usuarios/').child(uid).child(`children`).once('value', (snapshot) =>{
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
