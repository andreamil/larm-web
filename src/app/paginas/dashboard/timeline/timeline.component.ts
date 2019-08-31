import { Component, OnDestroy, OnInit, ViewChild, ElementRef, ComponentFactoryResolver, Injector, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
// import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { Timeline, DataSet,  } from 'vis';
// import { UserService } from '../../../@core/data/users.service';
import { RegistroService } from '../../registro.service';
import { Config } from '../../../config';
import { SocketService } from '../../socket.service';
import { Subscription } from 'rxjs';
import { TempoTotalPipe } from '../../../@theme/pipes/tempo-total.pipe';
import { take } from 'rxjs/operators';
import { NbLarmUserComponent } from '../../../@theme/components/larm-user/larm-user.component';

@Component({
  selector: 'ngx-timeline',
  styleUrls: ['./timeline.component.scss'],
  templateUrl: './timeline.component.html',
  providers: [TempoTotalPipe],entryComponents:[NbLarmUserComponent]
})
export class TimelineComponent implements OnInit, OnDestroy {
  @ViewChild('timeline', { static: true }) timelineContainer: ElementRef;
  @ViewChild('usercontainer', { read: ViewContainerRef, static: true }) entry: ViewContainerRef ;
  componentFactory ;
  componentRef;
  tlContainer: any;
  timeline: Timeline;
  options={};

  registros: any[];
  baseUrl = Config.BASE_API_URL;
  private _getUsuariosLabSub: Subscription;
  groups: any;
  data: any;
  
  constructor(private socketService:SocketService,private registroService:RegistroService,private tempoTotalPipe:TempoTotalPipe,private componentFactoryResolver: ComponentFactoryResolver,

    private ref: ChangeDetectorRef) {
    
    this.getTimeline();
    this._getUsuariosLabSub = this.socketService.getUsuariosNoLab.subscribe(()=>{
      this.getTimeline();
    })
  }
  tempoTotal(value) {
    return this.tempoTotalPipe.transform(value);
  }
  ngOnInit() {
    // this.usuariosService.getUsuariosNoLab().then((response)=>{
    //   this.registros= response.registros;
    // })
  }
  ngAfterViewInit() {     
    this.tlContainer = this.timelineContainer.nativeElement;       
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(NbLarmUserComponent);
    console.log(this.componentFactory,this.entry)
    var me=this;
    this.options = {
      stack: false,
      start: new Date(new Date().setHours(-24)),
      end: new Date(),//new Date(new Date().setHours(24,0,0,0)),
      editable: false,
      margin: {
        item: 10, // minimal margin between items
        axis: 5   // minimal margin between items and the axis
      },
      orientation: 'top',
      groupTemplate: function (item, element) {
        setTimeout(function(){ 
          const componentRef = me.entry.createComponent(me.componentFactory);
          (<NbLarmUserComponent>componentRef.instance).usuario = item.data;
          (<NbLarmUserComponent>componentRef.instance).onlyPicture= true;
          // element.clear();
          element.appendChild(componentRef.hostView['rootNodes'][0]);
          me.ref.detectChanges()
        }, 10); 
        return '<div></div>';
    },
    };
    this.timeline = new Timeline(this.tlContainer, null, this.options); 
    me.ref.detectChanges()
    this.getTimeline();
  }
  getTimeline() {
    this.registroService.getRegistroHistoricoHoje().then((response)=>{
      this.registros= response.registros;
      this.groups=new DataSet(response.usuarios.map(usuario => ({id:usuario._id, 
        /*content:`
      <nb-user class="medium" style="display: flex;"><div class="user-container"><div style="cursor:pointer;
      position: relative;
      display: flex;
      align-items: center;">
      <div class="user-picture image" style="background-image: url(http://150.162.234.151:45454/fotosPerfil/${usuario._id}.${usuario.foto}.png);
      position: relative;
      border-radius: 50%;
      flex-shrink: 0;
      background-size: cover;
      background-repeat: no-repeat;" alt="${usuario.fullName}">
      </div></div><div  class="info-container" style="
      margin-left: 0.5rem;"><div>
      </div></div></div></nb-user>`,*/ data:usuario})));
      console.log(response)
      this.timeline.setGroups(this.groups);
      this.data=new DataSet(this.registros.map(registro =>({ id: registro._id, start: new Date(registro.horaEntrada), end: registro.horaSaida?new Date(registro.horaSaida):new Date(), content: this.tempoTotal(registro), group: registro.usuario})));
      this.timeline.setItems(this.data);
      this.ref.detectChanges()
      })
    }

  ngOnDestroy() {
    // this.themeSubscription.unsubscribe();
    this._getUsuariosLabSub&&(this._getUsuariosLabSub.unsubscribe());
  }
  
}
