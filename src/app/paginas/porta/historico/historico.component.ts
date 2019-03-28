import { Component ,OnInit, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
  
import { ServerDataSource, ViewCell } from 'ng2-smart-table';
@Component({
  selector: 'ngx-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
})

export class HistoricoComponent {

  settings = {
    actions: null,
    columns: {
      usuario: {
        title: 'Usuario',
        editable:false,
        type: 'custom',
        renderComponent: CustomRenderComponent,
      },
      horaEntrada: {
        type: 'custom',
        editable:false,
        renderComponent: CustomRenderDataComponent,
        title: 'Entrada',
      },
      horaSaida: {
        type: 'custom',
        editable:false,
        renderComponent: CustomRenderDataComponent,
        title: 'Saida',
      },
      /*tempoTotal: {
        type: 'custom',
        editable:false,
        renderComponent: CustomRenderTotalComponent,
        title: 'Total da sessão',
      },*/
    },
  };

  source: ServerDataSource;
  constructor(private http: HttpClient) {
    this.source = new ServerDataSource(this.http, { endPoint: 'http://150.162.234.151:45454/registro/relatorio/porta',dataKey: 'registros',totalKey:'total'});
  }
}

@Component({template: `{{value|date:'medium'}}`,})
export class CustomRenderDataComponent implements ViewCell {
  @Input() rowData: any;
  @Input() value: any;
}
@Component({template: `<nb-user [usuario]="value" size="medium">`,})
export class CustomRenderComponent implements ViewCell {
  @Input() rowData: any;
  @Input() value: any;
}
@Component({template: `{{value|}}`,})
export class CustomRenderTotalComponent implements ViewCell {
  @Input() rowData: any;
  @Input() value: any;
}