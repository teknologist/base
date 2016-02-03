import React from 'react';
SuccessAlert = React.createClass({
  render() {
    return <Alert style="success">
      { this.props.children }
    </Alert>;
  }
});
