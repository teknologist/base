import React from 'react';
TabContent = React.createClass({
  render() {
    return <div className="tab-content">
      { this.props.children }
    </div>;
  }
});
