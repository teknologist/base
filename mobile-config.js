// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
  id: 'com.teknologism.asteroid',
  name: 'Asteroid',
  description: 'Get Asteroid power in one button click',
  author: 'Eric Taieb Walch',
  email: 'umami@teknologism.com',
  website: 'https://umami.teknologism.com',
  version: '0.0.1',
  buildNumber: '1'
});

App.configurePlugin('phonegap-facebook-plugin', {
  APP_ID: '933009906711832',
  APP_NAME: 'umami'
});
App.configurePlugin('com.phonegap.plugins.facebookconnect', {
  APP_ID: '933009906711832',
  APP_NAME: 'umami'
});
App.configurePlugin('cordova-plugin-googleplus', {
  iOSApiKey: '765529841317-8d15ar2mgrbri7b17n608pfkhedd55jb.apps.googleusercontent.com',
  REVERSED_CLIENT_ID: 'com.googleusercontent.apps.765529841317-8d15ar2mgrbri7b17n608pfkhedd55jb'
});

App.icons({
  // iOS
  'iphone': 'resources/icons/ios/Icon-60.png',
  'iphone_2x': 'resources/icons/ios/Icon-60@2x.png',
  'iphone_3x': 'resources/icons/ios/Icon-60@3x.png',
  'ipad': 'resources/icons/ios/Icon-76.png',
  'ipad_2x': 'resources/icons/ios/Icon-76@2x.png',
  // Android
  'android_ldpi': 'resources/icons/android/drawable-ldpi/ic_launcher.png',
  'android_mdpi': 'resources/icons/android/drawable-mdpi/ic_launcher.png',
  'android_hdpi': 'resources/icons/android/drawable-hdpi/ic_launcher.png',
  'android_xhdpi': 'resources/icons/android/drawable-xhdpi/ic_launcher.png'
});



App.launchScreens({
  // iOS
  'iphone': 'resources/splash/iphone/Default.png',
  'iphone_2x': 'resources/splash/iphone/Default@2x.png',
  'iphone5': 'resources/splash/iphone/Default-568h@2x.png',
  'ipad_portrait': 'resources/splash/iphone/Default-Portrait.png',
  'ipad_portrait_2x': 'resources/splash/iphone/Default-Portrait@2x.png',
  'ipad_landscape': 'resources/splash/iphone/Default-Landscape.png',
  'ipad_landscape_2x': 'resources/splash/iphone/Default-Landscape@2x.png',
  'iphone6': 'resources/splash/iphone/Default-Portrait-736h@3x.png',
  'iphone6p_portrait': 'resources/splash/iphone/Default-Portrait-736h@3x.png',
  'iphone6p_landscape': 'resources/splash/iphone/Default-Landscape-736h@3x.png',

  // Android
  'android_ldpi_portrait': 'resources/splash/android/images/res-long-port-ldpi/default.png',
  'android_ldpi_landscape': 'resources/splash/android/images/res-long-land-ldpi/default.png',
  'android_mdpi_portrait': 'resources/splash/android/images/res-long-port-mdpi/default.png',
  'android_mdpi_landscape': 'resources/splash/android/images/res-long-land-mdpi/default.png',
  'android_hdpi_portrait': 'resources/splash/android/images/res-long-port-hdpi/default.png',
  'android_hdpi_landscape': 'resources/splash/android/images/res-long-land-hdpi/default.png',
  'android_xhdpi_portrait': 'resources/splash/android/images/res-long-port-xhdpi/default.png',
  'android_xhdpi_landscape': 'resources/splash/android/images/res-long-land-xhdpi/default.png'
});

App.accessRule('*.google.com/*');
App.accessRule('*.googleapis.com/*');
App.accessRule('*.gstatic.com/*');
App.accessRule('*.google-analytics.com/*');
App.accessRule('*.gravatar.com/*');
App.accessRule('*.kadira.io/*');
App.accessRule('*.bootstrapcdn.com/*');
App.accessRule('*.googleusercontent.com/*');
App.accessRule('*.facebook.com/*');
App.accessRule('*.apple.com/*');
App.accessRule('blob:*');
App.accessRule('data:*');
App.accessRule('gap:*');
App.accessRule('unsafe-inline');
App.accessRule('*.ucarecdn.com/*');
App.accessRule('ucarecdn.com/*');
App.accessRule('*.uploadcare.com/*');
App.accessRule('*.cdninstagram.com/*');
App.accessRule('*.staticflickr.com/*');
