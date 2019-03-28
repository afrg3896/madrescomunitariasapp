import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContenidoPage } from '../contenido/contenido';
import { AlumnoPage } from '../alumno/alumno';
import { FormularioPage } from '../formulario/formulario';
import { MenuController } from 'ionic-angular';
import { PrincipalPage } from '../principal/principal';
@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1: any = PrincipalPage;
  tab2: any = FormularioPage;
  tab3: any = AlumnoPage;
  tab4: any = ContenidoPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController) {
  }

}
