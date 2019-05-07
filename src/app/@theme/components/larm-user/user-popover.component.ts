import { Component } from "@angular/core";
import { Config } from '../../../config';
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

@Component({
    selector: 'user-popover',
    styleUrls: ['./larm-user.component.scss'],
    templateUrl: './user-popover.component.html',
  })
  export class UserPopoverComponent {
    name:string;
    imageBackgroundStyle:SafeStyle;
    title:string;
    baseUrl:string;
    domSanitizer: DomSanitizer;
  }