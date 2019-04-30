import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder,FormGroup, Validators  } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Ram } from '../../models/ram.model';
import { AddramPage } from '../addram/addram';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';

@IonicPage()
@Component({
  selector: 'page-modalram',
  templateUrl: 'modalram.html',
})
export class ModalramPage {
  item:any;
  myForm: FormGroup;
  userid:string;
  u:any = [];
  info = [];
  ram:Ram ={
      acudientenombre:'',
      acudienteapellido:'',
      acudientecedula:'',
      acudiendeexpedicion:'',
      childnombre:'',
      childapellido:'',
      childnuip:'',
      madrenombre:'',
      madreapellido:'',
      madrecedula:'',
      servicio:'',
      lugar:'',
      fecha:Date.now(),
      key:''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              public fb: FormBuilder, public afAuth: AngularFireAuth, public afDatabase:AngularFireDatabase,
              public cap:CargaArchivoProvider) {
                this.buildForm();
                this.item = this.navParams.get('item');
                console.log(this.item);
                this.afAuth.authState.subscribe(user =>{
                  if(user){
                    this.userid = user.uid;
                    this.getdata(this.userid).then((res:any)=>{
                      this.u=res;
                      console.log(this.u);
                    });
                  }
                });

  }

  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

  async addRam(){
    this.ram_create(this.item.parentname,this.item.parentlastname,this.item.cedula,this.myForm.value.cedulaexpedida,this.item.nombre,
                    this.item.apellido, this.item.nuip,this.u.nombre, this.u.apellido, this.u.cedula,
                    this.myForm.value.servicio,this.u.municipio,Date.now());
                    
  }

  ram_create(nombrep:string,apellidop:string,cedulap:string,expedicionp:string,nombre:string,apellido:string,nuip:string,
              madrenombre:string,madreapellido:string,madrecedula:string,servicio:string,lugar:string,fecha:number){
                this.ram.acudientenombre = nombrep;
                this.ram.acudienteapellido = apellidop;
                this.ram.acudientecedula = cedulap;
                this.ram.acudiendeexpedicion = expedicionp;
                this.ram.childnombre = nombre;
                this.ram.childapellido = apellido;
                this.ram.childnuip = nuip;
                this.ram.madrenombre = madrenombre;
                this.ram.madreapellido = madreapellido;
                this.ram.madrecedula = madrecedula;
                this.ram.servicio = servicio;
                this.ram.lugar = lugar;
                this.ram.fecha = fecha;
                this.afAuth.authState.take(1).subscribe(aut =>{
                  this.ram.key = this.afDatabase.database.ref('usuarios/' + this.userid + '/formularios/ram').push().key;
                  this.afDatabase.object(`usuarios/${this.userid}/formularios/ram/${this.ram.key}`).set(this.ram)
                  .then(()=>{
                    this.cap.mostrar_toast('Formulario creado exitosamente');
                    this.cerrar_modal()
                  });
                });

  }

  buildForm(){
    this.myForm = this.fb.group({
      cedulaexpedida: ['', [Validators.required]],
      servicio: ['', [Validators.required]],
      aceptacion:["si"],
    });
  }
  
  getdata(uid){
    var promise  = new Promise ((resolve, reject)=>{
      this.afDatabase.database.ref(`usuarios/`).child(uid).child(`info`).once('value', (snapshot) =>{
        let temparr = snapshot.val();
          resolve(temparr);
        }).catch((err)=>{
          reject(err);
      })
    })
    return promise;
 }

}

