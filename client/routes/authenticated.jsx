import {mount} from 'react-mounter';
import React from 'react';
const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated'
});



authenticatedRoutes.route( '/dashboard', {
  name: 'dashboard',
  action() {
    mount(App, {
        yield: (<Dashboard />)
      });
  }
});

authenticatedRoutes.route( '/invites', {
  name: 'invites',
  action() {
    mount(App, {yield: <InvitesList /> } );
  }
});

authenticatedRoutes.route( '/tags', {
  name: 'tags',
  action() {
    mount(App, {yield: <TagsList /> } );
  }
});

authenticatedRoutes.route( '/outlets', {
  name: 'outlets',
  action() {
    mount(App, {yield: <OutletsList /> } );
  }
});

authenticatedRoutes.route( '/users', {
  name: 'users',
  action() {
    mount(App, {yield: <UsersList /> } );
  }
});
