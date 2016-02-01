const publicRoutes = FlowRouter.group({
  name: 'public'
});

publicRoutes.route( '/', {
  name: 'index',
  action() {
    ReactLayout.render( App, { yield: <Index /> } );
  }
})

publicRoutes.route( '/invite', {
  name: 'requestinvite',
  action() {
    ReactLayout.render( App, { yield: <RequestInvite /> } );
  }
})

publicRoutes.route( '/signup', {
  name: 'signup',
  action() {
    ReactLayout.render( App, { yield: <Signup /> } );
  }
});

publicRoutes.route( '/signup/:token', {
  name: 'signup',
  action( params ) {
    ReactLayout.render( App, { yield: <Signup token={ params.token } /> } );
  }
});

publicRoutes.route( '/login', {
  name: 'login',
  action() {
    ReactLayout.render( App, { yield: <Login /> } );
  }
});

publicRoutes.route( '/recover-password', {
  name: 'recoverPassword',
  action() {
    ReactLayout.render( App, { yield: <RecoverPassword /> } );
  }
});

publicRoutes.route( '/reset-password/:token', {
  name: 'resetPassword',
  action( params ) {
    ReactLayout.render( App, { yield: <ResetPassword token={ params.token } /> } );
  }
});
