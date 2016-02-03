import {mount} from 'react-mounter';

FlowRouter.notFound = {
  name: 'notFound',
  action() {
    mount( App, { yield: <NotFound /> } );
  }
};

Accounts.onLogin( () => {
  let currentRoute = FlowRouter.current(),
      path         = currentRoute ? currentRoute.path : '/dashboard';

  return path !== '/login' ? FlowRouter.go( path ) : FlowRouter.go( '/dashboard' );
});
