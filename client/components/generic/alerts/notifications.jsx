import React from 'react';


import Divider from 'material-ui/lib/divider';
import Badge from 'material-ui/lib/badge';
import Snackbar from 'material-ui/lib/snackbar';
import LeftNav from 'material-ui/lib/left-nav';
import SocialNotifications from 'material-ui/lib/svg-icons/social/notifications';
import Colors from 'material-ui/lib/styles/colors';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

const iconStyles = {
  height: 24,
  width: 24
};

NotificationsWidget = React.createClass({
  mixins: [TrackerReact],

  getMeteorData() {

    let user = Meteor.user();
    Meteor.subscribe('notifications');
    let newNotifications = Notifications.find({
      userId: user._id,
      snacked: false,
      readStatus: false
    }, {
      sort: {
        createdAt: -1
      }
    }).fetch();
    let receivedNotifications = Notifications.find({
      userId: user._id,
      readStatus: false
    }, {
      sort: {
        createdAt: -1
      }
    }).fetch();

    let lastNotification = '';
    if (newNotifications && newNotifications.length > 0) {

      lastNotification = newNotifications[0].content;
    }
    let newIds = newNotifications.map((item, index) => {
      Bert.alert({title: item.title, message: item.content, type: 'notification', style: 'growl-bottom-right', icon: 'fa-bell-o'});
      return item._id;
    });
    if (newIds.length > 0) {
      console.log("Snaking " + newIds.length + " Notifications.");

      Meteor.call("notificationsSnacked", newIds, function(error, result) {
        if (error) {
          console.log(error);
        } else if (result) {
          console.log("Snaked " + result + " Notifications.");
        }
      });

    }

    return {
      notifications: receivedNotifications,
      hasNewNotifications: newNotifications.length > 0,
      lastNotification: lastNotification
    };

  },
  // shouldComponentUpdate(nextProps, nextState) {
  //     console.log(JSON.stringify(nextProps)+" State:"+JSON.stringify(nextState));
  //     return true;
  // },
  handleRequestClose() {},
  markAllAsRead() {
    var readNotificationsId = this.getMeteorData().notifications.map((item, index) => {
      return item._id;
    });

    Meteor.call("notificationsRead", readNotificationsId, function(error, result) {
      if (error) {
        console.log(error);
      } else if (result) {
        console.log("Marked " + result + " Notifications as READ.");
      }
    });
  },
  navigateToTarget(event, item) {
    //console.log(item);
    FlowRouter.go(item.props.value);
  },

  render() {

    console.log("Render New Notification: " + JSON.stringify(this.getMeteorData().lastNotification));
    return (
      <span>
        {(this.getMeteorData().notifications && this.getMeteorData().notifications.length > 0)
          ? <IconMenu onItemTouchTap={this.navigateToTarget} iconButtonElement={<Badge badgeContent={this.getMeteorData().notifications.length} badgeStyle={{
              top: 12,
              right: 12
            }} primary={true}>
              <SocialNotifications color={Colors.white} hoverColor={Colors.pinkA200} style={iconStyles}/>
            </Badge>} targetOrigin={{
              horizontal: 'right',
              vertical: 'top'
            }} anchorOrigin={{
              horizontal: 'right',
              vertical: 'top'
            }}>
              {this.getMeteorData().notifications && this.getMeteorData().notifications.length > 0
                ? <div><ListItem primaryText='Mark all as read' leftIcon={<SocialNotifications/>} onTouchTap={this.markAllAsRead}/><Divider/></div>
                : ''}
              {this.getMeteorData().notifications.map((item, index) => {
                console.log("itemId: " + item._id);
                return <div key={`notification-div_${item._id}`}><ListItem primaryText={item.title} key={`notification-item_${item._id}`} value={item._id} secondaryText={item.content}/><Divider key={`notification-divider_${item._id}`}/></div>;
              })
}

            </IconMenu>
          : <SocialNotifications color={Colors.white} hoverColor={Colors.pinkA200} style={iconStyles}/>
}
      </span>

    );

  }

});
