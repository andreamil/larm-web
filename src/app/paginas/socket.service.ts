import { Injectable } from '@angular/core';

import { NbToastrConfig } from '@nebular/theme/components/toastr/toastr-config';
import { Socket } from 'ngx-socket-io';

export interface Notificacao {
  body: string;
  title: string;
  config: NbToastrConfig;
}
export interface StatusDigital {
  msg: string;
  status: string;
  id: Number;
}

@Injectable({providedIn: 'root'})
export class SocketService extends Socket {
  private _idUser: string;
  public get idUser(): string {
    return this._idUser;
  }
  public set idUser(value: string) {
    this._idUser = value;
  }
  msg = this.fromEvent<Notificacao>('notificacao');
  autorizado = this.fromEvent<boolean>('autorizado');
  novoRFID = this.fromEvent<string>('novo RFID');
  statusCadastroDigital = this.fromEvent<StatusDigital>('status digital');
  getFotoLarm = this.fromEvent<any>('foto larm');
  getUsuariosNoLab = this.fromEvent<any>('get usuarios no lab');
  
}

//   getDocument(id: string) {
//     this.socket.emit('getDoc', id);
//   }

//   newDocument() {
//     this.socket.emit('addDoc', { id: this.docId(), doc: '' });
//   }

//   editDocument(document: Document) {
//     this.socket.emit('editDoc', document);
//   }

//   private docId() {
//     let text = '';
//     const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//     for (let i = 0; i < 5; i++) {
//       text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }

//     return text;
//   }
