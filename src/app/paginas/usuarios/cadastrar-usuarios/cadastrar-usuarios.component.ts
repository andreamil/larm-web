import { Component, OnInit, Input, ViewEncapsulation, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { UsuariosService, Usuario } from '../usuarios.service';
import { NbDialogService } from '@nebular/theme';
@Component({
  selector: 'ngx-cadastrar-usuarios',
  templateUrl: './cadastrar-usuarios.component.html',
  styleUrls: ['./cadastrar-usuarios.component.scss'],
})
export class CadastrarUsuariosComponent implements OnInit, OnDestroy, AfterViewInit {
  image64: string;
  cadastradoDentro: boolean;
  cadastradoFora: boolean;
  cadastrandoDentro: boolean;
  cadastrandoFora: boolean;
  ngAfterViewInit(): void {
    this._imageCroppedBase64Sub=this.imageCropper.imageCroppedBase64.subscribe((img)=>this.user.foto = img)
  }
  options = [
    { value: 'user', label: 'User' },
    { value: 'aluno', label: 'Aluno' },
    { value: 'professor', label: 'Professor' }
  ];

  user: any={};
  submitted = false;
  rfidButtonText = 'Ler RFID'
  checkForm: boolean;
  enviandoFoto: boolean;
  baseUrl = Config.BASE_API_URL;
  checkboxAdmin=false;
  @ViewChild(ImageCropperComponent) imageCropper : ImageCropperComponent;
  constructor(
    private usuarioService: UsuariosService,
    private dialogService : NbDialogService,
    private socketService : SocketService,
    private route: ActivatedRoute,
    private authService: NbAuthService,
    private router: Router) { }
  private _lendoConfirmacaoSub: Subscription;
  private _getFotoLarmSub: Subscription;
  private _novoRFIDSub: Subscription;
  private _getUsuarioIDSub: Subscription;
  private _cadastrarUsuarioSub: Subscription;
  private _statusCadastroDigitalSub: Subscription;
  private _imageCroppedBase64Sub: Subscription;
  
  imageChangedEvent: any = '';
  croppedImage: any = 'http://sg-fs.com/wp-content/uploads/2017/08/user-placeholder.png';
  showCropper = false;
  rfidLoading=false;
  meuperfil=false;
  digitalmsg='';
  setupUser(){
    if(this.user.role.includes('admin'))this.checkboxAdmin=true;
    if(this.user.role.includes('professor'))this.user.role='professor';
    if(this.user.role.includes('aluno'))this.user.role='aluno';
    this.user.foto&&(this.croppedImage=this.baseUrl+'fotosPerfil/'+this.user._id+'.'+this.user.foto+'.png')
    if(this.user.idDigital){
      this.cadastradoDentro=true;
      this.cadastradoFora=true;
    }
  }
  ngOnInit() { 
    if(this.usuarioService.usuarioEdit){
      console.log(this.usuarioService.usuarioEdit);
      this.user = this.usuarioService.usuarioEdit;
      this.setupUser();
      this.usuarioService.usuarioEdit=null;
    }else if(this.route.snapshot.paramMap.get('id')){
      this._getUsuarioIDSub=this.usuarioService.getUsuarioID(this.route.snapshot.paramMap.get('id')).pipe(take(1)).subscribe((body)=>{
          this.user = body.user;
          this.setupUser();
        })
      } 
      else if(this.route.snapshot.url[0].path=='meu-perfil'){
        this.meuperfil=true;
        this._getUsuarioIDSub=this.usuarioService.getUsuarioEu().pipe(take(1)).subscribe((body)=>{
          this.user = body.user;
          this.setupUser();
        })
    }
    
    
  }
  ngOnDestroy(): void {
    this._lendoConfirmacaoSub&&(this._lendoConfirmacaoSub.unsubscribe());
    this._novoRFIDSub&&(this._novoRFIDSub.unsubscribe());
    this._getFotoLarmSub&&(this._getFotoLarmSub.unsubscribe());
    this._getUsuarioIDSub&&(this._getUsuarioIDSub.unsubscribe());    
    this._cadastrarUsuarioSub&&(this._cadastrarUsuarioSub.unsubscribe());
    this._statusCadastroDigitalSub&&(this._statusCadastroDigitalSub.unsubscribe());
    this._imageCroppedBase64Sub&&(this._imageCroppedBase64Sub.unsubscribe());
  }
  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      this.showCropper = true;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  imageLoaded(){

  }
  loadImageFailed() {
      // show message
  }
  lerRFID(){
    this.rfidLoading=true;
    this.socketService.emit('ler novo usuario');
    this._novoRFIDSub = this.socketService.novoRFID.subscribe(rfid => {
      console.log('lido rfid ',rfid);
      if(rfid){
        this.user.rfid=rfid;
      }   
      this.rfidLoading=false;
    });
  }
  cameraLarm(){
    this._getFotoLarmSub&&(this._getFotoLarmSub.unsubscribe());
    this.showCropper = true;
    this._getFotoLarmSub = this.socketService.getFotoLarm.subscribe(res=>this.imageCropper.imageBase64='data:image/jpeg;base64,'+res);    
    this.socketService.emit('get foto larm');
  }
  excluirUsuario(){
    
    this.dialogService.open(DialogExcluirUsuarioComponent, {
      context: {
        title: "Confirmar exclusão",
        conteudo: "Excluir usuario "+this.user.fullName+'?',
      },
      closeOnBackdropClick: false
    })
    .onClose.subscribe(resposta => {
      if(resposta){
        this._cadastrarUsuarioSub=this.usuarioService.excluirUsuario(this.user._id).subscribe((res) => {
          this.dialogService.open(DialogUsuarioComponent, {
            context: {
              title: res["success"]?"Sucesso":"Falha",
              conteudo: res["msg"],
            },
            closeOnBackdropClick: false
          });
          if(res["success"]){
            this.user={};
            this.router.navigate(['/paginas/usuarios/criar-editar-usuario/'])
          }
        })
      }
    });
  }
  idbkp:Number;
  cadastrarDigital() {
    if(this.user.idDigital) {
      this.idbkp=this.user.idDigital;
      this.user.idDigital=null;
    }
    if(this.idbkp) {
      this.socketService.emit('cadastrarDigitalID',this.idbkp); 
    }
    else this.socketService.emit('cadastrarDigital',this.user._id);

    this._statusCadastroDigitalSub = this.socketService.statusCadastroDigital.subscribe(status => {
      console.log(status);
      this.digitalmsg=status.msg;
      if(status.id){
        this.user.idDigital=status.id;
      }
      if(status.status=='cadastrandoDentro1'){
        this.cadastrandoDentro=true;
        //this._statusCadastroDigitalSub.unsubscribe();
      }
      if(status.status=='cadastrandoDentro8'){
        this.cadastrandoDentro=false;
        this.cadastradoDentro=true;
        //this._statusCadastroDigitalSub.unsubscribe();
      }
      if(status.status=='cadastrandoFora1'){
        this.cadastrandoFora=true;
        this.cadastrandoDentro=false;

        //this._statusCadastroDigitalSub.unsubscribe();
      }
      if(status.status=='cadastrandoFora9'){
        this.cadastrandoFora=false;
        this.cadastradoFora=true;

        //this._statusCadastroDigitalSub.unsubscribe();
      }
      if(status.status=='cadastrandoForaTimeout'||status.status=='cadastrandoDentroTimeout'||status.status=='cadastrandoErr'){
        this.cadastradoDentro=false;
        this.cadastrandoDentro=false;
        this.cadastradoFora=false;
        this.cadastrandoFora=false;
        this._statusCadastroDigitalSub.unsubscribe();
      }
      if(status.status=='cadastradoForaSuccess'){
        this._statusCadastroDigitalSub.unsubscribe();
      }
      //if(rfid){
      //   this.user.rfid=rfid;
      //}   
      //this.rfidLoading=false;
    });
  }
  cadastrarUsuario() {
    this.submitted = true;
    console.log(this.user.rfid);
    this.user.role=this.checkboxAdmin?[this.user.role,'admin']:[this.user.role];
    console.log(this.user.role);
    
    this._cadastrarUsuarioSub=this.usuarioService.cadastrarUsuario(this.user).subscribe((res) => {
      this.dialogService.open(DialogUsuarioComponent, {
        context: {
          title: res["success"]?"Sucesso":"Falha",
          conteudo: res["msg"],
        },
        closeOnBackdropClick: false
      });
      if(res["success"]){
        this.user=res["user"];
        if(this.user.role.includes('admin'))this.checkboxAdmin=true;
        if(this.user.role.includes('professor'))this.user.role='professor';
        if(this.user.role.includes('aluno'))this.user.role='aluno';
       // this.authService.refreshToken('email',null).pipe(take(1)).subscribe()
      }

      console.log(res);
      this.submitted = false;
    })
  }

}
import { NbDialogRef } from '@nebular/theme';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { SocketService } from '../../socket.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { Config } from '../../../config';

@Component({
  selector: 'ngx-dialog-usuario',
  encapsulation: ViewEncapsulation.None,
  template: `
<nb-card>
  <nb-card-header>{{ title }}</nb-card-header>
  <nb-card-body>
   Mensagem do servidor: {{conteudo}}
  </nb-card-body>
  <nb-card-footer>
    <button nbButton status="primary" (click)="dismiss()">OK</button>
  </nb-card-footer>
</nb-card>`,
  styles: [`  
    .cdk-global-scrollblock {
      position: initial;
      width: initial;
      overflow: hidden;
    }`],
})
export class DialogUsuarioComponent {

  @Input() title: string;
  @Input() conteudo: string;

  constructor(protected ref: NbDialogRef<DialogUsuarioComponent>) { }

  dismiss() {
    this.ref.close();
  }
}

@Component({
  selector: 'ngx-dialog-usuario',
  encapsulation: ViewEncapsulation.None,
  template: `
<nb-card>
  <nb-card-header>{{ title }}</nb-card-header>
  <nb-card-body>
   {{conteudo}}
  </nb-card-body>
  <nb-card-footer>
  <div class="row">
    <div class="col-6">
      <button nbButton status="primary" (click)="dismiss(0)">Cancelar</button>
    </div>
    <div class="col-6">
      <button nbButton status="danger" (click)="dismiss(1)">Confirmar</button>
    </div>
  </div>
  </nb-card-footer>
</nb-card>`,
  styles: [`  
    .cdk-global-scrollblock {
      position: initial;
      width: initial;
      overflow: hidden;
    }`],
})
export class DialogExcluirUsuarioComponent {

  @Input() title: string;
  @Input() conteudo: string;

  constructor(protected ref: NbDialogRef<DialogExcluirUsuarioComponent>) { }

  dismiss(res: any) {
    this.ref.close(res);
  }
}
