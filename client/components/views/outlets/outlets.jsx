var {RaisedButton, TextField} = MUI;

const placeInfosReactive = new ReactiveVar();
OutletsList = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      newOutlet: {
        name: '',
        description: 'Describe the Outlet',
        address: {},
        fullAddress: '',
        telephone: '',
        tags: [],
        serviceSchedule: ''
      }
    };
  },
  getMeteorData() {
    let handle = Meteor.subscribe('outlets');
    let suggestionsHandle = Meteor.subscribe('tags');
    let place = placeInfosReactive.get();
    let placeInfos = {};
    if (place) {
      placeInfos = place;
    }
    return {
      currentUser: Meteor.user(),
      columns: [

        {
          width: '20%',
          label: 'Name',
          className: ''
        }, {
          width: '20%',
          label: 'Description',
          className: 'text-center'
        }, {
          width: '10%',
          label: 'Tags',
          className: 'text-center'
        }, {
          width: '10%',
          label: 'Owner',
          className: 'text-center'
        }, {
          width: '20%',
          label: 'Created At',
          className: 'text-center'
        }, {
          width: '10%',
          label: 'Active ?',
          className: 'text-center'
        }, {
          width: '10%',
          label: '',
          className: 'text-center'
        }
      ],
      outlets: Outlets.find({}, {
        sort: {
          createAt: -1
        }
      }).fetch(),
      placeInfos: placeInfos,
      suggestions: Tags.find({}).fetch().map(function(tag) {
        return tag.name;
      })

    };
  },
  createAddressComponent(place) {
    var loc = {
      lat: '',
      lng: '',
      geometry: {
        type: "Point",
        coordinates: [0, 0]
      },
      fullAddress: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      placeId: '',
      placeName: ''
    };

    if (place && place.geometry && place.geometry.location) {
      loc = this.parseGoogleAddressComponent(place.address_components, {});

      loc.lat = place.geometry.location.lat();
      loc.lng = place.geometry.location.lng();
      loc.geometry = {
        type: "Point",
        coordinates: [place.geometry.location.lng(), place.geometry.location.lat()]
      };
      loc.fullAddress = (place.formatted_address)
        ? place.formatted_address
        : "";
      if (place.name !== loc.fullAddress.substring(0, place.name.length)) {
        loc.fullAddress = place.name + ", " + loc.fullAddress;
      }
      loc.placeId = place.place_id;
      loc.placeName = place.name;
    }

    return loc;
  },
  parseGoogleAddressComponent(addressComponents, params) {
    var address = {};
    //go through all address components and pull out the matching types and map them to what we want (city, state)
    var map = {
      'street_number': 'street',
      'route': 'street',
      'locality': 'city',
      'administrative_area_level_1': 'state',
      'postal_code': 'zip',
      'country': 'country'
    };
    var ii,
      xx;
    for (ii = 0; ii < addressComponents.length; ii++) {
      for (xx in map) {
        //if have a map type we want
        if (addressComponents[ii].types.indexOf(xx) > -1) {
          //have to join street number and route together
          if ((xx === 'street_number' || xx === 'route') && address.street !== undefined) {
            //prepend
            if (xx === 'street_number') {
              address.street = addressComponents[ii].short_name + ' ' + address. //append
              street;
            } else if (xx === 'route') {
              address.street = address.street + ' ' + addressComponents[ii].short_name;
            }
          } else {
            if (xx === 'locality') {
              address[map[xx]] = addressComponents[ii].long_name;
            } else {
              address[map[xx]] = addressComponents[ii].short_name;
            }
          }
        }
      }
    }
    //console.log(EJSON.stringify(address, {indent: true}));
    return address;
  },
  selectSuggestion(suggest) {
    let placeId = suggest.placeId;

    let request = {
      placeId: placeId
    };
    let googleAttrib = document.getElementById('google-attribution');

    let service = new google.maps.places.PlacesService(googleAttrib);
    service.getDetails(request, callback.bind(this));

    function callback(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        placeInfosReactive.set(this.createNewOutletObject(place));
      }
    }

  },
  createNewOutletObject(place) {
    let addressComponent = this.createAddressComponent(place);
    let openingHours = (place.opening_hours
      ? place.opening_hours.weekday_text
      : 'Unknown');
    return {
      newOutlet: {
        name: place.name,
        description: 'Describe the Outlet',
        address: addressComponent,
        fullAddress: place.formatted_address,
        telephone: place.international_phone_number,
        active: true,
        creatorID: this.data.currentUser._id,
        tags: this.state.newOutlet.tags,
        createdAt: new Date(),
        serviceSchedule: openingHours,
        opening_hours: place.opening_hours
      }
    };
  },
  submitOutlet() {
    let newOutlet = this.data.placeInfos.newOutlet;

    let outletValidator = OutletsSchema.namedContext("newOutlet");
    if (outletValidator.validate(newOutlet)) {
      Meteor.call('submitOutlet', newOutlet, function(error, result) {
        if (error) {
          Bert.alert({title: 'Error saving Outlet', message: error, type: 'danger', style: 'growl-bottom-right', icon: 'fa-bell-o'});
        } else {
          Bert.alert({title: 'Outlet Saved', type: 'notification', style: 'growl-bottom-right', icon: 'fa-bell-o'});

        }
      });
      this.resetForms();
    } else {
      Bert.alert({title: 'Invalid Outlet', message: 'Check The information', type: 'danger', style: 'growl-bottom-right', icon: 'fa-bell-o'});
    }

  },
  handleTelephoneChange(event) {
    console.log(event.target.value);
    this.data.placeInfos.newOutlet.telephone = event.target.value;
  },
  resetForms() {
    placeInfosReactive.set({});
    this.refs.geosuggest.clear();
  },
  handleDelete() {

  },
  handleAddition() {

  },
  handleDrag() {

  },

  render() {
    return <div className="outlets">
      <PageHeader label="Outlets"/>
      {this.data.outlets
        ? <Table context="outlets" columns={this.data.columns}>
            {this.data.outlets.map((outlet) => {
              return <OutletRow key={outlet._id} outlet={outlet}/>;
            })}
          </Table>
        : <Loading/>}

      <PageHeader label="Add a new Outlet"/>

      <Geosuggest placeholder="Type Here..." onSuggestSelect={this.selectSuggestion} ref="geosuggest"/>
      {this.data.placeInfos.newOutlet
        ? <div>
            <form>
              <TextField fullWidth={true} hintText="Name" floatingLabelText="Name" value={this.data.placeInfos.newOutlet.name}/><br/>
              <TextField fullWidth={true} hintText="Description" floatingLabelText="Description" value={this.data.placeInfos.newOutlet.description}/><br/>
              <TextField fullWidth={true} hintText="Address" floatingLabelText="Address" value={this.data.placeInfos.newOutlet.fullAddress}/><br/>
              <TextField fullWidth={true} hintText="Telephone" floatingLabelText="Telephone" value={this.data.placeInfos.newOutlet.telephone} onChange={this.handleTelephoneChange}/><br/>
                <TextField fullWidth={true} hintText="Service Schedules" floatingLabelText="Service Schedules" value={this.data.placeInfos.newOutlet.serviceSchedule} onChange={this.handleTelephoneChange}/><br/>


                <ReactTags tags={this.state.newOutlet.tags}
                     suggestions={this.data.suggestions}
                     handleDelete={this.handleDelete}
                     handleAddition={this.handleAddition}
                     handleDrag={this.handleDrag} />

              <RaisedButton label="Save the Outlet" primary={true} onClick={this.submitOutlet}/>
            </form>
          </div>
        : ''
}
      <div id="google-attribution"></div>
    </div>;
  }
});
