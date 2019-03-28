import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildviewPage } from './childview';

@NgModule({
  declarations: [
    ChildviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ChildviewPage),
  ],
})
export class ChildviewPageModule {}
