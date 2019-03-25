import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Painel',
    icon: 'nb-home',
    link: '/paginas/painel',
    data: {
      permission: 'view',
      resource: 'painel',
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
        link: '/paginas/usuarios/criar-editar-usuario',
      },
      {
        title: 'Lista de usuarios',
        link: '/paginas/usuarios/listar',
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
        link: '/paginas/projetos/criar',
      },
      {
        title: 'Meus Projetos',
        link: '/paginas/projetos/meus',
      },
      {
        title: 'Todos os Projetos',
        link: '/paginas/projetos/todos',
      },
    ],
  },
  {
    title: 'Porta',
    icon: 'nb-locked',
    link: '/paginas/banco-de-horas',
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
        link: '/paginas/porta/registrar-entrada-saida',
      },
      {
        data: {
          permission: 'create',
          resource: 'porta',
        },
        title: 'Gerar Relatório',
        link: '/paginas/porta/relatorio',
      },
      {
        title: 'Histórico',
        link: '/paginas/porta/historico',
      },
    ],
  },

  {
    title: 'Estoque',
    icon: 'nb-grid-a',
    link: '/paginas/estoque',
    data: {
      permission: 'view',
      resource: 'estoque',
    },
    children: [
      {
        title: 'Grid',
        link: '/paginas/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/paginas/ui-features/icons',
      },
      {
        title: 'Typography',
        link: '/paginas/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/paginas/ui-features/search-fields',
      },
    ],
  },
  {
    title: 'Solicitações',
    icon: 'nb-info',
    data: {
      permission: 'view',
      resource: 'solicitacoes',
    },
    children: [
      {
        title: 'RETIRADA DE  MATERIAIS',
        link: '/paginas/solicitacoes/retirada-de-materiais',
      },
      {
        title: 'PERMANECIA FORA DO HORÁRIO',
        link: '/paginas/solicitacoes/permanencia-fora-do-horario',
      },
      {
        title: 'NOVO MEMBRO',
        link: '/paginas/solicitacoes/novo-membro',
        data: {
          permission: 'view',
          resource: 'novo-membro',
        },
      }
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
        link: '/paginas/bootstrap/inputs',
      },
      {
        title: 'Buttons',
        link: '/paginas/bootstrap/buttons',
      },
      {
        title: 'Modal',
        link: '/paginas/bootstrap/modal',
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
        link: '/paginas/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/paginas/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/paginas/maps/bubble',
      },
      {
        title: 'Search Maps',
        link: '/paginas/maps/searchmap',
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
        link: '/paginas/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/paginas/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/paginas/charts/d3',
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
        link: '/paginas/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/paginas/editors/ckeditor',
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
        link: '/paginas/tables/smart-table',
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
        link: '/paginas/miscellaneous/404',
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
