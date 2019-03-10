import { Injectable } from '@angular/core';

import { NbToastrConfig } from '@nebular/theme/components/toastr/toastr-config';
import { Socket } from 'ngx-socket-io';

export interface Notificacao {
  body: string;
  title: string;
  config: NbToastrConfig;
}

@Injectable({providedIn: 'root'})
export class SocketService extends Socket {
  msg = this.fromEvent<Notificacao>('notificacao');
  autorizado = this.fromEvent<boolean>('autorizado');
  lendoConfirmacao = this.fromEvent<boolean>('lendo novo usuario');
  novoRFID = this.fromEvent<String>('novo RFID');
  
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
