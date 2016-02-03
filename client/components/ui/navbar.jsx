import React from 'react';
Navbar = React.createClass({
  render() {
    return <div id="navbar-collapse" className="collapse navbar-collapse">
      { this.props.children }
    </div>;
  }
});
