import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlumnoPage } from './alumno';

@NgModule({
  declarations: [
    AlumnoPage,
  ],
  imports: [
    IonicPageModule.forChild(AlumnoPage),
  ],
})
export class AlumnoPageModule {}
