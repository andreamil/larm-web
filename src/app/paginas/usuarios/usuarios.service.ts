import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config';
@Injectable()
export class UsuariosService {
  constructor(private http: HttpClient) { }

  cadastrarUsuario(user: any){
    return this.http.post(Config.BASE_API_URL + 'usuarios/criar',user)
  }
}
