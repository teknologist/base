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
PublicNavigation = React.createClass({

  items: [
    { name: 'login', path: '/login', label: 'Login' },
    { name: 'invite', path: '/invite', label: 'Request Invite' }
  ],
 navigateToTarget(event,item) {
   console.log(item);
   FlowRouter.go(item.props.value);
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
        { this.items.map( ( item, index ) => {
          return  <MenuItem primaryText={ item.label } key={ `public-nav-item_${ index }` } value={ item.path }/>;
        })}

      </IconMenu>
  }
  ></AppBar>
);
}
});
