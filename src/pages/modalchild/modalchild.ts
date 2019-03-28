import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Child } from '../../models/childmodel';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AlumnoPage } from '../alumno/alumno';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-modalchild',
  templateUrl: 'modalchild.html',
})
export class ModalchildPage {
  userid:string;
  myFormChild: FormGroup;
  child: Child ={
    nombre:'',
    apellido:'',
    nuip:'',
    fecha:'',
    edad:'',
    genero:'',
    info:'',
    direccion:'',
    imagen:'',
    parentname:'',
    parentlastname:'',
    cedula:'',
    parentage:'',
    parentcivil:'',
    parentesco:'',
    uid:''

  };
  constructor(public navCtrl: NavController,
              public afAuth: AngularFireAuth, 
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private afDatabase:AngularFireDatabase, 
              private viewCtrl: ViewController, 
              public formBuilder: FormBuilder) {
                this.buildForm();
                this.afAuth.authState.subscribe(user =>{
                    this.userid = user.uid;
                  });
    
  }  

  cerrar_modal(){
    this.viewCtrl.dismiss();
  }
  async addChild(){
    this.createChildProfileFirebase(this.myFormChild.value.name,this.myFormChild.value.lastname,this.myFormChild.value.nuip,
                                    this.myFormChild.value.myDate ,this.myFormChild.value.age,this.myFormChild.value.gender,
                                    this.myFormChild.value.info,this.myFormChild.value.address,'',
                                    this.myFormChild.value.parentname,this.myFormChild.value.parentlastname,
                                    this.myFormChild.value.cedula,this.myFormChild.value.parentage,
                                    this.myFormChild.value.parentcivil,
                                    this.myFormChild.value.parentesco);
    this.cerrar_modal();
  }

  createChildProfileFirebase( nombre: string,apellido:string,nuip:string,fecha:string,edad:string,genero:string,info:string,direccion:string,imagen:string,
                      parentname:string,parentlastname:string,cedula:string,parentage:string,parentcivil:string,parentesco:string
                      ){

                        this.child.nombre= nombre;
                        this.child.apellido = apellido;
                        this.child.nuip = nuip;
                        this.child.fecha = fecha;
                        this.child.edad = edad;
                        this.child.genero = genero;
                        this.child.direccion = direccion;
                        this.child.info = info;
                        this.child.imagen = imagen;
                        this.child.parentname = parentname;
                        this.child.parentlastname = parentlastname;
                        this.child.cedula = cedula;
                        this.child.parentage = parentage;
                        this.child.parentcivil = parentcivil;
                        this.child.parentesco = parentesco;
                        this.afAuth.authState.take(1).subscribe(aut =>{
                          this.child.uid = this.afDatabase.database.ref('usuarios/' + this.userid + '/children/').push().key;
                          this.afDatabase.object(`usuarios/${this.userid}/children/${this.child.uid}`).set(this.child)
                          .then(()=>this.cerrar_modal());
                        });

  }

  buildForm(){
    this.myFormChild = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-ZÁÉÍÓÚñáéíóúÑ\s]{2,16}$/)])],
      lastname: ['', Validators.compose([Validators.required,Validators.minLength(2), Validators.pattern(/^[a-zA-ZÁÉÍÓÚñáéíóúÑ\s]{2,16}$/) ])],
      nuip:['',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(12)])],
      address: ['', Validators.required],
      myDate:[''],
      age: ['', Validators.compose([Validators.required,Validators.maxLength(1)])],
      gender: ["masculino"],
      info:[''],
      parentname: ['', Validators.compose([Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-ZÁÉÍÓÚñáéíóúÑ\s]{2,16}$/)])],
      parentlastname: ['', Validators.compose([Validators.required,Validators.minLength(2), Validators.pattern(/^[a-zA-ZÁÉÍÓÚñáéíóúÑ\s]{2,16}$/) ])],
      cedula:['', Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(10)])],
      parentage: ['', Validators.compose([Validators.required,Validators.minLength(2),Validators.min(17),Validators.maxLength(2)])],
      parentcivil:["soltero"],
      parentesco:["madre"]
      
    });
  }
}
