import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config';
@Injectable()
export class UsuariosService {
  constructor(private http: HttpClient) { }
  usuarioEdit:any;
  cadastrarUsuario(user: any){
    return this.http.post(Config.BASE_API_URL + 'usuarios/criar',user)
  } 
  setUsuarioEdit(user: any){    
    this.usuarioEdit=user;
    if(this.usuarioEdit!='n')this.usuarioEdit='s';
  }
  getUsuarioEdit(){
    return this.usuarioEdit;
  }
  getUsuarios() {
    return this.http.get<any>(Config.BASE_API_URL + 'usuarios/user')
  }
  getUsuarioID(id:any) {
    return this.http.get<any>(Config.BASE_API_URL + 'usuarios/user/'+id)
  }
  getUsuarioEu(): any {
    return this.http.get<any>(Config.BASE_API_URL + 'usuarios/eu/')
  }
}
