import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';

import { UserService } from '../../../@core/data/users.service';
import { RegistroService } from '../../registro.service';
import { Config } from '../../../config';
import { SocketService } from '../../socket.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ngx-contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent implements OnInit, OnDestroy {

  registros: any[];
  baseUrl = Config.BASE_API_URL;
  private _getUsuariosLabSub: Subscription;
  constructor(private registroService: RegistroService,private socketService: SocketService) {

    this._getUsuariosLabSub = this.socketService.getUsuariosNoLab.subscribe(()=>{
      this.getUsuariosNoLab();
    })
  }

  ngOnInit() {
    this.getUsuariosNoLab();
    
  }
  getUsuariosNoLab(){
    this.registroService.getUsuariosNoLab().then((response)=>{
      this.registros= response.registros;
    })
  }
  registrarSaida(rfid){
    this.socketService.emit('registrarRFIDsaida',rfid);
  }
  ngOnDestroy() {
    // this.themeSubscription.unsubscribe();
    this._getUsuariosLabSub&&(this._getUsuariosLabSub.unsubscribe());
  }
}
