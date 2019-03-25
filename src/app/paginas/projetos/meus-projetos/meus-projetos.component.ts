import { Component, OnInit, Input } from '@angular/core';
import { ProjetoService } from '../projeto.service';
import { Config } from '../../../config';

@Component({
  selector: 'ngx-meus-projetos',
  templateUrl: './meus-projetos.component.html',
  styleUrls: ['./meus-projetos.component.scss'],
})
export class MeusProjetosComponent implements OnInit {

  @Input() baseUrl = Config.BASE_API_URL;
  @Input() projetos: any[] = [];
  @Input() noProjetos = false;
  constructor(private service: ProjetoService) {

  }
  ngOnInit() {
    this.getMeusProjetos();
  }
  getMeusProjetos(): void {
    this.service.getMeusProjetos()
      .subscribe(response => {
        console.log(response);
        
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
