import React from 'react';
WarningAlert = React.createClass({
  render() {
    return <Alert style="warning">
      { this.props.children }
    </Alert>;
  }
});
