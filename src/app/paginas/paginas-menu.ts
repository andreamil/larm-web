import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Página Inicial',
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
    title: 'Usuários',
    icon: 'nb-person',
    data: {
      permission: 'view',
      resource: 'usuarios',
    },
    children: [
      {
        title: 'Cadastrar usuário',
        link: '/paginas/usuarios/criar-editar-usuario',
        data: {
          permission: 'create',
          resource: 'usuarios',
        },
      },
      {
        title: 'Lista de usuários',
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
        title: 'Histórico',
        link: '/paginas/porta/historico',
      },
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
          permission: 'view',
          resource: 'uso-laboratorio',
        },
        title: 'Uso do Laboratório',
        link: '/paginas/porta/uso-laboratorio',
      },
      {
        data: {
          permission: 'view',
          resource: 'uso-laboratorio-pessoa',
        },
        title: 'Uso do Laboratório por pessoa',
        link: '/paginas/porta/uso-laboratorio-pessoa',
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
    ],
  },
  {
    title: 'Solicitações',
    icon: 'nb-help',
    data: {
      permission: 'view',
      resource: 'solicitacoes',
    },
    children: [
      {
        title: 'Retirada de materiais',
        link: '/paginas/solicitacoes/retirada-de-materiais',
      },
      {
        title: 'Permanência fora do horário',
        link: '/paginas/solicitacoes/permanencia-fora-do-horario',
      },
      {
        title: 'Novo membro',
        link: '/paginas/solicitacoes/novo-membro',
        data: {
          permission: 'view',
          resource: 'novo-membro',
        },
      }
    ],
  },
  {
    title: 'Logs do Sistema',
    icon: 'nb-list',
    link: '/paginas/logs-sistema',
    data: {
      permission: 'view',
      resource: 'logs',
    },
  }
];
