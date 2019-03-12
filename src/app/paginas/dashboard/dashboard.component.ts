import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  statusCards: CardSettings[] = [
    {
      title: 'Luzes',
      iconClass: 'nb-lightbulb',
      type: 'primary',
    },
    {
      title: 'Cortina',
      iconClass: 'nb-roller-shades',
      type: 'success',
    },
    {
      title: 'Som',
      iconClass: 'nb-audio',
      type: 'info',
    },
    {
      title: 'Cafeteira',
      iconClass: 'nb-coffee-maker',
      type: 'warning',
    },
  ];

  constructor() {
  }

}
