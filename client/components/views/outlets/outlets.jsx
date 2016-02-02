
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
  selectSuggestion(suggest) {
    let placeId = suggest.placeId;
    var url ="https://maps.googleapis.com/maps/api/place/details/json?placeid=" +
          placeId +
          "&key=AIzaSyAyrlcT7R-GaqwseJaSwTZCPVAcrNCuOac";

        console.log("GooglePlaces Details API request:" + url);
        //asynchronous GET
        HTTP.get(url, function(error, result){
          if(error){
            console.log("error", error);
              throw new Meteor.Error(error);
          }
          if(result){
            if (result.statusCode == 200) {
              var respJson = JSON.parse(result.content);

              if (respJson.result) {
                var firstResult = respJson.result;
                console.log('##### > ' + JSON.stringify(respJson));


              } else {
                console.log("### No results for " + doc.name);
              }

            } else {
              console.log("Response issue: ", result.statusCode);
              var errorJson = JSON.parse(result.content);
              throw new Meteor.Error(result.statusCode, errorJson.error);
            }
          }
        });







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
            <Geosuggest placeholder="Type Here..." onSuggestSelect={this.selectSuggestion}/>
        <QuickFormWrapper collection="Outlets" id="insertOutletForm" type="method" meteormethod="submitOutlet" fields="name,description,address,telephone,tags"/>
    </div>

    ;
  }
});
