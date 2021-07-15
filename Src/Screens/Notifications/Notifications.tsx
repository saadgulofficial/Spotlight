import React, { Component } from 'react'
import { Text, View, FlatList, Alert, TouchableOpacity, Platform } from 'react-native'
import { GHeader, GLoader } from '../../Components'
import { wp } from '../../Globals'
import { Colors } from '../../Res'
import Styles from './Styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { GDataManager } from '../../Services'
import _ from 'lodash'

export class Notifications extends Component<any> {
    state: {
        notifications: any,
        containerLoader: any
    } = {
            notifications: [],
            containerLoader: true
        }
    render() {
        const { notifications, containerLoader } = this.state
        return (
            <View style={Styles.container}>
                <GHeader
                    back
                    navigation={this.props.navigation}
                    bgColor={"transparent"}
                    centerTitle="Notifiactions"
                    style={{ borderBottomWidth: 0 }}
                />
                {
                    containerLoader ?
                        <GLoader />
                        :
                        <FlatList
                            data={notifications}
                            renderItem={this.renderNotifications}
                            contentContainerStyle={Styles.flatListContainer}
                            ListEmptyComponent={this.renderEmptyList}
                            keyExtractor={item => item.data.notifyId}
                        />
                }
            </View>
        )
    }

    renderEmptyList = () => (
        <View style={Styles.emptyListContainer}>
            <Text style={Styles.emptyListText}>No new notifications</Text>
        </View>
    )
    renderNotifications = ({ item }) => {
        const { data } = item
        var reportPost = false
        if(data.from === 'reportPost') {
            reportPost = true
        }
        return (
            <View style={Styles.flatItemContainer}>
                <View style={Styles.fieldsContainer}>
                    <Text style={{ ...Styles.itemTitle, color: data.from === 'reportPost' ? Colors.red : Colors.color }}>{item.title}</Text>
                    {
                        reportPost ?
                            <Text style={Styles.itemDis}> {item.body.split('#')[0]}{''}
                                <Text style={{ ...Styles.itemDis, fontWeight: 'bold', color: Colors.color }} >
                                    {item.body.split('#')[1]}
                                </Text>
                                <Text style={Styles.itemDis} >
                                    {item.body.split('#')[2]}
                                </Text>
                            </Text>
                            :
                            <Text style={Styles.itemDis}>{item.body}</Text>
                    }
                </View>
                <View style={Styles.deleteContainer}>
                    <TouchableOpacity style={Styles.deleteView}
                        onPress={this.deleteNotification.bind(this, item)} >
                        <MaterialCommunityIcons name="delete-forever" size={wp(7)} color={Colors.color11} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    componentDidMount = () => {
        const { KEYS, getLocalData, setLocalData } = GDataManager
        getLocalData(KEYS.NOTIFICATIONS).then((data) => {
            _.each(data, (obj, key) => { obj.seenStatus = 'seen' })
            this.setState({ notifications: data, containerLoader: false })
            setLocalData(KEYS.NOTIFICATIONS, data)
        })
    }

    deleteNotification = (item) => {
        Alert.alert(
            "",
            "Are your sure you want to delete this notification?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {
                        const { notifications } = this.state
                        const { KEYS, setLocalData } = GDataManager
                        const newData = _.filter(notifications, function (n) { return n.data.notifyId !== item.data.notifyId })
                        this.setState({ notifications: newData }, () => this.forceUpdate())
                        setLocalData(KEYS.NOTIFICATIONS, newData)
                        if(Platform.OS === 'ios') {
                            PushNotificationIOS.getDeliveredNotifications(async notifications => {
                                if(notifications.length !== 0) {
                                    const check = _.find(notifications, function (o) { return o.identifier === item.identifier });
                                    if(check) {
                                        PushNotificationIOS.removeDeliveredNotifications([item.identifier])
                                    }
                                }
                            })
                        }
                    }
                }
            ]
        )

    }
}

export default Notifications
