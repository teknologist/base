TagRow = React.createClass({
  render() {
    let tag = this.props.tag;

    return <tr key={ this.props._id }>
      <td># { tag.name }</td>
      <td className="vertical-align">{ tag.description }</td>
      <td className="text-center vertical-align">{ tag.synonyms }</td>
      <td className="text-center vertical-align">{ React.helpers.humanDate( tag.createdAt ) }</td>
    </tr>;
  }
});
