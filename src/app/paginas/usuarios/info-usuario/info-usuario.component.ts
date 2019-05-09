import { Component, OnInit, OnDestroy/*, Input, ViewEncapsulation, ViewChild*/ } from '@angular/core';
import { UsuariosService/*, Usuario*/ } from '../usuarios.service';
// import { NbDialogService } from '@nebular/theme';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from '../../../config';
@Component({
  selector: 'ngx-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.scss'],
})
export class InfoUsuarioComponent implements OnInit, OnDestroy {
  image64: string;
  cadastradoDentro: boolean;
  cadastradoFora: boolean;
  cadastrandoDentro: boolean;
  cadastrandoFora: boolean;
  isAdmin: boolean;
  options = [
    { value: 'user', label: 'User' },
    { value: 'aluno', label: 'Aluno' },
    { value: 'professor', label: 'Professor' }
  ];

  user: any = {};
  baseUrl = Config.BASE_API_URL;
  _getUsuarioHistoricoRecenteSub: any;
  entradasSaidas: any[]=[];
  constructor(
    private usuarioService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router) { }
  private _getUsuarioIDSub: Subscription;

  professorSelecionado:any={}
  professores=[{}]
  croppedImage: any = 'http://sg-fs.com/wp-content/uploads/2017/08/user-placeholder.png';
  rfidLoading = false;
  meuperfil = false;
  digitalmsg = '';
  registros :any[];

  setupUser() {
    if (this.user.role.includes('admin')) this.isAdmin = true;
    if (this.user.role.includes('professor')) this.user.role = 'professor';
    if (this.user.role.includes('aluno')) this.user.role = 'aluno';
    this.user.foto && (this.croppedImage = this.baseUrl + 'fotosPerfil/' + this.user._id + '.' + this.user.foto + '.png')
    if (this.user.idDigital) {
      this.cadastradoDentro = true;
      this.cadastradoFora = true;
    }
  }
  editarUsuario() {
    this.usuarioService.usuarioEdit = this.user;
    this.router.navigate(['/paginas/usuarios/criar-editar-usuario/' + this.user._id])
  }
  ngOnInit() {
    let idUser: string = this.route.snapshot.paramMap.get('id');
    if (idUser) {
      this.usuarioService.getUsuarioID(idUser).then((body) => {
        this.user = body.user;
        this.setupUser();
      })
      this.usuarioService.getUsuarioHistoricoRecente(idUser).then((body) => {
        this.registros=body.registros;
      })
      this.usuarioService.getProfessores().then((body)=>{ 
        this.professores = body.usuarios;
        if(this.user.profResponsavel){
          this.professorSelecionado=this.professores.find((prof)=>prof["_id"]==this.user.profResponsavel)
        }
      })
    }
    // this.registros.forEach((val,i) => {
    //   Object.keys(this.registros[i]).forEach((val) => {
    //     if (val == 'horaEntrada') if (this.registros[i].horaEntrada) this.entradasSaidas.push({ tipo: 'entrada', hora: this.registros[i].horaEntrada });
    //     if (val == 'horaSaida') if (this.registros[i].horaSaida) this.entradasSaidas.push({ tipo: 'saida', hora: this.registros[i].horaSaida });
    //   })
    // })
  }
  ngOnDestroy(): void {
    // this._getUsuarioIDSub && (this._getUsuarioIDSub.unsubscribe());
    // this._getUsuarioHistoricoRecenteSub && (this._getUsuarioHistoricoRecenteSub.unsubscribe());
  }
  idbkp: Number;

}
import { NbDialogRef } from '@nebular/theme';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { SocketService } from '../../socket.service';
import { NbAuthService } from '@nebular/auth';
import { stringify } from '@angular/compiler/src/util';

// @Component({
//   selector: 'ngx-dialog-usuario',
//   encapsulation: ViewEncapsulation.None,
//   template: `
// <nb-card>
//   <nb-card-header>{{ title }}</nb-card-header>
//   <nb-card-body>
//    Mensagem do servidor: {{conteudo}}
//   </nb-card-body>
//   <nb-card-footer>
//     <button nbButton status="primary" (click)="dismiss()">OK</button>
//   </nb-card-footer>
// </nb-card>`,
//   styles: [`  
//     .cdk-global-scrollblock {
//       position: initial;
//       width: initial;
//       overflow: hidden;
//     }`],
// })
// export class DialogUsuarioComponent {

//   @Input() title: string;
//   @Input() conteudo: string;

//   constructor(protected ref: NbDialogRef<DialogUsuarioComponent>) { }

//   dismiss() {
//     this.ref.close();
//   }
// }