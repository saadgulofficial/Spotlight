import React from 'react'
import auth from '@react-native-firebase/auth'
import { GToast } from '../Components'
import moment from 'moment'

class Common {

    getTimeStamp() {
        let date = new Date();
        return date.getTime();
    }

    commonError = () => {
        GToast.shortBottom('Something went wrong please try again later')
    }

    convertToLocal(utcDate, format?: string) {
        var utc = moment.utc(utcDate)
        var local = utc.local();
        if(format && format.trim() != "") return moment(local).format(format);
        return moment(local)
    }
    convertToLocalFromNow(utcDate) {
        var utc = moment.utc(utcDate)
        var local = utc.local();
        return moment(local).fromNow()
    }


    convertToUTC(localDate) {
        let date: any = new Date(localDate);
        date = moment.utc(date).format("llll");
        return date;
    }

    Capitalize(str) {
        return str
            .toLowerCase()
            .split(" ")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
    }


}

const GCommon = new Common();
export { GCommon }