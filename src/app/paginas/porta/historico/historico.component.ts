import { Component ,OnInit, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
  
import { ServerDataSource, ViewCell } from 'ng2-smart-table';
import { Config } from '../../../config';
@Component({
  selector: 'ngx-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
})

export class HistoricoComponent {

  settings = {
    columns: {
      horaEntrada: {
        type:'date',
        title: 'Entrada',
      },
      horaSaida: {
        type:'date',
        title: 'Saida',
      },
      usuario: {
        title: 'Usuario',
        type: 'custom',
        renderComponent: CustomRenderComponent,
      },
    },
  };

  source: ServerDataSource;
  constructor(private http: HttpClient) {
    this.source = new ServerDataSource(this.http, { endPoint: 'http://150.162.234.151:45454/registro/relatorio/porta',dataKey: 'registros' });
  }

}


@Component({
  template: `
  <nb-user
  [picture]="value.foto?baseUrl+'fotosPerfil/'+value._id+'.'+value.foto+'.png':null"
  [name]="value.fullName"
  [title]="value.role"
  size="small">
  `,
})
export class CustomRenderComponent implements ViewCell, OnInit {

  //renderValue: string;

  @Input() baseUrl = Config.BASE_API_URL;
  @Input() value: any;
  @Input() rowData: any;

  ngOnInit() {
    //this.renderValue = this.value.toString().toUpperCase();
  }

}