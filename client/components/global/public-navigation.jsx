
var {
    AppCanvas,
    Toolbar,
    ToolbarGroup,
    ToolbarTitle,
    ToolbarSeparator,
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
   FlowRouter.go(item.props.value);
 },
  render: function () {

    return (<Toolbar>
    <ToolbarGroup firstChild={true} float="left">
             <ToolbarTitle text="Project Asteroid ❤ Meteor ❤ React ❤ Material UI" />
    </ToolbarGroup>
    <ToolbarGroup float="right">

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
      </ToolbarGroup>
    </Toolbar>
);
}
});
