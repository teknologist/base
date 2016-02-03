import React from 'react';
import {
    Badge,
    IconMenu,
    MenuItem,
    LeftNav,
    Styles,
    IconButton,
    SvgIcon,
    Colors,
    List,
    ListItem,
    Divider,
    Snackbar,
  } from 'material-ui';

var { ThemeManager, LightRawTheme } = Styles;

//let {SvgIcons} = MUI.Libs;
import SvgIcons from 'material-ui/lib/styles';

const iconStyles = {
  height: 24,
  width: 24
};

NotificationsWidget = React.createClass({
  mixins: [ TrackerReact ],

  getMeteorData() {

    let user = Meteor.user();
        Meteor.subscribe( 'notifications' );
          let newNotifications = Notifications.find({userId: user._id, snacked: false, readStatus: false},{sort: {createdAt: -1}}).fetch();
      let receivedNotifications = Notifications.find({userId: user._id, readStatus: false},{sort: {createdAt: -1}}).fetch();

      let lastNotification = '';
      if(newNotifications && newNotifications.length >0 ) {

        lastNotification = newNotifications[0].content;
      }
      let newIds = newNotifications.map(( item, index ) => {
            Bert.alert({
  title: item.title,
  message: item.content,
  type: 'notification',
  style: 'growl-bottom-right',
  icon: 'fa-bell-o'
});
          return item._id;
      });
if(newIds.length >0) {
  console.log("Snaking "+newIds.length+" Notifications.");

        Meteor.call("notificationsSnacked", newIds, function (error, result) {
          if (error) {
              console.log(error);
          } else if(result) {
    console.log("Snaked "+result+" Notifications.");
          }
        });

}


        return {
          notifications: receivedNotifications,
          hasNewNotifications : newNotifications.length >0,
          lastNotification : lastNotification
        };



  },
  // shouldComponentUpdate(nextProps, nextState) {
  //     console.log(JSON.stringify(nextProps)+" State:"+JSON.stringify(nextState));
  //     return true;
  // },
  handleRequestClose() {

 },
 markAllAsRead() {
var readNotificationsId = this.data.notifications.map(( item, index ) => {
  return item._id;
});



   Meteor.call("notificationsRead", readNotificationsId, function (error, result) {
     if (error) {
         console.log(error);
     } else if(result) {
console.log("Marked "+result+" Notifications as READ.");
     }
   });
 },
  navigateToTarget(event,item) {
  //console.log(item);
   FlowRouter.go(item.props.value);
 },

  render() {

      console.log("Render New Notification: "+JSON.stringify(this.data.lastNotification));
      return (<span>
        {this.data.notifications.length > 0 ?
       <IconMenu
      onItemTouchTap={ this.navigateToTarget }
      iconButtonElement={

        <Badge
          badgeContent={ this.data.notifications.length }
          badgeStyle={{ top: 12, right: 12 }}
          primary={true}
        >
          <SvgIcons.SocialNotifications  color={ Styles.Colors.white } hoverColor={ Styles.Colors.pinkA200 } style={ iconStyles } />
        </Badge>

      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
{this.data.notifications.length > 0 ?
    <div><ListItem primaryText='Mark all as read'  leftIcon={<SvgIcons.SocialNotifications/>}  onTouchTap={ this.markAllAsRead }/><Divider /></div>
 : ''}
        {
          this.data.notifications.map( ( item, index ) => {
            console.log("itemId: "+item._id);
            return  <div key={ `notification-div_${ item._id }` } ><ListItem primaryText={ item.title  } key={ `notification-item_${ item._id }` } value={ item._id }  secondaryText={ item.content } /><Divider key={ `notification-divider_${ item._id }` }/></div>;
          })

        }

              </IconMenu>
            :   <SvgIcons.SocialNotifications  color={ Styles.Colors.white } hoverColor={ Styles.Colors.pinkA200 } style={ iconStyles }/>

        }
            </span>

    );

  }


});
