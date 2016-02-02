
  OutletsList = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    let handle = Meteor.subscribe( 'outlets' );

    return {
      currentUser: Meteor.user(),
      columns: [

        { width: '20%', label: 'Name', className: '' },
        { width: '20%', label: 'Description', className: 'text-center' },
        { width: '10%', label: 'Tags', className: 'text-center' },
        { width: '10%', label: 'Owner', className: 'text-center' },
        { width: '20%', label: 'Created At', className: 'text-center' },
        { width: '10%', label: 'Active ?', className: 'text-center' },
        { width: '10%', label: '', className: 'text-center' }
      ],
      outlets: Outlets.find( { }, { sort: { createAt: -1 } } ).fetch()

    };
  },
  render() {
    return <div className="outlets">
      <PageHeader label="Outlets" />
      { this.data.outlets ?
        <Table context="outlets" columns={ this.data.columns }>
          { this.data.outlets.map( ( outlet ) => {
            return <OutletRow key={ outlet._id } outlet={ outlet } />;
          })}
        </Table>
        : <Loading />}

            <PageHeader label="Add a new Outlet" />

        <QuickFormWrapper collection="Outlets" id="insertOutletForm" type="method" meteormethod="submitOutlet" fields="name,description,address,telephone,tags"/>
    </div>

    ;
  }
});
