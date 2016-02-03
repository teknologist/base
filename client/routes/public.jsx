import {mount} from 'react-mounter';
import React from 'react';

const publicRoutes = FlowRouter.group({
  name: 'public'
});

publicRoutes.route( '/', {
  name: 'index',
  action() {
    mount(App, {yield: <Index /> } );
  }
})

publicRoutes.route( '/invite', {
  name: 'requestinvite',
  action() {
    mount(App, {yield: <RequestInvite /> } );
  }
})

publicRoutes.route( '/signup', {
  name: 'signup',
  action() {
    mount(App, {yield: <Signup /> } );
  }
});

publicRoutes.route( '/signup/:token', {
  name: 'signup',
  action( params ) {
    mount(App, {yield: <Signup token={ params.token } /> } );
  }
});

publicRoutes.route( '/login', {
  name: 'login',
  action() {
    mount(App, {yield: <Login /> } );
  }
});

publicRoutes.route( '/recover-password', {
  name: 'recoverPassword',
  action() {
    mount(App, {yield: <RecoverPassword /> } );
  }
});

publicRoutes.route( '/reset-password/:token', {
  name: 'resetPassword',
  action( params ) {
    mount(App, {yield: <ResetPassword token={ params.token } /> } );
  }
});
