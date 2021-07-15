import { GFirebase } from './Firebase'
import { GDataManager } from './DataManager'
import _ from 'lodash'
import { Platform } from 'react-native'
import PushNotificationIOS from '@react-native-community/push-notification-ios';

class Functions {
    getPosts = () => {
        return new Promise((resolve, reject) => {
            GFirebase.getPosts().then((data: any) => {
                GFirebase.getCurrentUserUid().then(uid => {
                    var postsData = _.chain(data).map((item) => {
                        if(item.createdBy === uid) {
                            item.myPost = true
                        }
                        const { KEYS, getLocalData } = GDataManager
                        getLocalData(KEYS.SAVEDPOSTS).then(async (data) => {
                            if(data && data.length !== 0) {
                                const check = _.find(data, function (o) { return o.id === item.id })
                                if(check) {
                                    item.savedByMe = true
                                }
                            }
                        })
                        if(item.likes && item.likes.length !== 0) {
                            const check = _.find(item.likes, function (o) { return o === uid })
                            if(check) {
                                item.likedByMe = true
                                return item
                            }
                            else return item
                        }
                        else {
                            return item
                        }
                    }).flatten().value()
                    resolve(postsData)
                })
                    .catch(() => reject(''))
            })
                .catch(() => reject(''))
        })
    }

    saveNotification = (notificationData) => {
        return new Promise((resolve, reject) => {
            const { KEYS, setLocalData, getLocalData } = GDataManager
            getLocalData(KEYS.NOTIFICATIONS).then(async (data) => {
                var notifyData = {
                    data: JSON.parse(notificationData.data.data),
                    title: notificationData.notification.title,
                    body: notificationData.notification.body,
                    seenStatus: 'notSeen'
                }
                if(data) {
                    const check = _.find(data, function (o) { return o.data.notifyId === notifyData.data.notifyId });
                    if(!check) {
                        data.push(notifyData)
                    }
                    await setLocalData(KEYS.NOTIFICATIONS, data)
                    resolve(data)
                }
                else {
                    await setLocalData(KEYS.NOTIFICATIONS, [notifyData])
                    resolve([notifyData])
                }
            })
        })
    }

    saveNotificationIOS = (notificationData) => {
        return new Promise((resolve, reject) => {
            /// All this is for managing the ios state when user open application without clicking on notificaiton
            const { KEYS, setLocalData, getLocalData } = GDataManager
            getLocalData(KEYS.NOTIFICATIONS).then(async (data) => {
                if(notificationData.length !== 0) {
                    var notifyData = []
                    notificationData.forEach(element => {
                        var notifyObject = {
                            data: JSON.parse(element.userInfo.data),
                            title: element.title,
                            body: element.body,
                            seenStatus: 'notSeen',
                            identifier: element.identifier
                        }
                        if(data) {
                            const check = _.find(data, function (o) { return o.data.notifyId === notifyObject.data.notifyId });
                            if(!check) {
                                notifyData.push(notifyObject)
                            }
                        }
                        else {
                            notifyData.push(notifyObject)
                        }
                    })
                    if(data) {
                        data.push(...notifyData)
                        await setLocalData(KEYS.NOTIFICATIONS, data)
                        resolve(data)
                    }
                    else {
                        await setLocalData(KEYS.NOTIFICATIONS, [...notifyData])
                        resolve([...notifyData])
                    }
                }
            })
        })
    }

    saveGlobalNotification = (notificationData) => {
        const data = JSON.parse(notificationData.data.data)
        if(data.from === 'newComment') {
            global.commentNotify = data
        }
        else if(data.from === 'reportPost') {
            global.reportPost = data
        }
    }

    getNotificationsBadgeIOS = () => {
        return new Promise(async (resolve, reject) => {
            PushNotificationIOS.getDeliveredNotifications(async remoteMessage => {
                if(remoteMessage.length !== 0) {
                    await GFunctions.saveNotificationIOS(remoteMessage).then((data) => {
                        if(data) {
                            const notifications = _.filter(data, function (o) { return o.seenStatus === "notSeen" })
                            resolve(notifications.length)
                        }
                    })
                }
                else { this.getNotificationsBadgeLocal().then((data) => resolve(data)) }
            })
        })
    }

    getNotificationsBadgeLocal = () => {
        return new Promise(async (resolve, reject) => {
            const { KEYS, getLocalData } = GDataManager
            getLocalData(KEYS.NOTIFICATIONS).then((data) => {
                if(data) {
                    const notifications = _.filter(data, function (o) { return o.seenStatus === "notSeen" })
                    resolve(notifications.length)
                }
            })
        })
    }

    getNotificationsBadgeForground = (remoteMessage) => {
        return new Promise(async (resolve, reject) => {
            this.saveNotification(remoteMessage).then((data) => {
                if(data) {
                    const notifications = _.filter(data, function (o) { return o.seenStatus === "notSeen" })
                    resolve(notifications.length)
                }
            })
        })
    }


    filterPosts = (posts) => {
        return new Promise((resolve, reject) => {
            const { KEYS, getLocalData } = GDataManager
            getLocalData(KEYS.FILTERTAGS).then(tags => {
                if(tags.length !== 0) {
                    var filter = _.chain(posts).map((item) => {
                        if(item.selectedTags.length !== 0) {
                            const selectedTags = item.selectedTags
                            const check = _.find(tags, function (t) {
                                return _.find(selectedTags, function (s) { return t === s })
                            })
                            if(check) {
                                return item
                            }
                            else {
                                return null
                            }
                        }
                        else {
                            return null
                        }
                    }).flatten().value()
                    const filterPosts = _.filter(filter, function (o) { return o !== null });
                    resolve(filterPosts)
                }
                else {
                    reject('')
                }

            })
                .catch((err) => {
                    console.log('error while getting SelectedTags from local Storage ->', err)
                    reject('')
                })
        })
    }
}

const GFunctions = new Functions();
export { GFunctions }