import React, { useRef, useState, useEffect } from 'react'
import { View, Text, AppState, Platform } from 'react-native'
import moduleName from '../../../globalDeclaration'
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { GFunctions } from '../../Services/Functions';
import { GDataManager } from '../DataManager';
import _ from 'lodash'

const Background = ({ navigation }: any) => {
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);


    const handleIosNotification = () => {
        /// All this is for managing the ios state when user open application without clicking on notificaiton
        Platform.OS === 'ios' ?
            PushNotificationIOS.getDeliveredNotifications(async remoteMessage => {
                await GFunctions.saveNotificationIOS(remoteMessage)
            }) : null
    }






    useEffect(() => {
        //This will run when user kill the app and then open again
        handleIosNotification()
        const commentNotify = global.commentNotify
        const reportPostNotify = global.reportPost
        if(commentNotify) {
            navigation.navigate('FullPost', { post: commentNotify.post })
        }
        else if(reportPostNotify) {
            navigation.navigate('FullPost', { post: reportPostNotify.post })
        }
    }, [])



    const _handleAppStateChange = (nextAppState: any) => {
        //This will run when app is in background and user open app
        if(
            appState.current.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            const commentNotify = global.commentNotify
            const reportPostNotify = global.reportPost
            if(commentNotify) {
                navigation.navigate('FullPost', { post: commentNotify.post })
            }
            else if(reportPostNotify) {
                navigation.navigate('FullPost', { post: reportPostNotify.post })
            }
        }
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
    }


    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);

        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);



    return (<View />)
}

export default Background
