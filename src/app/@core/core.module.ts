import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
// import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { RoleProvider } from './role.provider';
const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'socicon-github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'socicon-facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'socicon-twitter',
  },
];
const formSetting: any = {
  redirectDelay: 100,
  showMessages: {
    success: true,
  },
};


export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({

    strategies: [
          NbPasswordAuthStrategy.setup({
            name: 'email',
            token: {
              class: NbAuthJWTToken,

              // key: 'token', // this parameter tells where to look for the token
            },
            baseEndpoint: 'https://larm-backend.herokuapp.com/auth/',

            login: {
             endpoint: 'login',
             method: 'post',
            },
            register: {
             endpoint: 'register',
             method: 'post',
            },
            /*logout: {
            endpoint: 'logout',
            method: 'get',

          },*/
            requestPass: {
             endpoint: 'request-pass',
             method: 'post',
            },
            resetPass: {
             endpoint: 'reset-pass',
             method: 'post',
            },
          }),
        ],

    forms: {
           login: formSetting,
           register: formSetting,
           requestPassword: formSetting,
           resetPassword: formSetting,
           logout: {
             redirectDelay: 0,
           },
         },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      user: {
        view: ['pages',
              'dashboard',
              'iot-dashboard',
              'FEATURES',
              'forms',
              'ui-features',
              'user',
              ''],
      },
      aluno: {
        parent: 'user',
        view: ['extra-components'],
      },
      professor: {
        parent: 'user',
        view: ['maps'],
      },
      admin: {
        view: '*',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: RoleProvider,
  },
  AnalyticsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
