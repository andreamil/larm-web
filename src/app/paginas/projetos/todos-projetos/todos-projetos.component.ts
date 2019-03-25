import { Component, OnInit, Input } from '@angular/core';
import { ProjetoService } from '../projeto.service';
import { Config } from '../../../config';
import { ProjetosComponent } from '../projetos.component';

@Component({
  selector: 'ngx-todos-projetos',
  templateUrl: './todos-projetos.component.html',
  styleUrls: ['./todos-projetos.component.scss'],
})
export class TodosProjetosComponent implements OnInit {
  projetos: any = {pesquisa:[],extensao:[]};
  noProjetos = false;
  noProjetosPesquisa = false;
  noProjetosExtensao = false;
  @Input() baseUrl = Config.BASE_API_URL;
  constructor(private service: ProjetoService) {

  }
  ngOnInit() {
    this.getProjetos();
  }
  getProjetos(): void {
    this.service.getAllProjetos()
      .subscribe(response => {
        console.log(response)
        if (response) {
          this.projetos = response.projetos;
          if (!this.projetos.extensao.length)this.noProjetosExtensao = true;
          if (!this.projetos.pesquisa.length)this.noProjetosPesquisa = true;          
        } else {
          this.noProjetosExtensao = true;
          this.noProjetosPesquisa = true;    
        }
        // console.log(this.events);
      });
  }

}
