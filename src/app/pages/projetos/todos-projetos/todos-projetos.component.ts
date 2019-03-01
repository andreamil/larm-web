import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '../../../@core/data/projeto.service';

@Component({
  selector: 'ngx-todos-projetos',
  templateUrl: './todos-projetos.component.html',
  styleUrls: ['./todos-projetos.component.scss'],
})
export class TodosProjetosComponent implements OnInit {
  projetos: any[] = [];
  noProjetos = false;
  constructor(private service: ProjetoService) {

  }
  ngOnInit() {
    this.getProjetos();
  }
  getProjetos(): void {
    this.service.getAllProjetos()
      .subscribe(response => {
        if (response) {
          this.noProjetos = false;
          this.projetos = response.projetos;
          if (this.projetos === [])this.noProjetos = true;
        } else {
          this.noProjetos = true;
        }
        // console.log(this.events);
      });
  }

}
