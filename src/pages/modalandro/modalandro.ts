import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Antropometrico } from '../../models/antrometrico.model';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-modalandro',
  templateUrl: 'modalandro.html',
})
export class ModalandroPage {
  llaveyear:any;
  llaveperiodo:any;
  child:any;
  myForm: FormGroup;
  userid:string;
  antrokey:string;
  antropometrico: Antropometrico ={
    nuip:'',
    nombre:'',
    apellido:'',
    genero:'',
    nacimiento:'',
    fechaservicio:'',
    fechatoma:'',
    peso:0,
    talla:0,
    fechaperimetro:'',
    perimetro:0,
    key:'',
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, public viewCtrl:ViewController,
              public afAuth: AngularFireAuth, public afDatabase:AngularFireDatabase) {
              this.llaveperiodo= this.navParams.get('llaveperiodo');
              this.llaveyear = this.navParams.get('llaveyear');
              this.child = this.navParams.get('item');
              this.buildForm();
              this.afAuth.authState.subscribe(user =>{
                this.userid = user.uid;
              });
              console.log(this.llaveyear);
              console.log(this.child);
              console.log(this.llaveperiodo);

  }

  buildForm(){
    this.myForm = this.fb.group({
      fechaservicio:[''],
      fechatoma:[''],
      peso:['',Validators.compose([Validators.required,Validators.pattern(/^(\d{1,2})(\.\d{1,2})?$/),Validators.min(3.4), Validators.max(30)])],
      talla:['',Validators.compose([Validators.required,Validators.pattern(/^(\d{2,3})(\.\d{1,2})?$/),Validators.min(50), Validators.max(130)])],
      fechabraquial:[''],
      perimetrobra:['',Validators.compose([Validators.required,Validators.min(3.4), Validators.max(30)])],
    });
  }

  guardar(){
    this.guardar_firebase_andro(this.child.nuip,this.child.nombre,this.child.apellido,this.child.genero,this.child.fecha,
                                this.myForm.value.fechaservicio,this.myForm.value.fechatoma,this.myForm.value.peso,
                                this.myForm.value.talla,this.myForm.value.fechabraquial,this.myForm.value.perimetrobra);
  }
  guardar_firebase_andro(nuip:string,nombre:string,apellido:string,genero:string,fechanacimiento:string,fechaservi:string,
                        fechatoma:string,peso:number,talla:number,fechaperimetro:string,perimetro:number){
                          this.antropometrico.nuip = nuip;
                          this.antropometrico.nombre = nombre;  
                          this.antropometrico.apellido = apellido;
                          this.antropometrico.genero = genero;
                          this.antropometrico.nacimiento = fechanacimiento;
                          this.antropometrico.fechaservicio = fechaservi;
                          this.antropometrico.fechatoma = fechatoma;
                          this.antropometrico.peso = peso;
                          this.antropometrico.talla = talla;
                          this.antropometrico.fechaperimetro = fechaperimetro;
                          this.antropometrico.perimetro = perimetro;
                          this.afAuth.authState.take(1).subscribe(aut =>{
                            this.antropometrico.key = this.afDatabase.database.ref('/usuarios' + this.userid + '/formularios/antropometrico/'+ this.llaveyear + 'periodo' + this.llaveperiodo + '/tomas/').push().key;
                            this.afDatabase.object(`usuarios/${this.userid}/formularios/antropometrico/${this.llaveyear}/periodo/${this.llaveperiodo}/tomas/${this.antropometrico.key}`).set(this.antropometrico)
                            .then(()=>this.cerrar_modal());
                          });        

  }
  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

}
