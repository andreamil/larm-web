import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config';
import { Observable } from 'rxjs';
export class Usuario{  
   _id: string='';
   role: string='';
   fullName:string='';
   password:string='';
   dataDeNascimento:string='';
   matricula:number=null;
   siape:number=null;
   foto:string='';
   rfid:string='';
   email:string='';
   permissao:string='';
  constructor(usuario?: Usuario) { 
    if(usuario){
   usuario._id&&(this._id=usuario._id);
   usuario.role&&(this.role=usuario.role);
   usuario.fullName&&(this.fullName=usuario.fullName);
   usuario.password&&(this.password=usuario.password);
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
  public usuarios: Array<any>; 
  public registros: Array<any>; 
  public user: any;
  public msg: string;
}
@Injectable()
export class UsuariosService {
  getUsuarioHistoricoRecente(id: string): Promise<ResponseUsuario> {
    return this.http.get<ResponseUsuario>(Config.BASE_API_URL + 'registro/relatorio/porta/id/'+id+'?_page=1&_limit=10&_mode=recente').toPromise()
  }
  //getUsuarioHistorico(id: string): Observable<ResponseUsuario> {
  //  return this.http.get<ResponseUsuario>(Config.BASE_API_URL + 'registro/relatorio/porta/id/'+id+'?_page=1&_limit=10&_mode=recente')
  //}
  excluirUsuario(userId: any){
    return this.http.delete(Config.BASE_API_URL + 'usuarios/excluir/'+userId).toPromise()
  } 
  constructor(private http: HttpClient) { }
  public usuarioEdit:any;
  cadastrarUsuario(user: any){
    return this.http.post(Config.BASE_API_URL + 'usuarios/criar',user).toPromise()
  } 
  getUsuarios() : Promise<ResponseUsuario>{
    return this.http.get<ResponseUsuario>(Config.BASE_API_URL + 'usuarios/user').toPromise()
  }
  getUsuariosNoLab() : Promise<ResponseUsuario>{
    return this.http.get<ResponseUsuario>(Config.BASE_API_URL + 'registro/relatorio/porta/agora').toPromise()
  }
  getUsuarioID(id:string): Promise<ResponseUsuario> {
    return this.http.get<ResponseUsuario>(Config.BASE_API_URL + 'usuarios/user/'+id).toPromise()
  }
  getUsuarioEu(): Promise<ResponseUsuario> {
    return this.http.get<ResponseUsuario>(Config.BASE_API_URL + 'usuarios/eu/').toPromise()
  }
  getProfessores(): Promise<ResponseUsuario> {
    return this.http.get<ResponseUsuario>(Config.BASE_API_URL + 'usuarios/professores/').toPromise()
  }
}
