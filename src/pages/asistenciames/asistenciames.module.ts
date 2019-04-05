import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AsistenciamesPage } from './asistenciames';

@NgModule({
  declarations: [
    AsistenciamesPage,
  ],
  imports: [
    IonicPageModule.forChild(AsistenciamesPage),
  ],
})
export class AsistenciamesPageModule {}
