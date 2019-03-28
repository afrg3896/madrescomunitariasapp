import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoviewPage } from './videoview';

@NgModule({
  declarations: [
    VideoviewPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoviewPage),
  ],
})
export class VideoviewPageModule {}
