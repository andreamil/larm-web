import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Config } from '../../../config';
import { SocketService } from '../../socket.service';
@Component({
    selector: 'ngx-entrada-saida',
    templateUrl: './entrada-saida.component.html',
})

export class EntradaSaidaComponent implements OnInit {
    @Input() icon: string;
    @Input() rfid: string;
    @Input() msg: string;
    @Input() submitted = false;
    @Input() usuarios: any[] = [];
    @Input() response: any[] = [];
    @Input() baseUrl = Config.BASE_API_URL;
    constructor(private http: HttpClient,
        private socketService : SocketService) { }
    ngOnInit() {
        this.rfid = '';
        this.icon = 'close-circle';
        this.getUsuarios();
    }
    registrarRFID(rfid:string) {
        this.socketService.emit('registrarRFID',rfid);
        this.relatorioRFID(rfid);
    }
    registrarId(direcao: string, id: string) {
        this.http.post<any>(Config.BASE_API_URL + 'registro/' + direcao + '/', {id: id})
            .subscribe(response => {
                if (response) {
                    this.msg = response.msg;
                    this.relatorioId(id);
                } else {
                    this.msg = 'noResponse';
                }
            });
        // this.id = '';
        this.icon = 'checkmark-circle-2';
    }
    relatorioId(id: string) {
        this.http.get<any>(Config.BASE_API_URL + 'registro/relatorio/porta/id/' + id)
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
        this.http.get<any>(Config.BASE_API_URL + 'usuarios/user')
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
