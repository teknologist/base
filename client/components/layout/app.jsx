injectTapEventPlugin();

var {
    AppCanvas,
    AppBar,
    LeftNav,
    Styles,
    RaisedButton,
    DatePicker,
    IconButton,
    IconMenu,
    MenuItem,
    ActionFace
    } = MUI;

var { ThemeManager, LightRawTheme } = Styles;

let {SvgIcons} = MUI.Libs;

// .dark-primary-color    { background: #455A64; }
// .default-primary-color { background: #607D8B; }
// .light-primary-color   { background: #CFD8DC; }
// .text-primary-color    { color: #FFFFFF; }
// .accent-color          { background: #FFC107; }
// .primary-text-color    { color: #212121; }
// .secondary-text-color  { color: #727272; }
// .divider-color         { border-color: #B6B6B6; }


let appPalette =  {
    primary1Color: '#00BCD4',
    primary2Color: '#FF4081',
    primary3Color: Styles.Colors.lightBlack,
    accent1Color: '#FF4081',
    accent2Color: '#00BCD4',
    accent3Color: '#FF4081',
    textColor: '#212121',
    alternateTextColor: Styles.Colors.white,
    canvasColor: Styles.Colors.white,
    borderColor: Styles.Colors.grey300,
    disabledColor: Styles.Colors.grey500,
    pickerHeaderColor: '#FF4081'
  };

  var Theme = ThemeManager.getMuiTheme(MUI.Styles.LightRawTheme);
  var newTheme = ThemeManager.modifyRawThemePalette(Theme,appPalette);

App = React.createClass({
  mixins: [ ReactMeteorData ],
  childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {
            muiTheme: newTheme
        };
    },
  getMeteorData() {
    return {
      loggingIn: Meteor.loggingIn(),
      hasUser: !!Meteor.user(),
      currentUser: Meteor.user(),
      isPublic( route ) {
        let publicRoutes = [ 'login', 'signup', 'index','requestinvite','resetPassword', 'recoverPassword' ];
        return publicRoutes.indexOf( route ) > -1;
      },
      isAdmin( route ) {
        let adminRoutes = [ 'invites' ];
        return adminRoutes.indexOf( route ) > -1;
      },
      canView() {
        let currentRoute = FlowRouter.current().route.name,
            isPublic     = this.isPublic( currentRoute ),
            isAdmin      = this.isAdmin( currentRoute ),
            userIsAdmin  = Roles.userIsInRole( Meteor.userId(), 'admin' );

        if ( isAdmin && !userIsAdmin ) {
          return false;
        } else {
          return isPublic || !!Meteor.user();
        }
      }
    };
  },
  loading() {
    return <div className="loading"></div>;
  },
  getView() {
    if ( this.data.canView() ) {
      return this.props.yield;
    } else {
      return this.data.hasUser ? <Dashboard /> : <Login />;
    }
  },
  render() {


  return (
    <AppCanvas>
      <AppHeader hasUser={ this.data.hasUser } />

        <div className="container">
            { this.data.loggingIn ? this.loading() : this.getView() }
        </div>
    </AppCanvas>
  );
}

    //
    // return <div className="app-root">
    //   <AppHeader hasUser={ this.data.hasUser } />
    //   <div className="container">
    //     { this.data.loggingIn ? this.loading() : this.getView() }
    //   </div>
    // </div>;
//  }
});
