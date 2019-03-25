import { Component, OnInit, Input } from '@angular/core';
import { Config } from '../../../config';
import { HttpClient } from '@angular/common/http';
import { UsuariosService } from '../usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss'],
})
export class ListarUsuariosComponent implements OnInit {
  textoFiltro;
  icon: string;
  rfid: string;
  msg: string;
  submitted = false;
  usuarios: any[] = [];
  response: any[] = [];
  baseUrl = Config.BASE_API_URL;
  constructor(private http: HttpClient,
      // private socketService : SocketService,
      private usuarioService: UsuariosService,
      private router: Router) { }
  ngOnInit() {
      this.rfid = '';
      this.icon = 'close-circle';
      this.getUsuarios();
  }
  editar(usuario:any) {
    this.usuarioService.usuarioEdit=usuario;
    this.router.navigate(['/paginas/usuarios/criar-editar-usuario/'+usuario._id])
  }
  relatorioRFID(rfid: string) {
      this.http.get<any>(Config.BASE_API_URL + 'registro/relatorio/porta/rfid/' + rfid)
          .subscribe(response => {
              if (response) {
                  this.response = response;
                  this.msg = response.msg;
    console.log(response.registros);
              } else {
                  this.msg = 'noResponse';
              }
              // console.log(this.events);
          });
      // this.id = '';
      this.icon = 'checkmark-circle-2';
  }
  getUsuarios() {
      this.usuarioService.getUsuarios()
          .subscribe(response => {
              if (response) {
                  this.usuarios = response.usuarios;
                  this.msg = response.msg;
              } else {
                  this.msg = 'noResponse';
              }
              // console.log(this.events);
          });
  }
}