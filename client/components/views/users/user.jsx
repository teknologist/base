UserRow = React.createClass({
  render() {
    let user = this.props.user;

    return <tr key={ this.props._id }>

      <td className="vertical-align">{ user.emails[0].address }</td>
      <td className="text-center vertical-align">{ user.roles }</td>
      <td className="text-center vertical-align">{ React.helpers.humanDate( user.createdAt ) }</td>
    </tr>;
  }
});
