#!/bin/sh
 rm -rf ../build/android/
 rm -rf ../build/ios/
 #export DDP_DEFAULT_CONNECTION_URL="https://umami.teknologism.com:443"
 #export ROOT_URL="https://umami.teknologism.com:443"
#rm -rf .meteor/local/cordova-build
meteor build ../build/  --server https://umami.teknologism.com --architecture os.linux.x86_64
cd ../Kokumi-build/android/
 jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1  release-unsigned.apk kokumi
 ~/.meteor/android_bundle/android-sdk/build-tools/20.0.0/zipalign 4     release-unsigned.apk Asteroid.apk
 #cd ../ios
 #cp ../GoogleService-Info.plist project/Umami/Resources/
 cd ..
 open .
 
