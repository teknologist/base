import React from 'react';
import {RaisedButton, FlatButton} from'material-ui/lib';

OutletRow = React.createClass({
  toggleOutlet() {

    Meteor.call("toggleOutlet", this.props.outlet._id, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
        Bert.alert({
          title: "Outlet " + result.name,
          message: "Outlet " + result.name + " " + (result.active
            ? 'enabled'
            : 'disabled') + ".",
          type: 'notification',
          style: 'growl-bottom-right',
          icon: 'fa-bell-o'
        });

      }
    });

  },
  editOutlet(row) {
    let outletId = this.props.outlet._id;
    let outlet = Outlets.findOne(outletId);
    let newState = row.state;
    newState.newOutlet = outlet;
    newState.editMode = true;
    row.setState(newState);
  },

  render() {
    let outlet = this.props.outlet;

    return <tr key={this.props._id}>
      <td>{outlet.name}
      </td>
      <td className="vertical-align">{outlet.description}</td>
      <td className="text-center vertical-align">{React.helpers.printTags(outlet.tags)}</td>
      <td className="text-center vertical-align">{React.helpers.userFullnameFromID(outlet.ownerID)}</td>
      <td className="text-center vertical-align">{React.helpers.humanDate(outlet.createdAt)}</td>

      { React.helpers.isAdmin()
        ? <td className="text-center vertical-align"><span>{outlet.active
              ? 'Active'
              : 'Inactive'}
            </span>
          </td>
        : ''}
        { React.helpers.isOwner(this.props.outlet)
          ? <td className="text-center vertical-align">
              <FlatButton label='Edit' secondary={true} onClick={this.editOutlet.bind(this, this.props.parentRow)}/></td>
          : ''
  }
      { React.helpers.isAdmin()
        ? <td className="text-center vertical-align">
            <FlatButton label={outlet.active
              ? 'Disable'
              : 'Enable'} primary={outlet.active} onClick={this.toggleOutlet}/></td>
        : ''}
    </tr>;
  }
});
