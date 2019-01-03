import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Painel',
    icon: 'nb-e-commerce',
    link: '/pages/dashboard',
    home: true,
    data: {
      permission: 'view',
      resource: 'dashboard',
    },
  },
  {
    title: 'Painel IoT',
    icon: 'nb-home',
    link: '/pages/iot-dashboard',
    data: {
      permission: 'view',
      resource: 'iot-dashboard',
    },
  },
  {
    title: 'Gerenciamento',
    group: true,
    data: {
      permission: 'view',
      resource: 'Gerenciamento',
    },
  },
  {
    title: 'Usuarios',
    icon: 'nb-person',
    data: {
      permission: 'view',
      resource: 'usuarios',
    },
    children: [
      {
        title: 'Cadastrar usuario',
        link: '/pages/usuarios/cadastrar',
      },
      {
        title: 'Lista de usuarios',
        link: '/pages/usuarios/lista',
      },
    ],
  },

  {
    title: 'Projetos',
    icon: 'nb-compose',
    data: {
      permission: 'view',
      resource: 'projetos',
    },
    children: [
      {
        title: 'Criar projeto',
        link: '/pages/projetos/criar',
      },
      {
        title: 'Meus Projetos',
        link: '/pages/projetos/eu',
      },
      {
        title: 'Todos os Projetos',
        link: '/pages/projetos/todos',
      },
    ],
  },
  {
    title: 'Porta',
    icon: 'nb-locked',
    link: '/pages/banco-de-horas',
    data: {
      permission: 'view',
      resource: 'porta',
    },
    children: [
      {
        data: {
          permission: 'create',
          resource: 'porta',
        },
        title: 'Registrar entrada/saida teste',
        link: '/pages/banco-de-horas/registrar-entrada-saida',
      },
      {
        data: {
          permission: 'create',
          resource: 'porta',
        },
        title: 'Gerar Relatório',
        link: '/pages/banco-de-horas/relatorio',
      },
      {
        title: 'Histórico',
        link: '/pages/banco-de-horas/meu-relatorio',
      },
    ],
  },

  {
    title: 'Estoque',
    icon: 'nb-grid-a',
    link: '/pages/estoque',
    data: {
      permission: 'view',
      resource: 'estoque',
    },
    children: [
      {
        title: 'Grid',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'Typography',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/pages/ui-features/search-fields',
      },
    ],
  },
  {
    title: 'Modal & Overlays',
    icon: 'nb-layout-default',
    data: {
      permission: 'view',
      resource: 'ModaleOverlays',
    },
    children: [
      {
        title: 'Dialog',
        link: '/pages/modal-overlays/dialog',
      },
      {
        title: 'Window',
        link: '/pages/modal-overlays/window',
      },
      {
        title: 'Popover',
        link: '/pages/modal-overlays/popover',
      },
      {
        title: 'Toastr',
        link: '/pages/modal-overlays/toastr',
      },
      {
        title: 'Tooltip',
        link: '/pages/modal-overlays/tooltip',
      },
    ],
  },
  {
    title: 'Bootstrap',
    icon: 'nb-gear',
    data: {
      permission: 'view',
      resource: 'bootstrap',
    },
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/bootstrap/inputs',
      },
      {
        title: 'Buttons',
        link: '/pages/bootstrap/buttons',
      },
      {
        title: 'Modal',
        link: '/pages/bootstrap/modal',
      },
    ],
  },
  {
    title: 'Maps',
    icon: 'nb-location',
    data: {
      permission: 'view',
      resource: 'maps',
    },
    children: [
      {
        title: 'Google Maps',
        link: '/pages/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/pages/maps/bubble',
      },
      {
        title: 'Search Maps',
        link: '/pages/maps/searchmap',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'nb-bar-chart',
    data: {
      permission: 'view',
      resource: 'charts',
    },
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
      },
    ],
  },
  {
    title: 'Editors',
    icon: 'nb-title',
    data: {
      permission: 'view',
      resource: 'editors',
    },
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Tables',
    icon: 'nb-tables',
    data: {
      permission: 'view',
      resource: 'tables',
    },
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
    ],
  },
  {
    title: 'Miscellaneous',
    icon: 'nb-shuffle',
    data: {
      permission: 'view',
      resource: 'miscellaneous',
    },
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    data: {
      permission: 'view',
      resource: 'auth',
    },
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
