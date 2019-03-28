import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewRamPage } from './view-ram';

@NgModule({
  declarations: [
    ViewRamPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewRamPage),
  ],
})
export class ViewRamPageModule {}
