import { Component, OnInit, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-cadastrar-usuarios',
  templateUrl: './cadastrar-usuarios.component.html',
  styleUrls: ['./cadastrar-usuarios.component.scss'],
})
export class CadastrarUsuariosComponent implements OnInit, OnDestroy {
  options = [
    { value: 'user', label: 'User' },
    { value: 'aluno', label: 'Aluno' },
    { value: 'professor', label: 'Professor' }
  ];
  option: any;
  user: any = {}
  submitted = false;
  rfidButtonText = 'Ler RFID'
  password: any;
  constructor(private usuarioService: UsuariosService, private dialogService: NbDialogService,private http: HttpClient,private socketService: SocketService) { }

  private _lendoConfirmacaoSub: Subscription;
  private _novoRFIDSub: Subscription;
  ngOnInit() {
  }
  ngOnDestroy(): void {
    this._lendoConfirmacaoSub&&(this._lendoConfirmacaoSub.unsubscribe());
    this._novoRFIDSub&&(this._novoRFIDSub.unsubscribe());
  }
  imageChangedEvent: any = '';
  croppedImage: any = 'http://sg-fs.com/wp-content/uploads/2017/08/user-placeholder.png';
  showCropper = false;
  rfidLoading=false;
  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      this.showCropper = true;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  lerRFID(){
    this._lendoConfirmacaoSub = this.socketService.lendoConfirmacao.subscribe(msg => {
      
      if(msg){
        console.log('lendo rfid ',msg);
        this._novoRFIDSub = this.socketService.novoRFID.subscribe(rfid => {
          console.log('rfid lido',rfid);
          this.user.rfid=rfid;
          this.rfidLoading=false;
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
  cameraLarm(url: string, fileName: string){
    /*this.http.get(url, { responseType: 'blob' }).subscribe(val => {
      console.log(val);
      let url = URL.createObjectURL(val);
      this.downloadUrl(url, fileName);
      URL.revokeObjectURL(url);
    });*/
    this.croppedImage = "http://150.162.234.21:8888/HP%20Webcam%20HD-4110/poll.php";
  }
  cadastrarUsuario() {
    this.submitted = true;
    this.usuarioService.cadastrarUsuario(this.user).subscribe((res) => {
      this.dialogService.open(DialogUsuarioComponent, {
        context: {
          title: res["success"]?"Sucesso":"Falha",
          conteudo: res["msg"],
        },
        closeOnBackdropClick: false
      });
      console.log(res);
      this.submitted = false;
    })
  }

}
import { NbDialogRef } from '@nebular/theme';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../../socket.service';
import { Subscription } from 'rxjs';

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
