import { Component, OnInit, Input } from '@angular/core';
import { ProjetoService } from '../projeto.service';
import { Config } from '../../../config';

@Component({
  selector: 'ngx-todos-projetos',
  templateUrl: './todos-projetos.component.html',
  styleUrls: ['./todos-projetos.component.scss'],
})
export class TodosProjetosComponent implements OnInit {
  projetos: any[] = [];
  noProjetos = false;
  @Input() baseUrl = Config.BASE_API_URL;
  constructor(private service: ProjetoService) {

  }
  ngOnInit() {
    this.getProjetos();
  }
  getProjetos(): void {
    this.service.getAllProjetos()
      .subscribe(response => {
        if (response) {
          console.log(response.projetos[0].lider)
          if (this.projetos === [])this.noProjetos = true;
          this.projetos = response.projetos;
        } else {
          this.noProjetos = true;
        }
        // console.log(this.events);
      });
  }

}
