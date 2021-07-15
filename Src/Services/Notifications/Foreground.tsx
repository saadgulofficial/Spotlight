import React, { Component } from 'react'
import { TouchableWithoutFeedback, View, Image, Text, Dimensions, StyleSheet, Alert, TouchableOpacity, Platform } from 'react-native'
import messaging from '@react-native-firebase/messaging';
import { wp, hp } from '../../Globals/index'
import { Colors, Fonts } from '../../Res';
import moduleName from '../../../globalDeclaration'
import { GFunctions } from '../Functions';

const { width, height } = Dimensions.get('window')
class ShowMessage extends Component<any> {
    state: {
        remoteMessage: any,
        notification: any,
        data: any
    } = {
            remoteMessage: '',
            notification: '',
            data: ''
        }

    render() {
        const { data, notification } = this.state
        return (
            <View style={Styles.container}>
                <TouchableOpacity style={Styles.messageContainer}
                    onPress={this.onNotifyPress}
                    activeOpacity={1}
                >
                    <View style={Styles.textContainer}>
                        <Text style={Styles.title} numberOfLines={1}>{notification.title}</Text>
                        <Text style={Styles.message} numberOfLines={1}>{notification.body}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }


    componentDidMount() {
        messaging().onMessage(async (remoteMessage: any) => {
            const notify = remoteMessage.notification
            const data = JSON.parse(remoteMessage.data.data)
            this.setState({
                remoteMessage: remoteMessage,
                notification: notify,
                data: data
            },
                () => {
                    global.NRef.show()
                })
            await GFunctions.saveGlobalNotification(remoteMessage)
            await GFunctions.saveNotification(remoteMessage)
        })
    }

    onNotifyPress = () => {
        const { data } = this.state
        this.props.navigation.navigate('FullPost', { post: data.post })
    }
}

export default ShowMessage

const Styles = StyleSheet.create({
    container: {},
    messageContainer: {
        width: wp(80),
        backgroundColor: Colors.white,
        paddingVertical: hp(1),
        borderRadius: 30,
        paddingHorizontal: wp(3),
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    textContainer: {
        borderWidth: 0,
        width: wp(60),
        paddingHorizontal: wp(1),
        paddingTop: hp(0.7)
    },
    title: {
        fontFamily: Fonts.APPFONT_B,
        fontSize: wp(3.8)
    },
    message: {
        fontFamily: Fonts.APPFONT_SB,
        fontSize: wp(3.7)
    }
})
