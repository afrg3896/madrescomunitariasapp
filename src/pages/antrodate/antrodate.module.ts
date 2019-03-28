import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AntrodatePage } from './antrodate';

@NgModule({
  declarations: [
    AntrodatePage,
  ],
  imports: [
    IonicPageModule.forChild(AntrodatePage),
  ],
})
export class AntrodatePageModule {}
