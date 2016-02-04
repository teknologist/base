import React from 'react';
import {WithContext as ReactTags} from 'react-tag-input'
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import Geosuggest from 'react-geosuggest';

const geoTypes = ['establishment'];
const columns = [

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
    label: 'Created On',
    className: 'text-center'
  }, {
    width: '10%',
    label: 'Active ?',
    className: 'text-center'
  }, {
    width: '10%',
    label: 'Edit',
    className: 'text-center'
  }, {
    width: '10%',
    label: 'Change Status',
    className: 'text-center'
  }
];

OutletsList = React.createClass({
  mixins: [TrackerReact],
  getInitialState() {
    return {
      newOutlet: {
        description: 'Describe the Outlet',
        address: {},
        fullAddress: '',
        telephone: '',
        tags: [],
        serviceSchedule: ''
      },
      addressEdit: false,
      editMode: false
    };
  },
  componentDidMount: function() {
    let outletsHandle = Meteor.subscribe('outlets');
    let suggestionsHandle = Meteor.subscribe('tags');
    let usersHandle = Meteor.subscribe('users-infos');
  },
  getMeteorData() {

    let outlets = Outlets.find({}, {
      sort: {
        createAt: -1
      }
    }).fetch();

    console.log("found " + outlets.length + " outlets.");
    return {
      currentUser: Meteor.user(),
      outlets: outlets,
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
        this.createNewOutletObject(place);
      }
    }

  },
  createNewOutletObject(place) {
    let addressComponent = this.createAddressComponent(place);
    let serviceSchedule = (place.opening_hours
      ? place.opening_hours.weekday_text
      : ['Unknown']);
    let newOutlet = {
      name: place.name,
      description: 'Describe the Outlet',
      address: addressComponent,
      fullAddress: place.formatted_address,
      telephone: place.international_phone_number,
      active: true,
      creatorID: this.getMeteorData().currentUser._id,
      tags: this.state.newOutlet.tags,
      createdAt: new Date(),
      serviceSchedule: serviceSchedule,
      opening_hours: place.opening_hours
    };
    let newState = this.state;
    newState.newOutlet = newOutlet;
    this.setState(newState);
  },
  submitOutlet() {
    let newOutlet = this.state.newOutlet;
    let isUpdate = false;
    let cleanedOutlet = $.extend(true, {}, newOutlet);;
    if (cleanedOutlet._id) {
      isUpdate = true;
      delete cleanedOutlet._id;
    }

    let outletValidator = OutletsSchema.namedContext("newOutlet");
    if (outletValidator.validate(cleanedOutlet)) {
      if (isUpdate) {
        Meteor.call('updateOutlet', newOutlet, function(error, result) {
          if (error) {
            Bert.alert({
              title: 'Error saving Outlet',
              message: EJSON.stringify(error, {indent: true}),
              type: 'danger',
              style: 'growl-bottom-right',
              icon: 'fa-bell-o'
            });
          } else {
            Bert.alert({title: 'Outlet Saved', type: 'notification', style: 'growl-bottom-right', icon: 'fa-bell-o'});

          }
        });
      } else {
        Meteor.call('submitOutlet', newOutlet, function(error, result) {
          if (error) {
            Bert.alert({title: 'Error saving Outlet', message: error, type: 'danger', style: 'growl-bottom-right', icon: 'fa-bell-o'});
          } else {
            Bert.alert({title: 'Outlet Saved', type: 'notification', style: 'growl-bottom-right', icon: 'fa-bell-o'});

          }
        });
      }
      this.resetForms();
    } else {
      let invalidKeys = outletValidator._invalidKeys;
      let message = 'Check ';
      message = message + invalidKeys.map(function(invalidKey) {
        return invalidKey.name;
      });

      Bert.alert({title: 'Invalid Outlet', message: message, type: 'danger', style: 'growl-bottom-right', icon: 'fa-bell-o'});
    }

  },
  handleFieldChange(event) {
    let newState = this.state;

    newState.newOutlet[event.target.id] = event.target.value;
    this.setState(newState);
  },
  resetForms() {
    if (this.refs.geosuggest) {
      this.refs.geosuggest.clear();
    }
    this.setState({
      newOutlet: {
        description: 'Describe the Outlet',
        address: {},
        fullAddress: '',
        telephone: '',
        tags: [],
        serviceSchedule: ''
      },
      addressEdit: false,
      editMode: false
    });

  },
  handleDelete(i) {
    let newState = this.state;
    newState.newOutlet.tags.splice(i, 1);
    this.setState(newState);
  },
  handleAddition(tag) {
    let newState = this.state;
    newState.newOutlet.tags.push({name: tag});
    this.setState(newState);

  },
  handleDrag() {},
  editAddress() {
    let newState = this.state;
    newState.addressEdit = true;
    this.setState(newState);

  },
  doneEditAddress() {
    let newState = this.state;
    newState.addressEdit = false;
    this.setState(newState);
  },

  render() {
    let outlets = this.getMeteorData().outlets;
    return <div className="outlets">
      <PageHeader label="Outlets"/>
      {this.getMeteorData().outlets
        ? <Table context="outlets" columns={columns}>
            {outlets.map((outlet) => {
              return <OutletRow key={outlet._id} parentRow={this} outlet={outlet}/>;
            })}
          </Table>
        : <Loading/>}

      <PageHeader label="Add a new Outlet"/>
      {this.state.editMode
        ? ''
        : <Geosuggest placeholder="Type Here..." onSuggestSelect={this.selectSuggestion} ref="geosuggest" types={ geoTypes}/>
}

      {this.state.newOutlet.name
        ? <div>
            <TextField fullWidth={true} hintText="Name" floatingLabelText="Name" value={this.state.newOutlet.name} id="name" onChange={this.handleFieldChange}/><br/>
            <TextField fullWidth={true} hintText="Description" floatingLabelText="Description" value={this.state.newOutlet.description} id="description" onChange={this.handleFieldChange}/><br/>

            {this.state.addressEdit
              ? <FlatButton label="Done editing address" secondary={true} onClick={this.doneEditAddress}/>
              : <TextField fullWidth={true} hintText="Address" floatingLabelText="Address" value={this.state.newOutlet.fullAddress} id="fullAddress" onClick={this.editAddress}/>
}

            <br/>
            <TextField fullWidth={true} hintText="Telephone" floatingLabelText="Telephone" value={this.state.newOutlet.telephone} id="telephone" onChange={this.handleFieldChange}/><br/>
            <TextField fullWidth={true} hintText="Service Schedules" floatingLabelText="Service Schedules" value={this.state.newOutlet.serviceSchedule} id="serviceSchedule" onChange={this.handleFieldChange}/><br/>
            <br/><br/>

            <ReactTags tags={this.state.newOutlet.tags} labelField={'name'} suggestions={this.getMeteorData().suggestions} handleDelete={this.handleDelete} handleAddition={this.handleAddition} handleDrag={this.handleDrag}/>
            <FlatButton label="Save the Outlet" primary={true} onClick={this.submitOutlet} style={{
              margin: '0 10 0 10'
            }}/>
            <FlatButton label="Cancel" secondary={true} onClick={this.resetForms} style={{
              margin: '0 10 0 10'
            }}/>

          </div>

        : ''
}
      <div id="google-attribution"></div>
    </div>;
  }
});
