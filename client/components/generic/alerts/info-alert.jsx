import React from 'react';
InfoAlert = React.createClass({
  render() {
    return <Alert style="info">
      { this.props.children }
    </Alert>;
  }
});
