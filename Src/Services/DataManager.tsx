import AsyncStorage from '@react-native-async-storage/async-storage';

import React from 'react'
import { GToast } from '../Components';

class DataManager {

    KEYS = {
        USER_DETAILS: 'USER_DETAILS',
        SAVEDPOSTS: 'SAVEDPOSTS',
        NOTIFICATIONS: 'NOTIFICATIONS',
        FILTERTAGS: 'FILTERTAGS'
    };

    setLocalData = async (key: any, dataDetail: any) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(dataDetail));
        } catch(err) {
            console.log('error while saving aysncstorage user data =>', err)
            return null;
        }
    };

    getLocalData = async (key: any) => {
        try {
            const response = await AsyncStorage.getItem(key);
            if(response) {
                return JSON.parse(response);
            }
            return null;
        } catch(err) {
            console.log('error while getting aysncstorage user data =>', err)
            GToast.shortTop('Something went wrong Please try again later')
            return null;
        }
    }

    deleteLocalData = async (key: any) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch(err) {
            console.log('error while deleting aysncstorage user data =>', err)
            return null;
        }
    };

    clearAll = async () => {
        try {
            await AsyncStorage.clear()
        } catch(err) {
            console.log('error while deleting aysncstorage user data =>', err)
            return null;
        }
    }


}

const GDataManager = new DataManager();
export { GDataManager }
