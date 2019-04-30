import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//Paginas-Componentes
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { TabsPage } from '../pages/tabs/tabs';
import { ContenidoPage } from '../pages/contenido/contenido';
import { AlumnoPage } from '../pages/alumno/alumno';
import { FormularioPage } from '../pages/formulario/formulario';
import { ModalchildPage } from '../pages/modalchild/modalchild';


//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PerfilPage } from '../pages/perfil/perfil';
import { PrincipalPage } from '../pages/principal/principal';
import { ChildviewPage } from '../pages/childview/childview';
import { SubirimagenPage } from '../pages/subirimagen/subirimagen';

import { SubirvideoPage } from '../pages/subirvideo/subirvideo';
//Pipes
import {PipesModule} from '../pipes/pipes.module';
//Plugins
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MediaCapture } from '@ionic-native/media-capture';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
//Provider
import { CargaArchivoProvider } from '../providers/carga-archivo/carga-archivo';
import { CalificarPage } from '../pages/calificar/calificar';
import { ImageviewPage } from '../pages/imageview/imageview';
import { RamPage } from '../pages/ram/ram';
import { AddramPage } from '../pages/addram/addram';
import { ModalramPage } from '../pages/modalram/modalram';
import { ViewRamPage } from '../pages/view-ram/view-ram';
import { VideoviewPage } from '../pages/videoview/videoview';
import { AntropometricoPage } from '../pages/antropometrico/antropometrico';
import { AntrodatePage } from '../pages/antrodate/antrodate';
import { AntrochildPage } from '../pages/antrochild/antrochild';
import { ModalandroPage } from '../pages/modalandro/modalandro';
import { ViewantroPage } from '../pages/viewantro/viewantro';
import { ViewantrotimePage } from '../pages/viewantrotime/viewantrotime';
import { AntroperiodoPage } from '../pages/antroperiodo/antroperiodo';
import { AsistenciaPage } from '../pages/asistencia/asistencia';
import { AsistenciadatePage } from '../pages/asistenciadate/asistenciadate';
import { AsistenciamesPage } from '../pages/asistenciames/asistenciames';
import { AsistenciaweekPage } from '../pages/asistenciaweek/asistenciaweek';
import { AsistenciadiaPage } from '../pages/asistenciadia/asistenciadia';
import { ViewasistenciaPage } from '../pages/viewasistencia/viewasistencia';
import { ViewasisweekPage } from '../pages/viewasisweek/viewasisweek';
import { ViewasisdiaPage } from '../pages/viewasisdia/viewasisdia';
import { EditperfilPage } from '../pages/editperfil/editperfil';
import { EditchildPage } from '../pages/editchild/editchild';



export const firebaseConfig = {
  apiKey: "AIzaSyAg-PB4Z7PPhYw726mN3Ph5-6WvoUa6IlU",
  authDomain: "madres-app.firebaseapp.com",
  databaseURL: "https://madres-app.firebaseio.com",
  projectId: "madres-app",
  storageBucket: "madres-app.appspot.com",
  messagingSenderId: "110556819857"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    TabsPage,
    ContenidoPage,
    AlumnoPage,
    FormularioPage,
    PerfilPage,
    PrincipalPage,
    ModalchildPage,
    ChildviewPage,
    SubirimagenPage,
    CalificarPage,
    ImageviewPage,
    SubirvideoPage,
    AddramPage,
    RamPage,
    ModalramPage,
    ViewRamPage,
    VideoviewPage,
    AntropometricoPage,
    AntrodatePage,
    AntroperiodoPage,
    AntrochildPage,
    ModalandroPage,
    ViewantroPage,
    ViewantrotimePage,
    AsistenciaPage,
    AsistenciadatePage,
    AsistenciamesPage,
    AsistenciaweekPage,
    AsistenciadiaPage,
    ViewasistenciaPage,
    ViewasisweekPage,
    ViewasisdiaPage,
    EditperfilPage,
    EditchildPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: 'Atras'
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    TabsPage,
    ContenidoPage,
    FormularioPage,
    AlumnoPage,
    PerfilPage,
    PrincipalPage,
    ModalchildPage,
    ChildviewPage,
    SubirimagenPage,
    CalificarPage,
    ImageviewPage,
    SubirvideoPage,
    AddramPage,
    RamPage,
    ModalramPage,
    ViewRamPage,
    VideoviewPage,
    AntropometricoPage,
    AntrodatePage,
    AntroperiodoPage,
    AntrochildPage,
    ModalandroPage,
    ViewantroPage,
    ViewantrotimePage,
    AsistenciaPage,
    AsistenciadatePage,
    AsistenciamesPage,
    AsistenciaweekPage,
    AsistenciadiaPage,
    ViewasistenciaPage,
    ViewasisweekPage,
    ViewasisdiaPage,
    EditperfilPage,
    EditchildPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Camera,
    ImagePicker,
    MediaCapture,
    SocialSharing,
    SpinnerDialog,
    File,
    FileOpener,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CargaArchivoProvider
  ]
})
export class AppModule {}
