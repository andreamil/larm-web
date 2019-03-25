import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
// import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { RoleProvider } from './role.provider';

import { Config } from '../config';
const formSetting: any = {
  redirectDelay: 100,
  showMessages: {
    success: true,
  },
  defaultErrors: ['Algo deu errado, tente novamente.'],
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
            errors:{
              key:'err'
            },
            messages:{
              key:'msg'
            },
            baseEndpoint: Config.BASE_API_URL+'usuarios/',
            login: {
             endpoint: 'login',
             method: 'post',
             defaultErrors: ['Login/Senha incorreto, tente novamente.'],
             defaultMessages: ['Login efetuado com sucesso'],
            },
            register: {
             endpoint: 'register',
             method: 'post',
             defaultErrors: ['Erro ao registrar, tente novamente.'],
             defaultMessages: ['Registrado com sucesso'],
            },
            refreshToken: {
             requireValidToken: false,
             defaultMessages: ['Token atualizado'],
             defaultErrors: ['Erro atualizar Token'],
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
        view: ['paginas',
              'painel',
              'iot-dashboard',
              'FEATURES',
              'forms',
              'ui-features',
              'user',
              'banco-de-horas',
              'estoque',
              'projetos',
              'solicitacoes',
              'usuarios',
              'listar'],
      },
      aluno: {
        parent: 'user',
        view: ['extra-components'],
      },
      professor: {
        parent: 'user',
        view: ['maps', 'certificados', 'cadastro','novo-membro'],
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
