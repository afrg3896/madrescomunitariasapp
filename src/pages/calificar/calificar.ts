import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { CargaArchivoProvider } from '../../providers/carga-archivo/carga-archivo';

@IonicPage()
@Component({
  selector: 'page-calificar',
  templateUrl: 'calificar.html',
})
export class CalificarPage {
  claridad:number = 1;
  facilidad:number = 1;
  costo:number = 1;
  duracion:number = 1;
  aceptacion:number = 1;
  agrado:number = 1;
  myFormGrade: FormGroup;
  item:any;
  rating:number = 0;
  nota:number=1;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public formBuilder: FormBuilder,
              private viewCtrl: ViewController,public afAuth: AngularFireAuth, public afDB:AngularFireDatabase,
              public _cap:CargaArchivoProvider) {
                this.item = this.navParams.get('post');
                console.log(this.item);
                
  }
  onChangeTrain() {
    let calificac = (this.claridad + this.facilidad +this.costo + this.duracion + this.aceptacion + this.agrado)/6;
    this.nota = calificac;
  }

  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

  calificar_modal(){
    let valorfirebase = this.item.rating;
    console.log(valorfirebase)
    let calificacion = (this.claridad + this.facilidad +this.costo + this.duracion + this.aceptacion + this.agrado)/6;
    if(valorfirebase == 0){
      this.rating = calificacion;
      console.log(this.rating);
    }else{
      this.rating = (valorfirebase+ calificacion)/2;
      console.log(this.rating);
    }
    if(this.item.tipo === 'imagen'){
      this.afDB.object(`/post/${this.item.key}`).update({rating:this.rating});
    }

    if(this.item.tipo === 'video'){
      this.afDB.object(`/videos/${this.item.key}`).update({rating:this.rating});
    }

    if(this.item.tipo === 'youtube'){
      this.afDB.object(`/videos/${this.item.key}`).update({rating:this.rating});
    }

    this.cerrar_modal();
  }
}
