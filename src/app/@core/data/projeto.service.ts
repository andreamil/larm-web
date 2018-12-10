import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProjetoService {


  private url = 'https://larm-backend.herokuapp.com/projetos';

  constructor(private http: HttpClient) { }

  getAllProjetos(): Observable<any> {
    return this.http.get<any>(`${this.url}/`);
  }
}
