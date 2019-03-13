import { Component, OnInit, Input, ViewEncapsulation, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-cadastrar-usuarios',
  templateUrl: './cadastrar-usuarios.component.html',
  styleUrls: ['./cadastrar-usuarios.component.scss'],
})
export class CadastrarUsuariosComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() image64: string;
  ngAfterViewInit(): void {
    this.imageCropper.imageCroppedBase64.subscribe((img)=>this.user.foto = img)
  }
  @Input() options = [
    { value: 'user', label: 'User' },
    { value: 'aluno', label: 'Aluno' },
    { value: 'professor', label: 'Professor' }
  ];
  @Input() user: any = {}
  @Input() submitted = false;
  @Input() rfidButtonText = 'Ler RFID'
  @Input() checkForm: boolean;
  @Input() enviandoFoto: boolean;
  @ViewChild(ImageCropperComponent) imageCropper : ImageCropperComponent;
  constructor(
    private usuarioService: UsuariosService,
    private dialogService : NbDialogService,
    private socketService : SocketService,
    private route: ActivatedRoute,
    private authService: NbAuthService) { }

  private _lendoConfirmacaoSub: Subscription;
  private _getFotoLarmSub: Subscription;
  private _novoRFIDSub: Subscription;
  private _getUsuarioIDSub: Subscription;
  private _cadastrarUsuarioSub: Subscription;

  imageChangedEvent: any = '';
  croppedImage: any = 'http://sg-fs.com/wp-content/uploads/2017/08/user-placeholder.png';
  showCropper = false;
  rfidLoading=false;
  ngOnInit() { 
    if(this.usuarioService.getUsuarioEdit()){
      this.user = this.usuarioService.getUsuarioEdit();
      this.usuarioService.setUsuarioEdit(undefined);
      this.user.foto&&(this.croppedImage = Config.BASE_API_URL+'fotosPerfil/'+this.user._id+'.'+this.user.foto+'.png');
    }else if(this.route.snapshot.paramMap.get('id')){
      this._getUsuarioIDSub=this.usuarioService.getUsuarioID(this.route.snapshot.paramMap.get('id')).pipe(take(1)).subscribe((body)=>{
          this.user = body.user;
          if(this.user.permissao!='n')this.user.permissao='s';          
          body.user.foto&&(this.croppedImage = Config.BASE_API_URL+'fotosPerfil/'+body.user._id+'.'+body.user.foto+'.png');
        })
      } 
      else if(this.route.snapshot.url[0].path=='meuperfil'){
        this._getUsuarioIDSub=this.usuarioService.getUsuarioEu().pipe(take(1)).subscribe((body)=>{
          this.user = body.user;
          if(this.user.permissao!='n')this.user.permissao='s';        
          body.user.foto&&(this.croppedImage = Config.BASE_API_URL+'fotosPerfil/'+body.user._id+'.'+body.user.foto+'.png');
        })
    }
    
  }
  ngOnDestroy(): void {
    this._lendoConfirmacaoSub&&(this._lendoConfirmacaoSub.unsubscribe());
    this._novoRFIDSub&&(this._novoRFIDSub.unsubscribe());
    this._getFotoLarmSub&&(this._getFotoLarmSub.unsubscribe());
    this._getUsuarioIDSub&&(this._getUsuarioIDSub.unsubscribe());    
    this._cadastrarUsuarioSub&&(this._cadastrarUsuarioSub.unsubscribe());
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
    this._lendoConfirmacaoSub = this.socketService.lendoConfirmacao.subscribe(msg => {
      
      if(msg){
        console.log('lendo rfid ',msg);
        this._novoRFIDSub = this.socketService.novoRFID.pipe(take(1)).subscribe(rfid => {
          console.log('rfid lido',rfid);
          this.user.rfid=rfid;
          this.rfidLoading=false;
          //this._novoRFIDSub.unsubscribe();
        });
        this.rfidLoading=true;
      }else{        
        this.rfidLoading=false;
      }
    });
    this.socketService.emit('ler novo usuario');
  }
  downloadUrl(url: string, fileName: string) {
    let a: any = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  };
  cameraLarm(){
    this._getFotoLarmSub&&(this._getFotoLarmSub.unsubscribe());
    this.showCropper = true;
    this._getFotoLarmSub = this.socketService.getFotoLarm.subscribe(res=>this.imageCropper.imageBase64='data:image/jpeg;base64,'+res);    
    this.socketService.emit('get foto larm');
  }
  cadastrarUsuario() {
    this.submitted = true;
    console.log(this.user);
    
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
        if(res["user"].permissao!='n')this.user.permissao='s';
        delete this.user.password;
        this.user.foto&&(this.croppedImage = Config.BASE_API_URL+'fotosPerfil/'+this.user._id+'.'+this.user.foto+'.png');
        this.authService.refreshToken('email',null).pipe(take(1)).subscribe()
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
import { Config } from '../../../config';
import { ActivatedRoute } from '@angular/router';
import { NbAuthService } from '@nebular/auth';

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
    <button nbButton hero status="primary" (click)="dismiss()">OK</button>
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
