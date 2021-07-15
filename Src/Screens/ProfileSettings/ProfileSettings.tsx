import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { GHeader, GImagePicker, GToast } from '../../Components'
import { wp } from '../../Globals'
import { Colors, Fonts, Images } from '../../Res'
import Styles from './Styles'
import ActionSheet from 'react-native-actionsheet'
import ProgressCircle from 'react-native-progress-circle'
import * as Animatable from 'react-native-animatable';
import { GCommon, GDataManager, GFirebase } from '../../Services'
import storage from '@react-native-firebase/storage';


export class ProfileSettings extends Component<any> {
    private ActionSheet: ActionSheet
    state: {
        progress: any,
        showProgress: any,
        user: any
    } = {
            progress: 0,
            showProgress: false,
            user: this.props.route.params.user,
        }
    render() {
        const { progress, showProgress, user } = this.state
        return (
            <View style={Styles.container}>
                <GHeader
                    back
                    navigation={this.props.navigation}
                    bgColor={"transparent"}
                    centerTitle="Profile Settings"
                    style={{ borderBottomWidth: 0 }}
                />
                {
                    showProgress ?
                        <Animatable.View
                            animation="zoomIn"
                            duration={700}
                            useNativeDriver={true}
                            style={Styles.profileImageContainer}
                        >
                            <ProgressCircle
                                percent={progress}
                                radius={wp(12.5)}
                                borderWidth={3}
                                color={'green'}
                                shadowColor="#F2F2F2"
                                bgColor="#fff"
                            >
                                <Text style={Styles.progressText}>{progress}%</Text>
                            </ProgressCircle>
                            <Text style={Styles.uploadingText}>Uplading Image..</Text>
                        </Animatable.View>
                        :
                        <View style={Styles.profileImageContainer}>
                            {
                                user && user.image ?
                                    <Image source={{ uri: user.image }}
                                        style={Styles.profile}
                                    />
                                    :
                                    <Image source={Images.user}
                                        style={Styles.profile}
                                    />
                            }
                            <TouchableOpacity style={Styles.editBtn} onPress={this.onEditPress}>
                                <Text style={Styles.editText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                }

                <View style={Styles.fieldsContainer}>
                    <TouchableOpacity style={Styles.fieldView} activeOpacity={0.7} onPress={this.changeName}>
                        <Text style={Styles.fieldName}>Change Name</Text>
                        <AntDesign name="right" size={wp(5)} color={Colors.color9} />
                    </TouchableOpacity>

                    <TouchableOpacity style={Styles.fieldView} activeOpacity={0.7} onPress={this.changeDescription}>
                        <Text style={Styles.fieldName}>Change Description</Text>
                        <AntDesign name="right" size={wp(5)} color={Colors.color9} />
                    </TouchableOpacity>

                    <TouchableOpacity style={Styles.fieldView} activeOpacity={0.7} onPress={this.changeEmail}>
                        <Text style={Styles.fieldName}>Change Email</Text>
                        <AntDesign name="right" size={wp(5)} color={Colors.color9} />
                    </TouchableOpacity>

                    <TouchableOpacity style={Styles.fieldView} activeOpacity={0.7} onPress={this.changeLocation}>
                        <Text style={Styles.fieldName}>Change Location</Text>
                        <AntDesign name="right" size={wp(5)} color={Colors.color9} />
                    </TouchableOpacity>
                </View>

                <ActionSheet
                    //@ts-ignore
                    ref={o => this.ActionSheet = o}
                    options={['Camera', 'Library', 'Cancel']}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={2}
                    onPress={this.onActionSheetPress}
                />

            </View>
        )
    }

    changeName = () => {
        const { user } = this.state
        this.props.navigation.navigate('ChangeName', { user: user })
    }

    changeDescription = () => {
        const { user } = this.state
        this.props.navigation.navigate('ChangeDescription', { user: user })
    }

    changeEmail = () => {
        const { user } = this.state
        this.props.navigation.navigate('ChangeEmail', { user: user })
    }

    changeLocation = () => this.props.navigation.navigate('ChangeLocation')
    onEditPress = () => {
        this.ActionSheet.show()
    }
    onActionSheetPress = (index) => {
        if(index === 0) {
            GImagePicker.openCamera().then((uri) => {
                if(uri) {
                    this.uploadImage(uri).then((URL) => this.saveImage(URL))
                }
            })
        }
        if(index === 1) {
            GImagePicker.openLibaray().then((uri) => {
                if(uri) {
                    this.uploadImage(uri).then((URL) => this.saveImage(URL))
                }
            })
        }
    }
    saveImage = async (uri) => {
        const { user } = this.state
        user.image = uri
        GFirebase.updateImage(user).then(async () => {
            this.setState({ showProgress: false, progress: 100 })
        })
            .catch(() => {
                this.setState({ showProgress: false, progress: 0 })
            })
    }


    uploadImage(imagePath: any) {
        return new Promise((resolve, reject) => {
            const { user } = this.state
            let name = user.uid
            const reference = storage().ref(`Images/${name}`);
            const task = reference.putFile(imagePath);
            //@ts-ignore
            task.on('state_changed', taskSnapshot => {
                //@ts-ignore
                this.setState({ showProgress: true, progress: parseInt((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100) })
            });
            task.then(async () => {
                const url = await storage().ref(`Images/${name}`).getDownloadURL();
                resolve(url)
            })
                .catch(
                    err => {
                        GCommon.commonError
                        console.log('error while uploading image =>', err)
                        this.setState({ showProgress: false, progress: 0 })
                        reject('')
                    }
                )
        })
    }





}

export default ProfileSettings
