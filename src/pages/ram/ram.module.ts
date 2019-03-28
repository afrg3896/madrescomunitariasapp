import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RamPage } from './ram';

@NgModule({
  declarations: [
    RamPage,
  ],
  imports: [
    IonicPageModule.forChild(RamPage),
  ],
})
export class RamPageModule {}
