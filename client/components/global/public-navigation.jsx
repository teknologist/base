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
          <IconButton><ActionFace /></IconButton>
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
