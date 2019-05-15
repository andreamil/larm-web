import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config';

export class ResponseUsuario{  
  public usuarios: Array<any>; 
  public registros: Array<any>; 
  public user: any;
  public msg: string;
}
@Injectable()
export class RegistroService {
  constructor(private http: HttpClient) { }
  getRegistroHistoricoRecente(id: string): Promise<ResponseUsuario> {
    return this.http.get<ResponseUsuario>(Config.BASE_API_URL + 'registro/relatorio/porta/id/'+id+'?_page=1&_limit=10&_mode=recente').toPromise()
  }
  getRegistroHistorico(id: string): Promise<ResponseUsuario> {
   return this.http.get<ResponseUsuario>(Config.BASE_API_URL + 'registro/relatorio/porta/id/'+id+'?_page=1&_limit=10&_mode=recente').toPromise()
  }
  getRegistroHistoricoHoje(): Promise<ResponseUsuario> {
   return this.http.get<ResponseUsuario>(Config.BASE_API_URL + 'registro/relatorio/porta/hoje').toPromise()
  }
  getUsuariosNoLab() : Promise<ResponseUsuario>{
    return this.http.get<ResponseUsuario>(Config.BASE_API_URL + 'registro/relatorio/porta/agora').toPromise()
  }
}
