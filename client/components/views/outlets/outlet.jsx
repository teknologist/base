var {RaisedButton} = MUI;

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
  render() {
    let outlet = this.props.outlet;

    return <tr key={this.props._id}>
      <td>{outlet.name}
      </td>
      <td className="vertical-align">{outlet.description}</td>
      <td className="text-center vertical-align">{outlet.tags}</td>
      <td className="text-center vertical-align">{React.helpers.userFullnameFromID(outlet.ownerID)}</td>
      <td className="text-center vertical-align">{React.helpers.humanDate(outlet.createdAt)}</td>
      <td className="text-center vertical-align">{outlet.active
          ? 'Active'
          : 'Inactive'}
      </td>
      <td className="text-center vertical-align">
        <RaisedButton label={outlet.active
          ? 'Disable'
          : 'Enable'} primary={outlet.active} onClick={this.toggleOutlet}/></td>
    </tr>;
  }
});
