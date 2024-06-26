import { Component} from '@angular/core';
@Component({
  selector: 'ngx-security-cameras',
  styleUrls: ['./security-cameras.component.scss'],
  templateUrl: './security-cameras.component.html',
})
export class SecurityCamerasComponent {

  cameras: any[]=[{}];

  selectedCamera: any;

  isSingleView = false;

  constructor(){
    for (let i of ['CAMERA-1','CAMERA-2','CAMERA-3', 'CAMERA-4']) {
      this.cameras[i]={};
      this.cameras[i].title= 'CAMERA #'+i;
      this.cameras[i].html= '<iframe id="iframe0" name="iframe0" src="/httpsCamera/'+i+'?ngsw-bypass=true" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>';
    }
    this.selectedCamera = this.cameras[0];
  }
  selectCamera(camera: any) {
    this.selectedCamera = this.cameras[camera];
    this.isSingleView = true;
  }
}
