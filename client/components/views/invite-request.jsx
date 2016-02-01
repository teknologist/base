RequestInvite = React.createClass({
  componentDidMount() {
    let refs = this.refs,
        form = React.findDOMNode( refs.requestForm );

    $( form ).validate({
      rules: {
        emailAddress: { required: true, email: true }
      },
      submitHandler() {
        let email = React.findDOMNode( refs.emailAddress );

        Meteor.call( 'addToInvitesList', email.value, ( error ) => {
          if ( error ) {
            Bert.alert( error.reason );
          } else {
            email.value = "";
            Bert.alert( 'Invite requested. We\'ll be in touch soon. Thanks for your interest in Project Asteroid!' );
          }
        });
      }
    });
  },
  handleSubmit( event ) {
    event.preventDefault();
  },
  render() {
    return <div classNameName="index">
      <PageHeader label="Request an Invite to Project Asteroid." />

      <p>Project Asteroid is a super secret app that's launching soon! Type in your email below to get on the beta list.</p>
      <Form ref="requestForm" id="request-beta-invite" className="email-form" onSubmit={ this.handleSubmit }>
        <Input
          ref="emailAddress"
          type="email"
          name="emailAddress"
          className="form-control"
          placeholder="e.g. beatrix@beta.com"
        />
      <Button type="submit" buttonStyle="success" label="Request Beta Invite" />
      </Form>
    </div>;
  }
});
