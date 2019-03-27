import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';

import { UserService } from '../../../@core/data/users.service';
import { UsuariosService } from '../../usuarios/usuarios.service';
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
  constructor(private usuariosService: UsuariosService,private socketService: SocketService) {

    this._getUsuariosLabSub = this.socketService.getUsuariosNoLab.subscribe(()=>{
      this.usuariosService.getUsuariosNoLab().pipe(take(1)).subscribe((response)=>{
        this.registros= response.registros;
        console.log(response.registros[0].usuario.horaEntrada);
      })
    })
  }

  ngOnInit() {

    this.usuariosService.getUsuariosNoLab().pipe(take(1)).subscribe((response)=>{
      this.registros= response.registros;
      console.log(response.msg);
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
