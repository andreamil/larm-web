import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../../config';
@Component({
    selector: 'ngx-entrada-saida',
    template: `
    <nb-card class="row">
        <nb-card-body>
                <h3>Teste entrada e saida</h3>
                <input  type="text"
                        nbInput
                        placeholder="Insira o ID"
                        class="form-control"
                        [(ngModel)]="id">
                <button nbButton (click)="registrar('entrada')"
                style="cursor: pointer;margin: 1rem;">registrar entrada</button>
                <button nbButton (click)="registrar('saida')" style="
                cursor: pointer;margin: 1rem;">registrar saida</button>
                <span>{{msg}}</span>
        </nb-card-body>
    </nb-card>
    <nb-card class="row">
        <nb-card-body>
                <h3>Teste Relatorio</h3>
                <nb-list>
                    <nb-list-item *ngFor="let usuario of usuarios" style="display: flex;">
                        <nb-user style="width: 100%;"
                            [picture]="usuario.foto"
                            [name]="usuario.fullName"
                            [title]="usuario.role"
                            size="medium">
                        </nb-user>
                        <nb-list *ngIf="response.id===usuario._id">
                                <nb-list-item *ngFor="let registro of response.registros" style="display: flex;">
                                    <span>Hora entrada: {{registro.horaEntrada}}</span>
                                    <span>Hora saida: {{registro.horaSaida}}</span>
                                </nb-list-item>
                            </nb-list>
                        <button nbButton (click)="registrar('entrada',usuario._id)"
                            style="cursor: pointer;margin: 1rem;">registrar entrada</button>
                        <button nbButton (click)="registrar('saida',usuario._id)"
                            style="cursor: pointer;margin: 1rem;">registrar saida</button>
                        <button nbButton (click)="relatorio(usuario._id)"
                            style="cursor: pointer;margin: 1rem; float: right;">relatorio</button>
                    </nb-list-item>
                </nb-list>
                <span>{{msg}}</span>
                <span>{{registros}}</span>
        </nb-card-body>
    </nb-card>
    `,
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
