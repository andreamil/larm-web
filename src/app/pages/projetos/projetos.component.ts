import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '../../@core/data/projeto.service';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-projetos',
  templateUrl: './projetos.component.html',
  styles: ['./projetos.component.scss'],
})
export class ProjetosComponent implements OnInit {
  projetos: any[] = [];
  noProjetos = false;
 /* settings = {
    add: {
      addButtonContent: 'Criar Projeto',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },

    columns: {
                _id: { title: 'ID'       , type: 'string' },
        createdDate: { title: 'Criado em', type: 'string' },
             titulo: { title: 'Titulo'   , type: 'string' },
             status: { title: 'Status'   , type: 'string' },
          categoria: { title: 'Categoria', type: 'string' },
              lider: { title: 'Lider'    , type: 'string' },
           vigencia: { title: 'Vigencia' , type: 'string' },
          descricao: { title: 'Descrição', type: 'string' },
      },
  };

  source: ServerDataSource;*/

  constructor(private service: ProjetoService, private router: Router) {

  }
  ngOnInit() {
    this.getEvents();
  }
  getEvents(): void {
    this.service.getAllProjetos()
      .subscribe(response => {
        if (response) {
          this.projetos = response.projetos;
        } else {
          this.noProjetos = true;
        }
        // console.log(this.events);
      });
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
