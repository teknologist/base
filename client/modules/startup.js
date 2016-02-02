let startup = () => {
  AutoForm.setDefaultTemplate('materialize');
  // GoogleMaps.load({
  //   v: '3',
  //   key: 'AIzaSyAyrlcT7R-GaqwseJaSwTZCPVAcrNCuOac',
  //   libraries: 'geometry,places'
  // });
};

Modules.client.startup = startup;
