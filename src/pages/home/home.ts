import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';
import { PerfilPage } from '../perfil/perfil';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rootPage = TabsPage;
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component:any , openTab?:any}>;

  constructor(public navCtrl: NavController, public navParams:NavParams, 
              public afAuth: AngularFireAuth) {
    this.pages = [
      {title:'Dashboard',component:TabsPage},
      {title:'Perfil',component:PerfilPage}
    ];
  }

  openPage(page){
    this.nav.setRoot(page.component, {openTab:page.openTab})
  }

  logout(){
    this.signOut();
    this.nav.setRoot(LoginPage);
  }
  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
}

 