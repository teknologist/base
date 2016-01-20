PublicNavigation = React.createClass({
  items: [
    { name: 'login', path: '/login', label: 'Login' },
    { name: 'invite', path: '/invite', label: 'Request Invite' }
  ],
  render() {
    return <Navbar>
      <NavbarItems position="navbar-right">
        { this.items.map( ( item, index ) => {
          return <li key={ `public-nav-item_${ index }` } className={ FlowHelpers.currentRoute( item.name ) }>
            <a href={ item.path }>{ item.label }</a>
          </li>;
        })}
      </NavbarItems>
    </Navbar>;
  }
});
