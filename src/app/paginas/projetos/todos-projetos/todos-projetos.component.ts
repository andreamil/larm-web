import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProjetoService } from '../projeto.service';
import { Config } from '../../../config';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'ngx-todos-projetos',
  templateUrl: './todos-projetos.component.html',
  styleUrls: ['./todos-projetos.component.scss'],
})
export class TodosProjetosComponent implements OnInit, OnDestroy {
  projetos: any = {pesquisa:[],extensao:[]};
  noProjetos = false;
  noProjetosPesquisa = false;
  noProjetosExtensao = false;
  textTitle='Todos os';
  private getProjSub:Subscription
  @Input() baseUrl = Config.BASE_API_URL;
  constructor(private service: ProjetoService,
    private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.projetos={pesquisa:[],extensao:[]};
    if(this.route.snapshot.url[0].path=='meus')this.textTitle='Meus';
    this.getProjetos();
  }
  ngOnDestroy(): void {
    this.getProjSub&&(this.getProjSub.unsubscribe());
  }
  getProjetos(): void {
    console.log(this.route.snapshot);
    this.getProjSub = this.service.getProjetos(this.route.snapshot.url).subscribe(response => {
        console.log(response)
        if (response) {
          this.projetos = response.projetos;      
          console.log(this.projetos.pesquisa,this.projetos.extensao)
        } 
        // console.log(this.events);
      });
  }

}
