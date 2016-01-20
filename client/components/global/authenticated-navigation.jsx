injectTapEventPlugin();

var {
    AppCanvas,
    AppBar,
    LeftNav,
    Styles,
    RaisedButton,
    DatePicker,
    IconButton,
    IconMenu,
    MenuItem,
    ActionFace
    } = MUI;

var { ThemeManager, LightRawTheme } = Styles;

let {SvgIcons} = MUI.Libs;
AuthenticatedNavigation = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    let user = Meteor.user();

    return {
      currentUserId: user._id,
      currentUserEmail: user.emails[ 0 ].address
    };
  },
  items() {
    let items = [
      { name: 'dashboard', path: '/dashboard', label: 'Dashboard' }
    ];

    if ( Roles.userIsInRole( this.data.currentUserId, 'admin' ) ) {
      items.push( { name: 'invites', path: '/invites', label: 'Invites' } );
    }

    return items;
  },
  navigateToTarget(event,item) {
  console.log(item);
   FlowRouter.go(item.props.value);
  },
  logout( event ) {
    event.preventDefault();
    return Meteor.logout( () => FlowRouter.go( '/login' ) );
  },
render: function () {
  return (<AppBar
    title='Project Asteroid ❤ Meteor ❤ React ❤ Material UI'

    iconElementRight={
  <IconMenu
    onItemTouchTap={ this.navigateToTarget }
    iconButtonElement={
      <IconButton><SvgIcons.ActionFace /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
      { this.items().map( ( item, index ) => {
        return  <MenuItem primaryText={ item.label } key={ `authenticated-nav-item_${ index }` } value={ item.path } />;
      })}
      <MenuItem primaryText='Logout'  onClick={ this.logout }/>
    </IconMenu>
}
></AppBar>
);
}







});
