import { Component ,OnInit, Input, SimpleChanges} from '@angular/core';
import { HttpClient } from '@angular/common/http';
  
import { ServerDataSource, ViewCell, DefaultFilter } from 'ng2-smart-table';
import { Config } from '../../../config';
@Component({
  selector: 'ngx-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
})

export class HistoricoComponent {

  settings = {
    actions: false,
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
        filter: {
          type: 'custom',
          component: DatePickerFilterComponent,
        },
      },
      horaSaida: {
        type: 'custom',
        editable:false,
        renderComponent: CustomRenderDataComponent,
        title: 'Saida',
        filter: {
          type: 'custom',
          component: DatePickerFilterComponent,
        },
      },
      tempoTotal: {
        type: 'custom',
        editable:false,
        renderComponent: CustomRenderTotalComponent,
        title: 'Total da sessão',
      }
    },
  };

  source: ServerDataSource;
  constructor(private http: HttpClient) {
    this.source = new ServerDataSource(this.http, { endPoint: Config.BASE_API_URL+'registro/relatorio/porta',dataKey: 'registros',totalKey:'total'});
    this.source.setSort([{ field: 'horaEntrada', direction: 'desc' }]);
    //this.source
  }
}

import { FormControl } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  template: `<input [formControl]="inputControl" [ngClass]="inputClass" class="form-control" placeholder="Intervalo" [nbDatepicker]="rangepicker">
             <nb-rangepicker #rangepicker></nb-rangepicker>`,})
export class DatePickerFilterComponent  extends DefaultFilter implements OnInit {
  
  inputControl = new FormControl();
  constructor(){
    super();
  }
  ngOnInit() {
    if (this.query) {
      this.inputControl.setValue(this.query);
    }
    this.inputControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(this.delay),
      )
      .subscribe((value: any) => {
        
        this.query = this.inputControl.value.end?Date.parse(this.inputControl.value.start)+','+Date.parse(this.inputControl.value.end):'';
        
        console.log(this.query);
        this.setFilter();
      });
  }
  ngOnChanges(changes: SimpleChanges) {
    // if (changes.query) {
    //   this.inputControl.setValue(this.query);
    // }
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
@Component({template: `{{rowData|tempoTotal}}`,})
export class CustomRenderTotalComponent implements ViewCell {
  @Input() rowData: any;
  @Input() value: any;
}