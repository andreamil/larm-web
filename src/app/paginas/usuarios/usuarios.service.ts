import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config';
import { Observable } from 'rxjs';
export class Usuario{  
   _id: string='';
   role: string='';
   fullName:string='';
   dataDeNascimento:string='';
   matricula:number=0;
   siape:number=0;
   foto:string='';
   rfid:string='';
   email:string='';
   permissao:string='';
  constructor(usuario?: Usuario) { 
    if(usuario){
   usuario._id&&(this._id=usuario._id);
   usuario.role&&(this.role=usuario.role);
   usuario.fullName&&(this.fullName=usuario.fullName);
   usuario.dataDeNascimento&&(this.dataDeNascimento=usuario.dataDeNascimento);
   usuario.matricula&&(this.matricula=usuario.matricula);
   usuario.siape&&(this.siape=usuario.siape);
   this.foto=usuario.foto?Config.BASE_API_URL+'fotosPerfil/'+usuario._id+'.'+usuario.foto+'.png':null;
   usuario.rfid&&(this.rfid=usuario.rfid);
   usuario.email&&(this.email=usuario.email);
   this.permissao=!usuario.permissao||usuario.permissao!='n'?'s':'n';}
  }
}
export class ResponseUsuario{  
  public usuarios: Array<Usuario>; 
  public user: Usuario;
  public msg: string;
}
@Injectable()
export class UsuariosService {
  constructor(private http: HttpClient) { }
  usuarioEdit:Usuario;
  cadastrarUsuario(user: Usuario){
    return this.http.post(Config.BASE_API_URL + 'usuarios/criar',user)
  } 
  setUsuarioEdit(user: Usuario){
    this.usuarioEdit=user;
  }
  getUsuarioEdit(){
    return this.usuarioEdit;
  }
  getUsuarios() : Observable<ResponseUsuario>{
    return this.http.get<ResponseUsuario>(Config.BASE_API_URL + 'usuarios/user')
  }
  getUsuarioID(id:string): Observable<ResponseUsuario> {
    return this.http.get<ResponseUsuario>(Config.BASE_API_URL + 'usuarios/user/'+id)
  }
  getUsuarioEu(): Observable<ResponseUsuario> {
    return this.http.get<ResponseUsuario>(Config.BASE_API_URL + 'usuarios/eu/')
  }
}
