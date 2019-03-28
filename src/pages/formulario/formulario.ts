import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddramPage } from '../addram/addram';
import { AntropometricoPage } from '../antropometrico/antropometrico';

@IonicPage()
@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ir_ram(){
    this.navCtrl.push(AddramPage);
  }
  ir_antropage(){
    this.navCtrl.push(AntropometricoPage);
  }

}
