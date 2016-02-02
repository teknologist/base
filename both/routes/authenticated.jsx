const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated'
});



authenticatedRoutes.route( '/dashboard', {
  name: 'dashboard',
  action() {
    ReactLayout.render( App, { yield: <Dashboard /> } );
  }
});

authenticatedRoutes.route( '/invites', {
  name: 'invites',
  action() {
    ReactLayout.render( App, { yield: <InvitesList /> } );
  }
});

authenticatedRoutes.route( '/tags', {
  name: 'tags',
  action() {
    ReactLayout.render( App, { yield: <TagsList /> } );
  }
});

authenticatedRoutes.route( '/outlets', {
  name: 'outlets',
  action() {
    ReactLayout.render( App, { yield: <OutletsList /> } );
  }
});

authenticatedRoutes.route( '/users', {
  name: 'users',
  action() {
    ReactLayout.render( App, { yield: <UsersList /> } );
  }
});
