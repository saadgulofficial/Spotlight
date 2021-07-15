import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTab from './CustomBottomTab'
import { Home, CreatePost, Profile } from '../Screens'

const Tab = createBottomTabNavigator();
const AdminBottomTab = () => {
    return (
        <Tab.Navigator tabBar={props => <CustomBottomTab {...props} />} screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="CreatePost" component={CreatePost} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

export default AdminBottomTab