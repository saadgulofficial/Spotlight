import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { AppRegistry, AppState, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { GDataManager, GFunctions } from './Src/Services';
import PushNotification from "react-native-push-notification";



messaging().setBackgroundMessageHandler(async remoteMessage => {
    if(AppState.currentState != 'active') {
        await GFunctions.saveNotification(remoteMessage)
    }
});

PushNotification.configure({
    onNotification: async function (notification) {
        if(Platform.OS === 'android') {
            await GFunctions.saveGlobalNotification(notification)
        }
    }
});



messaging().onNotificationOpenedApp(async remoteMessage => {
    if(Platform.OS === 'ios') {
        await GFunctions.saveGlobalNotification(remoteMessage)
        await GFunctions.saveNotification(remoteMessage)
    }
});


messaging().getInitialNotification().then(async remoteMessage => {
    if(Platform.OS === 'ios') {
        if(remoteMessage) {
            await GFunctions.saveGlobalNotification(remoteMessage)
            await GFunctions.saveNotification(remoteMessage)
        }
    }
})

AppRegistry.registerComponent(appName, () => App);
