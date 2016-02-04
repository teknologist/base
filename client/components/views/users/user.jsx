import React from 'react';
UserRow = React.createClass({
  render() {
    let user = this.props.user;

    return <tr key={ this.props._id }>
      <td className="vertical-align">{ React.helpers.userFullnameFromID(user._id) }</td>
      <td className="text-center vertical-align">{ (user.emails && user.emails.length >0)  ? user.emails[0].address : ' No email.' }</td>
      <td className="text-center vertical-align">{ user.roles }</td>
      <td className="text-center vertical-align">{ React.helpers.humanDate( user.createdAt ) }</td>
    </tr>;
  }
});
