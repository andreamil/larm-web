import { Component, Input, HostBinding } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { convertToBoolProperty } from '../../../helpers';
import { Config } from '../../../config';
import {UserPopoverComponent } from './user-popover.component'
/**
 * Represents a component showing a user avatar (picture) with a user name on the right.
 * @stacked-example(Showcase, user/user-showcase.component)
 *
 * ```ts
 *   <nb-user name="John Doe" title="Engineer"></nb-user>
 * ```
 *
 * ### Installation
 *
 * Import `NbUserModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbUserModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Available in multiple sizes:
 * @stacked-example(Multiple Sizes, user/user-sizes.component)
 *
 *
 * You can hide unnecessary captions (name, title or both):
 * @stacked-example(Hide captions in user component, user/user-hide-captions.component)
 *
 *
 * You can set custom avatar background-color, user image (as link or BASE64 string) and disable user initials:
 * @stacked-example(Avatar image settings, user/user-avatar-settings.component)
 *
 *
 * @styles
 *
 * user-font-size:
 * user-line-height:
 * user-bg:
 * user-fg:
 * user-fg-highlight:
 * user-font-family-secondary:
 * user-size-small:
 * user-size-medium:
 * user-size-large:
 * user-size-xlarge:
 */
@Component({
  selector: 'nb-user',
  styleUrls: ['./larm-user.component.scss'],
  templateUrl: './larm-user.component.html',
})
export class NbLarmUserComponent {
    baseUrl: string=Config.BASE_API_URL;
    userPopoverComponent = UserPopoverComponent;
    user:any;
  // TODO: it makes sense use object instead of list of variables (or even enum)
  /*
    static readonly SIZE = {
     SMALL: 'small',
     MEDIUM: 'medium',
     LARGE: 'large',
    };
   */
  static readonly SIZE_SMALL = 'small';
  static readonly SIZE_MEDIUM = 'medium';
  static readonly SIZE_LARGE = 'large';
  static readonly SIZE_XLARGE = 'xlarge';

  private sizeValue: string;

  @HostBinding('class.inverse') inverseValue: boolean;

  @HostBinding('class.small')
  get small() {
    return this.sizeValue === NbLarmUserComponent.SIZE_SMALL;
  }

  @HostBinding('class.medium')
  get medium() {
    return this.sizeValue === NbLarmUserComponent.SIZE_MEDIUM;
  }

  @HostBinding('class.large')
  get large() {
    return this.sizeValue === NbLarmUserComponent.SIZE_LARGE;
  }

  @HostBinding('class.xlarge')
  get xlarge() {
    return this.sizeValue === NbLarmUserComponent.SIZE_XLARGE;
  }

  @Input() set usuario(user: any) {
    this.user=user;
    user.fullName&&(this.name=user.fullName.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }));
    user.role&&(this.title=user.role);
    this.imageBackgroundStyle = user.foto ? this.domSanitizer.bypassSecurityTrustStyle(`url(${this.baseUrl+'fotosPerfil/'+user._id+'.'+user.foto+'.png'})`) : null;
  }
  /**
   * Specifies a name to be shown on the right of a user picture
   * @type string
   */
  @Input() name: string = 'Anonymous';

  @Input() link: boolean = true;




  /**
   * Specifies a title (written in a smaller font) to be shown under the **name**
   * @type string
   */
  @Input() title: string;

  /**
   * Absolute path to a user picture. Or base64 image
   * User name initials (JD for John Doe) will be shown if no picture specified
   * @type string
   */
  @Input() set picture(value: string) {
    this.imageBackgroundStyle = value ? this.domSanitizer.bypassSecurityTrustStyle(`url(${value})`) : null;
  }

  /**
   * Color of the area shown when no picture specified
   * @type string
   */
  @Input() color: string;

  /**
   * Size of the component, small|medium|large|xlarge
   * @type string
   */
  @Input()
  set size(val: string) {
    this.sizeValue = val;
  }

  /**
   * Whether to show a user name or not
   * @type boolean
   */
  @Input()
  set showName(val: boolean) {
    this.showNameValue = convertToBoolProperty(val);
  }

  /**
   * Whether to show a user title or not
   * @type boolean
   */
  @Input()
  set showTitle(val: boolean) {
    this.showTitleValue = convertToBoolProperty(val);
  }

  /**
   * Whether to show a user initials (if no picture specified) or not
   * @type boolean
   */
  @Input()
  set showInitials(val: boolean) {
    this.showInitialsValue = convertToBoolProperty(val);
  }

  /**
   * Whether to show only a picture or also show the name and title
   * @type boolean
   */
  @Input()
  set onlyPicture(val: boolean) {
    this.showNameValue = this.showTitleValue = !convertToBoolProperty(val);
  }

  /**
   * Makes colors inverse based on current theme
   * @type boolean
   */
  @Input()
  set inverse(val: boolean) {
    this.inverseValue = convertToBoolProperty(val);
  }

  /**
   * Badge text to display
   * @type string
   */
  @Input() badgeText: string;

  /**
   * Badge status (adds specific styles):
   * 'primary', 'info', 'success', 'warning', 'danger'
   * @param {string} val
   */
  @Input() badgeStatus: string;

  /**
   * Badge position.
   * Can be set to any class or to one of predefined positions:
   * 'top left', 'top right', 'bottom left', 'bottom right',
   * 'top start', 'top end', 'bottom start', 'bottom end'
   * @type string
   */
  @Input() badgePosition: string;

  imageBackgroundStyle: SafeStyle;
  showNameValue: boolean = true;
  showTitleValue: boolean = true;
  showInitialsValue: boolean = true;
  isMenuShown: boolean = false;

  constructor(private domSanitizer: DomSanitizer) { }

  getInitials(): string {
    if (this.name) {
      const names = this.name.split(' ');

      return names.map(n => n.charAt(0)).splice(0, 2).join('').toUpperCase();
    }

    return '';
  }
}