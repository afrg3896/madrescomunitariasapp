import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';
import { PerfilPage } from '../perfil/perfil';
import { LoginPage } from '../login/login';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rootPage = TabsPage;
  userid:string;
  u:any = [];
  info = [];
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component:any , openTab?:any}>;

  constructor(public navCtrl: NavController, public navParams:NavParams, 
              public afAuth: AngularFireAuth, public afDatabase:AngularFireDatabase) {
    this.pages = [
      {title:'Dashboard',component:TabsPage},
      {title:'Perfil',component:PerfilPage}
    ];

    this.afAuth.authState.subscribe(user =>{
      if(user){
        this.userid = user.uid;
        console.log(this.userid);
        this.getdata(this.userid).then((res:any)=>{
          this.u=res;
          this.u.map(element=>{
            this.info.push(element);
          })
        });
        console.log(this.info);
      }
    });
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

  getdata(uid){
    var promise  = new Promise ((resolve, reject)=>{
      this.afDatabase.database.ref(`usuarios/`).child(uid).child(`info`).once('value', (snapshot) =>{
        let temparr = [];
         temparr.push({
             nombre:snapshot.val().nombre,
             apellido:snapshot.val().apellido,
             imagen:snapshot.val().imagen
           });
          resolve(temparr);
        }).catch((err)=>{
          reject(err);
      })
    })
    return promise;
 }
}

 