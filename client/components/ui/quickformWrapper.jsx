QuickFormWrapper = React.createClass({
  componentDidMount() {
    this.view = Blaze.renderWithData(Template.quickForm, this.props, ReactDOM.findDOMNode(this.refs.container));
  },
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  },
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
});
