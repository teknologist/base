import React from 'react';

import {
    AppCanvas,
    Toolbar,
    ToolbarGroup,
    ToolbarTitle,
    NotificationsIcon,
    ToolbarSeparator,
    Badge,
    LeftNav,
    Styles,
    RaisedButton,
    DatePicker,
    IconButton,
    IconMenu,
    MenuItem,
    ActionFace,
    Colors
  } from 'material-ui/lib';
import {SvgIcons} from 'material-ui/lib/styles';
var { ThemeManager, LightRawTheme } = Styles;



const iconStyles = {
  width: 66,
  height: 66
};

AuthenticatedNavigation = React.createClass({
  mixins: [ TrackerReact ],

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
      items.push( { name: 'users', path: '/users', label: 'Users Admin' } );
      items.push( { name: 'invites', path: '/invites', label: 'Invites' } );
          items.push( { name: 'outlets', path: '/outlets', label: 'Outlets' } );
      items.push( { name: 'tags', path: '/tags', label: 'Tags' } );
    }

    return items;
  },
  navigateToTarget(event,item) {
  //console.log(item);
   FlowRouter.go(item.props.value);
  },
  logout( event ) {
    event.preventDefault();
    return Meteor.logout( () => FlowRouter.go( '/login' ) );
  },
  testNotification( event ) {
        Meteor.call("testNotification", "eric@teknologism.org", "Test","Ceci est un Test", function (error, result) {
          if (error) {
             alert(error);
          } else {
        console.log(result);
          }
        });
  },
render: function () {
  return (<Toolbar >
  <ToolbarGroup firstChild={false} float="left">
           <ToolbarTitle text="Project Asteroid ❤ Meteor ❤ React ❤ Material UI" style={{ color:'White' }} />

               </ToolbarGroup>
               <ToolbarGroup float="right">
      <ToolbarSeparator  style={{ margin: '0 15px 0 0' , color:'White'}}/>


<NotificationsWidget />



    <IconMenu
      onItemTouchTap={ this.navigateToTarget }
      iconButtonElement={
        <IconButton style={iconStyles}><SvgIcons.ActionFace  color={ Styles.Colors.white } style={iconStyles}/></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        <MenuItem primaryText='Test Notifications'  onClick={ this.testNotification }/>


        { this.items().map( ( item, index ) => {
          return  <MenuItem primaryText={ item.label } key={ `authenticated-nav-item_${ index }` } value={ item.path } />;
        })}
        <MenuItem primaryText='Logout'  onClick={ this.logout }/>
      </IconMenu>
  </ToolbarGroup>

</Toolbar>
);
}







});
