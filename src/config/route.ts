import Home from '~/page/Home';
import Portrait from '~/page/Portrait';
import Scan from '~/page/Scan';
import Payment from '~/page/Payment';
import Ticket from '~/page/Ticket';
import NoMatch from '~/page/NoMatch';

export const EntryRoutes = ['/portrait', '/ticket'];

export default {
  noMatch: {
    path: '/',
    component: NoMatch
  },
  home: {
    path: '/:deviceID',
    component: Home,
    routes: {
      portrait: {
        path: EntryRoutes[0],
        component: Portrait
      },
      ticket: {
        path: EntryRoutes[1],
        component: Ticket
      },
      scan: {
        path: '/scan',
        component: Scan
      },
      payment: {
        path: '/payment',
        component: Payment
      }
    }
  },

  '*': {
    component: NoMatch,
    path: '*'
  }
};
