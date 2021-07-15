import React, { Children } from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { GToast } from '../Components'
import { GCommon } from './Common'
import { GDataManager } from './DataManager'
import { GToken } from './Notifications/Token'
import messaging from '@react-native-firebase/messaging';

class firebaseService {

    register = (user) => {
        return new Promise((resolve, reject) => {
            const { email, name, password } = user
            auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    const uid = auth().currentUser.uid
                    firestore()
                        .collection('Users')
                        .doc(uid)
                        .set({
                            name: name,
                            email: email,
                            createdAt: GCommon.convertToUTC(new Date()),
                            allowComments: true,
                            allowPeoplePosts: true,
                            hidePostsFromOthers: false,
                            uid: uid
                        })
                        .then(() => {
                            user.uid = uid
                            GDataManager.setLocalData(GDataManager.KEYS.USER_DETAILS, user)
                                .then(async () => {
                                    resolve('')
                                })
                                .catch(err => {
                                    reject('')
                                    console.log('error while saving user details to async storage on Registeration =>', err)
                                })
                        })
                        .catch((err) => {
                            GCommon.commonError()
                            console.log('Error while adding user during Registeration =>', err)
                            reject('')
                        })
                })
                .catch(error => {

                    if(error.code === 'auth/email-already-in-use') {
                        GToast.shortBottom('email address is already in use!')
                        reject('')
                    }
                    else if(error.code === 'auth/invalid-email') {
                        GToast.shortBottom('email address is invalid!')
                        reject('')
                    }
                    else {
                        alert(error)
                        reject('')
                    }
                })
        })
    }

    signin = (user) => {
        return new Promise((resolve, reject) => {
            const { email, password } = user
            auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    this.saveUserLatestDetails().then(async () => {
                        await this.updateToken()
                        resolve('')
                    })
                        .catch(() => {
                            reject('')
                        })
                })
                .catch((err) => {
                    alert(err)
                    reject('')
                })
        })
    }

    checkUser = () => {
        return new Promise(async (resolve, reject) => {
            const { KEYS, getLocalData } = GDataManager
            getLocalData(KEYS.USER_DETAILS).then((data) => {
                if(data && data.uid) {
                    resolve('')
                }
                else {
                    reject('')
                }
            })
            // const user = await auth().currentUser
            // if(user && user.uid) {
            //     resolve('')
            // }
            // else { reject('') }
        })
    }

    logOut = () => {
        return new Promise(async (resolve, reject) => {
            await auth().signOut().then(() => resolve(''))
                .catch((err) => {
                    GCommon.commonError()
                    console.log('error while logOut user =>', err)
                })
        })
    }

    forgotPassword = (email) => {
        return new Promise((resolve, reject) => {
            auth().sendPasswordResetEmail(email).then(() => {
                GToast.shortBottom(`Email sent to ${email} kindly check your mail box`)
                resolve('')
            })
                .catch((err) => {
                    GCommon.commonError()
                    console.log('error while Reseting password =>', err)
                    reject('')
                })
        })
    }

    createPost = (post) => {
        return new Promise((resolve, reject) => {
            const { title, discription, allowComments, hidePostsFromOthers, selectedTags } = post
            const uid = auth().currentUser.uid
            const id = `id-${GCommon.getTimeStamp()}`
            const timestamp = firestore.FieldValue.serverTimestamp;
            firestore()
                .collection('Posts')
                .doc(id)
                .set({
                    title: title,
                    discription: discription,
                    allowComments: allowComments,
                    hidePostsFromOthers: hidePostsFromOthers,
                    selectedTags: selectedTags,
                    createdAt: GCommon.convertToUTC(new Date()),
                    timestamp: timestamp(),
                    createdBy: uid,
                    id: id
                })
                .then(() => {
                    resolve('')
                })
                .catch((err) => {
                    GCommon.commonError()
                    console.log('Error while creating Post =>', err)
                    reject('')
                })
        })
    }
    getPosts = () => {
        return new Promise((resolve, reject) => {
            try {
                firestore()
                    .collection('Posts')
                    .orderBy('timestamp')
                    .onSnapshot(docs => {
                        const data = [];
                        if(docs) {
                            docs.forEach(doc => {
                                if(doc.exists) {
                                    data.unshift(doc.data());
                                }
                            })
                        }
                        resolve(data)
                    })
            } catch(error) {
                GCommon.commonError()
                console.log('error while getting posts data on home screen =>', error)
                reject('')
            }
        })
    }

    getCurrentUserData = () => {
        return new Promise(async (resolve, reject) => {
            await firestore().collection('Users').doc(auth().currentUser.uid).get().then(documentSnapshot => {
                resolve(documentSnapshot.data());
            })
                .catch((err) => {
                    console.log('error while getting current User Data =>', err)
                    reject('')
                })
        })
    }

    getSelectedUserData = (uid) => {
        return new Promise(async (resolve, reject) => {
            await firestore().collection('Users').doc(uid).get().then(documentSnapshot => {
                resolve(documentSnapshot.data());
            })
                .catch((err) => {
                    console.log('error while getting selected User Data =>', err)
                    reject('')
                })
        })
    }


    getCurrentUserLocal = () => {
        return new Promise(async (resolve, reject) => {
            const { KEYS, getLocalData } = GDataManager
            await getLocalData(KEYS.USER_DETAILS).then(user => resolve(user))
                .catch((err) => {
                    console.log('error while getting current user local data =>', err)
                    reject('')
                })
        })
    }

    saveUserLatestDetails = () => {
        return new Promise((resolve, reject) => {
            this.getCurrentUserData().then(user => {
                GDataManager.setLocalData(GDataManager.KEYS.USER_DETAILS, user)
                    .then(() => resolve(''))
                    .catch(err => console.log('error while saving user details to async storage on saveUserLatestDetails =>', err))
            })
                .catch(() => reject(''))
        })
    }

    getCurrentUserUid = () => {
        return new Promise((resolve, reject) => {
            GDataManager.getLocalData(GDataManager.KEYS.USER_DETAILS)
                .then(user => {
                    if(user && user.uid) {
                        resolve(user.uid)
                    }
                    else {
                        resolve(auth().currentUser.uid)
                    }
                })
                .catch((err) => {
                    console.log('error while getting current user uid =>', err)
                    reject('')
                })
        })
    }

    postLike = async (item) => {
        await firestore().collection('Posts').doc(item.id).update({
            likes: item.likes
        })
            .then(() => { })
            .catch((err) => {
                console.log('error while liking a post =>', err)
            })
    }
    postComment = async (post) => {
        return new Promise((resolve, reject) => {
            firestore().collection('Posts').doc(post.id).update({
                comments: post.comments
            })
                .then(() => { resolve('') })
                .catch((err) => {
                    console.log('error while commenting on a post =>', err)
                    GCommon.commonError()
                })
        })
    }


    reportPost = (data) => {
        return new Promise((resolve, reject) => {
            const { email, description, uid, postId } = data
            const id = `id-${GCommon.getTimeStamp()}`
            firestore()
                .collection('ReportedPosts')
                .doc(id)
                .set({
                    reportedBy: uid,
                    reportedByEmail: email,
                    description: description,
                    createdAt: GCommon.convertToUTC(new Date()),
                    id: id
                })
                .then(() => {
                    resolve('')
                })
                .catch((err) => {
                    GCommon.commonError()
                    console.log('Error while creating Post =>', err)
                    reject('')
                })
        })
    }

    updateUserName = (user) => {
        return new Promise((resolve, reject) => {
            firestore().collection('Users').doc(user.uid).update({
                name: user.name
            })
                .then(() => {
                    const { KEYS, setLocalData } = GDataManager
                    setLocalData(KEYS.USER_DETAILS, user).then(() => {
                        resolve('')
                    })
                        .catch((err) => {
                            console.log('error while saving updated name in local storage =>', err)
                            GCommon.commonError()
                            reject('')
                        })
                })
                .catch((err) => {
                    GCommon.commonError()
                    console.log('error while upadting userName =>', err)
                    reject('')
                })
        })
    }

    updateUserDescription = (user) => {
        return new Promise((resolve, reject) => {
            firestore().collection('Users').doc(user.uid).update({
                description: user.description
            })
                .then(() => {
                    const { KEYS, setLocalData } = GDataManager
                    setLocalData(KEYS.USER_DETAILS, user).then(() => {
                        resolve('')
                    })
                        .catch((err) => {
                            console.log('error while saving updated description in local storage =>', err)
                            GCommon.commonError()
                            reject('')
                        })
                })
                .catch((err) => {
                    GCommon.commonError()
                    console.log('error while upadting description =>', err)
                    reject('')
                })
        })
    }

    updateEmail = (user, password, newEmail) => {
        return new Promise((resolve, reject) => {
            auth()
                .signInWithEmailAndPassword(user.email, password)
                .then(() => {
                    user.email = newEmail
                    auth().currentUser.updateEmail(user.email).then(() => {
                        firestore().collection('Users').doc(user.uid).update({
                            email: user.email
                        }).then(() => {
                            const { KEYS, setLocalData } = GDataManager
                            setLocalData(KEYS.USER_DETAILS, user).then(() => {
                                resolve('')
                            })
                                .catch((err) => {
                                    console.log('error while saving updated email in local storage =>', err)
                                    GCommon.commonError()
                                    reject('')
                                })
                        })
                            .catch((err) => {
                                console.log('error while saving updated email in firebase Storage =>')
                                GCommon.commonError()
                                reject('')
                            })
                    })
                        .catch((err) => {
                            console.log('error while saving updating email in firebase Auth =>', err)
                            GCommon.commonError()
                            reject('')
                        })

                })
                .catch((err) => {
                    alert(err)
                    reject('')
                })
        })
    }


    updatePassword = (user, oldpass, newPass) => {
        return new Promise((resolve, reject) => {
            auth()
                .signInWithEmailAndPassword(user.email, oldpass)
                .then(() => {
                    auth().currentUser.updatePassword(newPass)
                        .then(() => resolve(''))
                        .catch((err) => {
                            console.log('error while updating password =>', err)
                            alert(err)
                            reject('')
                        })
                })
                .catch((err) => {
                    console.log('error during signin while updating password  =>', err)
                    if(err.code === 'auth/wrong-password') {
                        GToast.shortBottom('Please Enter Correct Password')
                    }
                    else {
                        alert(err)
                    }

                    reject('')
                })
        })
    }

    contactSupport = (email, description) => {
        return new Promise((resolve, reject) => {
            const id = `id-${GCommon.getTimeStamp()}`
            firestore()
                .collection('SupportAndSuggestions')
                .doc(id)
                .set({
                    userEmail: email,
                    description: description,
                    createdAt: GCommon.convertToUTC(new Date()),
                    id: id
                })
                .then(() => {
                    resolve('')
                })
                .catch((err) => {
                    GCommon.commonError()
                    console.log('Error while creating Post =>', err)
                    reject('')
                })
        })
    }

    updatePrivacy = (data, user) => {
        return new Promise((resolve, reject) => {
            const { allowComments, allowPeoplePosts, hidePostsFromOthers } = data
            const { uid } = user
            firestore().collection('Users').doc(uid).update({
                allowComments: allowComments,
                allowPeoplePosts: allowPeoplePosts,
                hidePostsFromOthers: hidePostsFromOthers
            })
                .then(() => {
                    const { KEYS, setLocalData } = GDataManager
                    user.allowComments = allowComments,
                        user.allowPeoplePosts = allowPeoplePosts,
                        user.hidePostsFromOthers = hidePostsFromOthers
                    setLocalData(KEYS.USER_DETAILS, user).then(() => {
                        resolve('')
                    })
                        .catch((err) => {
                            console.log('error while upadting a privacy settings in local userData =>', err)
                            GCommon.commonError()
                            reject('')
                        })
                })
                .catch((err) => {
                    console.log('error while upadting a privacy settings =>', err)
                    GCommon.commonError()
                    reject('')
                })
        })
    }

    updatePost = (post) => {
        return new Promise((resolve, reject) => {
            firestore().collection('Posts').doc(post.id).update({
                allowComments: post.allowComments,
                hidePostsFromOthers: post.hidePostsFromOthers
            })
                .then(() => resolve(''))
                .catch((err) => {
                    console.log('error while updating post=>', err)
                    GCommon.commonError()
                    reject('')
                })
        })
    }


    deletePost = (post) => {
        return new Promise((resolve, reject) => {
            firestore()
                .collection('Posts').doc(post.id)
                .delete()
                .then(() => resolve(''))
                .catch((err) => {
                    console.log('error while deleting post=>', err)
                    GCommon.commonError()
                    reject('')
                })
        })
    }

    deleteComment = (post) => {
        return new Promise((resolve, reject) => {
            const { comments } = post
            firestore()
                .collection('Posts').doc(post.id)
                .update({
                    comments: comments
                })
                .then(() => resolve(''))
                .catch((err) => {
                    console.log('error while deleting Comment=>', err)
                    GCommon.commonError()
                    reject('')
                })
        })
    }

    updateImage = (user) => {
        return new Promise((resolve, reject) => {
            const { image, uid } = user
            firestore()
                .collection('Users').doc(uid)
                .update({
                    image: image
                })
                .then(() => {
                    const { KEYS, setLocalData } = GDataManager
                    setLocalData(KEYS.USER_DETAILS, user).then(() => {
                        GToast.shortBottom('Image Upload Successful')
                        resolve('')
                    })
                        .catch((err) => {
                            console.log('error while updating User image to localStorage =>', err)
                            GCommon.commonError()
                            reject('')
                        })
                })
                .catch((err) => {
                    console.log('error while updating User image to firestore =>', err)
                    GCommon.commonError()
                    reject('')
                })
        })
    }

    updateToken = async () => {
        return new Promise(async (resolve, reject) => {
            await messaging().requestPermission();
            const { getLocalData, setLocalData, KEYS } = GDataManager
            getLocalData(KEYS.USER_DETAILS).then(async (user) => {
                const uid: any = user.uid
                const token = await GToken()
                user.token = token
                firestore()
                    .collection('Users')
                    .doc(uid)
                    .update({ token: token })
                    .then(async () => {
                        setLocalData(KEYS.USER_DETAILS, user).then(() => {
                            resolve('')
                        })
                            .catch(err => {
                                console.log('error while getting data from local storage', err)
                                reject()
                            })
                    })
                    .catch(err => {
                        console.log('error while updating token on firebase', err)
                        reject()
                    })
            })
                .catch(err => {
                    console.log('error while getting user from local storage', err)
                    reject()
                })
        })
    }

    setLocation = (region) => {
        return new Promise((resolve, reject) => {
            const { getLocalData, setLocalData, KEYS } = GDataManager
            getLocalData(KEYS.USER_DETAILS).then(async (user) => {
                const uid: any = user.uid
                user.location = region
                firestore()
                    .collection('Users')
                    .doc(uid)
                    .update({ location: region })
                    .then(async () => {
                        setLocalData(KEYS.USER_DETAILS, user).then(() => {
                            resolve('')
                        })
                            .catch(err => {
                                console.log('error while getting data from local storage', err)
                                reject()
                            })
                    })
                    .catch(err => {
                        console.log('error while updating location on firebase', err)
                        reject()
                    })
            })
                .catch(err => {
                    console.log('error while getting user from local storage', err)
                    reject()
                })
        })

    }




}

const GFirebase = new firebaseService();
export { GFirebase }