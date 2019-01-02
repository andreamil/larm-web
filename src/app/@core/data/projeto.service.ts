import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../config';
@Injectable()
export class ProjetoService {
  constructor(private http: HttpClient) { }

  getAllProjetos(): Observable<any> {
    return this.http.get<any>(Config.BASE_API_URL + 'projetos');
  }
}
