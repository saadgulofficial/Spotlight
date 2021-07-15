import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import BottomTab from './BottomTab'

//Screens
import {
    Signin, Signup, ForgotPassword, ReportPost, Settings, PrivacySettings,
    ProfileSettings, ChangeName, ChangeEmail, Security, ContactSupport, Notifications,
    FilterPosts, FullPost, ChangeLocation, ChangeDescription
} from '../Screens';
import { GFirebase } from '../Services';
import { GLoader } from '../Components';
import ShowMessage from '../Services/Notifications/Foreground'

const Stack = createStackNavigator();
const MainStackNav = () => {
    const [containerLoader, setContainerLoader] = useState(true)
    const [initalRouteName, setIntialRouteName] = useState('')

    useEffect(() => {
        async function checkUser() {
            await GFirebase.checkUser().then(() => {
                setIntialRouteName('BottomTab')
                setContainerLoader(false)
            })
                .catch(() => {
                    setIntialRouteName('Signin')
                    setContainerLoader(false)
                })
        }
        checkUser()
    }, [])


    return (
        <View style={{ flex: 1 }}>
            {
                containerLoader ?
                    <GLoader />
                    :
                    <NavigationContainer>
                        <Stack.Navigator
                            screenOptions={{
                                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                headerShown: false,
                                gestureEnabled: true,
                                presentation: "card",
                            }}
                        >
                            {
                                initalRouteName === 'BottomTab' ?
                                    <Stack.Screen name="BottomTab" component={BottomTab} />
                                    :
                                    <Stack.Screen name="Signin" component={Signin} />
                            }
                            <Stack.Screen name="Signup" component={Signup} />
                            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                            <Stack.Screen name="ReportPost" component={ReportPost} />
                            <Stack.Screen name="Settings" component={Settings} />
                            <Stack.Screen name="PrivacySettings" component={PrivacySettings} />
                            <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
                            <Stack.Screen name="ChangeName" component={ChangeName} />
                            <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
                            <Stack.Screen name="Security" component={Security} />
                            <Stack.Screen name="ContactSupport" component={ContactSupport} />
                            <Stack.Screen name="Notifications" component={Notifications} />
                            <Stack.Screen name="FilterPosts" component={FilterPosts} />
                            <Stack.Screen name="FullPost" component={FullPost} />
                            <Stack.Screen name="ChangeLocation" component={ChangeLocation} />
                            <Stack.Screen name="SigninTwo" component={Signin} />
                            <Stack.Screen name="ChangeDescription" component={ChangeDescription} />
                            <Stack.Screen name="BottomTabTwo" component={BottomTab} />
                            <Stack.Screen name="ShowMessage" component={ShowMessage} />
                        </Stack.Navigator>
                    </NavigationContainer>
            }
        </View>

    )
}

export default MainStackNav
