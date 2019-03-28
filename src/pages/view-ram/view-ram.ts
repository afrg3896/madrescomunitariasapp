import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-view-ram',
  templateUrl: 'view-ram.html',
})
export class ViewRamPage {
  item:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.item = this.navParams.get('item');
    console.log(this.item);
  }

  cerrar_modal(){
    this.viewCtrl.dismiss();
  }

}
