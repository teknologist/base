import React from 'react';



import DatePicker from 'material-ui/lib/date-picker/date-picker';
import Divider from 'material-ui/lib/divider';
import Badge from 'material-ui/lib/badge';
import Snackbar from 'material-ui/lib/snackbar';
import LeftNav from 'material-ui/lib/left-nav';
import Colors from 'material-ui/lib/styles/colors';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import ActionFace from'material-ui/lib/svg-icons/action/face';


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

    if ( Roles.userIsInRole( this.getMeteorData().currentUserId, 'admin' ) ) {
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
        <IconButton style={iconStyles}><ActionFace  color={ Colors.white } style={iconStyles}/></IconButton>
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
