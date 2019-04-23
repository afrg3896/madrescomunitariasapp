import { Injectable } from '@angular/core';

import { ToastController, LoadingController } from 'ionic-angular';


import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from 'firebase';

import 'rxjs/add/operator/map';
import { MediaCapture, MediaFile } from '@ionic-native/media-capture';
import { File } from '@ionic-native/file';

@Injectable()
export class CargaArchivoProvider {
  imagenes: ArchivoSubir[] = [];
  lastkey: string = '';
  constructor( public toastCtrl: ToastController,
               public afDB: AngularFireDatabase,private mediaCap: MediaCapture, public file:File,
               public loadingCtrl: LoadingController) {

  }

  //Firebase Storage
  cargar_imagen_firebase(archivo:ArchivoSubir){
    let promesa = new Promise((resolve,reject)=>{
      this.mostrar_toast('Subiendo imagen...');
      let storeRef = firebase.storage().ref();
      let nombreArchivo:string = new Date().valueOf().toString();
      let uploadTask: firebase.storage.UploadTask =
          storeRef.child(`img/${nombreArchivo}`)
                  .putString(archivo.fuente, 'base64', {contentType:'image/jpeg'});
          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,

            () =>{},
            (error) =>{
              
              console.log('Error al subir ', JSON.stringify(error));
              this.mostrar_toast(JSON.stringify(error));
              reject();
            },
            ()=>{
              
              this.mostrar_toast('imagen cargada correctamente');
              uploadTask.snapshot.ref.getDownloadURL().then(urlImage => {
                this.cargar_imagenes(archivo.titulo, urlImage,archivo.nombre,archivo.apellido,archivo.rating, nombreArchivo, archivo.tipo,archivo.fecha);
                 this.mostrar_toast('URL:' + urlImage);
                }).catch((error) => {
                         console.log(error);
                });
              resolve();
            }
             
            );
    });

    return promesa;
  }

  cargar_video_firebase(archivo:ArchivoSubir){
    let promesa = new Promise((resolve,reject)=>{
      this.mediaCap.captureVideo({ limit: 1, duration: 600 }).then((data: MediaFile[]) => {
        let loading = this.loadingCtrl.create({
          content: 'Subiendo Video...'
        });
      
        loading.present();
      
        let capturedVid = data[0];
        let localVideoPath = capturedVid.fullPath;
        let directoryPath = localVideoPath.substr(0, localVideoPath.lastIndexOf('/'));
        let fileName = localVideoPath.substr(localVideoPath.lastIndexOf('/') + 1); 
        this.file.readAsArrayBuffer(directoryPath, fileName).then((result) => {
          console.log(result);
          let blob = new Blob([result], { type: "video/mp4" });
          let storeRef = firebase.storage().ref();
          let nombreArchivo:string = new Date().valueOf().toString();
          let uploadTask: firebase.storage.UploadTask =
              storeRef.child(`video/${nombreArchivo}`)
                      .put(blob);
              uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    
                () =>{},
                (error) =>{
                  console.log('Error al subir ', JSON.stringify(error));
                  this.mostrar_toast(JSON.stringify(error));
                  reject();
                },
                ()=>{
                  loading.dismiss();
                  this.mostrar_toast('Video cargado correctamente');
                  uploadTask.snapshot.ref.getDownloadURL().then(urlVideo => {
                    this.cargar_videos(archivo.titulo, urlVideo,archivo.nombre,archivo.apellido,archivo.rating, nombreArchivo,archivo.tipo,archivo.fecha);
                    }).catch((error) => {
                             console.log(error);
                    });
                  resolve();
                }
                 
                );
        });
      });
    });
    return promesa;
  }

  cargar_imgchild_firebase(imagen:string,userid:string,id:any){
    let promesa = new Promise((resolve,reject)=>{
      this.mostrar_toast('Subiendo imagen...');
      let storeRef = firebase.storage().ref();
      let nombreArchivo:string = new Date().valueOf().toString();
      let uploadTask: firebase.storage.UploadTask =
          storeRef.child(`child/${nombreArchivo}`)
                  .putString(imagen, 'base64', {contentType:'image/jpeg'});
          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,

            () =>{},
            (error) =>{
              
              console.log('Error al subir ', JSON.stringify(error));
              this.mostrar_toast(JSON.stringify(error));
              reject();
            },
            ()=>{
              
              this.mostrar_toast('imagen cargada correctamente');
              uploadTask.snapshot.ref.getDownloadURL().then(urlImage => {
                this.cargar_img_child(urlImage,userid,id);
                 this.mostrar_toast('URL:' + urlImage);
                }).catch((error) => {
                         console.log(error);
                });
              resolve();
            }
             
            );
    });

    return promesa;
  }
  cargar_imguser_firebase(imagen:string,userid:string){
    let promesa = new Promise((resolve,reject)=>{
      this.mostrar_toast('Subiendo imagen...');
      let storeRef = firebase.storage().ref();
      let nombreArchivo:string = new Date().valueOf().toString();
      let uploadTask: firebase.storage.UploadTask =
          storeRef.child(`child/${nombreArchivo}`)
                  .putString(imagen, 'base64', {contentType:'image/jpeg'});
          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,

            () =>{},
            (error) =>{
              
              console.log('Error al subir ', JSON.stringify(error));
              this.mostrar_toast(JSON.stringify(error));
              reject();
            },
            ()=>{
              
              this.mostrar_toast('imagen cargada correctamente');
              uploadTask.snapshot.ref.getDownloadURL().then(urlImage => {
                this.cargar_img_user(urlImage,userid);
                 this.mostrar_toast('URL:' + urlImage);
                }).catch((error) => {
                         console.log(error);
                });
              resolve();
            }
             
            );
    });

    return promesa;
  }
  //Firebase Realdatatime
  private cargar_imagenes(titulo:string, url:string, nombre:string,apellido:string, rating:number, nombreArchivo:string, tipo:string, fecha:number){
    let post: ArchivoSubir = {
      fuente:url,
      nombre:nombre,
      apellido:apellido,
      rating:rating,
      titulo:titulo,
      tipo:tipo,
      fecha:fecha,
      key:nombreArchivo
    };
    console.log(JSON.stringify(post));
    this.afDB.object(`/post/${nombreArchivo}`).update(post);
    this.lastkey = undefined;
  }

  //Firebase Video Realdataime

   cargar_videos(titulo:string, url:string, nombre:string, apellido:string, rating:number, nombreArchivo:string, tipo:string,fecha:number){
    let post: ArchivoSubir = {
      fuente:url,
      nombre:nombre,
      apellido:apellido,
      rating:rating,
      titulo:titulo,
      tipo:tipo,
      fecha:fecha,
      key:nombreArchivo
    };
    console.log(JSON.stringify(post));
    this.afDB.object(`/videos/${nombreArchivo}/`).update(post);
  }

  cargar_img_child(url:string,userid:string, uid:any){
    this.afDB.object(`/usuarios/${userid}/children/${uid}`).update({imagen:url});
  }
  cargar_img_user(url:string,userid:string){
    this.afDB.object(`/usuarios/${userid}/info/`).update({imagen:url});
  }

  cargar_comentario(nombre:string, apellido:string, imagen:string, fecha:number, comentario:string,llave:string,tipo:string){
    let comment:Comentario = {
      nombre:nombre,
      apellido:apellido,
      imagen:imagen,
      fecha:fecha,
      comentario:comentario,
    };
    let key =this.afDB.database.ref('videos/comentarios').push().key;
    console.log(JSON.stringify(comment));
    if(tipo === 'video' || tipo === 'youtube'){
    this.afDB.object(`/videos/${llave}/comentarios/${key}`).set(comment);
    }
    if(tipo === 'imagen'){
      this.afDB.object(`/post/${llave}/comentarios/${key}`).set(comment);
    }
  }


  mostrar_toast(mensaje:string){
    this.toastCtrl.create({
      message:mensaje,
      duration: 2000
    }).present();
  }
}




interface ArchivoSubir {
  fuente: string;
  nombre:string;
  apellido:string;
  rating:number;
  titulo:string;
  tipo:string;
  fecha:number;
  key?:string;
}

interface Comentario{
  nombre:string;
  apellido:string;
  imagen:string;
  fecha:number;
  comentario:string;
}

