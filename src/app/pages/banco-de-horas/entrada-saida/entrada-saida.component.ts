import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Config } from '../../../config';
@Component({
    selector: 'ngx-entrada-saida',
    templateUrl: './entrada-saida.component.html',
})

export class EntradaSaidaComponent implements OnInit {
    icon: string;
    id: string;
    msg: string;
    submitted = false;
    usuarios: any[] = [];
    response: any[] = [];
    constructor(private http: HttpClient) { }
    ngOnInit() {
        this.id = '';
        this.icon = 'close-circle';
        this.getUsuarios();
    }
    registrar(dir: string, id: string) {
        this.http.post<any>(Config.BASE_API_URL + 'registro/' + dir + '/', {id: id})
            .subscribe(response => {
                if (response) {
                    this.msg = response.msg;
                    this.relatorio(id);
                } else {
                    this.msg = 'noResponse';
                }
            });
        // this.id = '';
        this.icon = 'checkmark-circle-2';
    }
    relatorio(id: string) {
        this.http.get<any>(Config.BASE_API_URL + 'registro/relatorio/porta/' + id)
            .subscribe(response => {
                if (response) {
                    this.response = response;
                    this.msg = response.msg;
                } else {
                    this.msg = 'noResponse';
                }
                // console.log(this.events);
            });
        // this.id = '';
        this.icon = 'checkmark-circle-2';
    }
    getUsuarios() {
        this.http.get<any>(Config.BASE_API_URL + 'user')
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
