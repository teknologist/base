let pathForView = (path, view) => {
  if (path.hash) {
    view = path;
    path = view.hash.route;
    delete view.hash.route;
  }

  let query = view.hash.query ? FlowRouter._qs.parse(view.hash.query) : {};
  return FlowRouter.path(path, view.hash, query);
};


let currentRoute = (route) => {
  FlowRouter.watchPathChange();
  return FlowRouter.current().route.name === route ? 'active' : '';
};

let pathFor = (path, params) => {
  let query = params && params.query ? FlowRouter._qs.parse(params.query) : {};
  return FlowRouter.path(path, params, query);
};

FlowHelpers = {
  pathForView: pathForView,
  pathFor: pathFor,
  currentRoute: currentRoute,
  urlFor(path, view) {
    return Meteor.absoluteUrl(pathFor(path, view).substr(1));
  }
};
