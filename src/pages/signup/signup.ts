import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, 
  Loading, 
  AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import { Usuario } from '../../models/usuario.model';
import { AngularFireDatabase } from '@angular/fire/database';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  myForm: FormGroup;
  usuario:Usuario = {
    email:'',
    password:'',
    nombre:'',
    apellido: '',
    cedula:'',
    region:'',
    municipio:'',
    direccion:'',
    celular:'',
    imagen:''
  };
  public loading:Loading;
  constructor(public navCtrl: NavController,
              public formBuilder: FormBuilder,
              public afAuth: AngularFireAuth, 
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private afDatabase:AngularFireDatabase) {
                this.buildForm();

  }


  async signup(){
    this.afAuth.auth.createUserWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password)
    .then(
      res => {
        this.navCtrl.setRoot(LoginPage);
        setTimeout(()=>{
          this.createProfileFirebase(this.myForm.value.email,this.myForm.value.password,this.myForm.value.name,this.myForm.value.lastname,
                                     this.myForm.value.cedula,this.myForm.value.region,this.myForm.value.municipio,this.myForm.value.address,
                                     this.myForm.value.cel,'');
        },2000);
        let alert = this.alertCtrl.create({
          message:'Creación del Usuario exitosa!',
          buttons:['OK']
        });
        alert.present();
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });
     
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    
  }
  createProfileFirebase(email:string, password:string,nombre:string,apellido: string,cedula:string,region:string,
                        municipio:string,direccion:string,celular:string, imagen:string){
    this.usuario.email = email;
    this.usuario.password = password;
    this.usuario.nombre= nombre;
    this.usuario.apellido = apellido;
    this.usuario.cedula = cedula;
    this.usuario.region = region;
    this.usuario.municipio = municipio;
    this.usuario.direccion = direccion;
    this.usuario.celular = celular;
    this.usuario.imagen = imagen;
    this.afAuth.authState.take(1).subscribe(auth =>{
      this.afDatabase.object(`usuarios/${auth.uid}/info`).set(this.usuario)//Guardar base de datos uid del usuario
      .then(()=>this.navCtrl.setRoot(LoginPage));
    });
  }

  buildForm(){
    this.myForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email,Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)]) ],
      password: ['',Validators.compose([Validators.required,Validators.minLength(6), Validators.pattern(/^[a-z0-9_-]{6,18}$/)])],
      name: ['', Validators.compose([Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-ZÁÉÍÓÚñáéíóúÑ\s]{2,16}$/)])],
      lastname: ['', Validators.compose([Validators.required,Validators.minLength(2), Validators.pattern(/^[a-zA-ZÁÉÍÓÚñáéíóúÑ\s]{2,16}$/) ])],
      cedula:['', Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(10)])],
      region: ["amazonia"],
      municipio:['',Validators.compose([Validators.required,Validators.minLength(3)])],
      address: ['', Validators.required],
      cel: ['', Validators.compose([Validators.required,Validators.minLength(7),Validators.maxLength(10)])]
    });
  }
}
