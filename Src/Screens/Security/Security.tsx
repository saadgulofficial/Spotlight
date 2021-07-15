import React, { Component } from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, FlatList, TextInput, ActivityIndicator } from 'react-native'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { Colors } from '../../Res';
import { SocialCard, GHeader, GToast } from '../../Components';
import { GButton, GTextInput, hp, wp } from '../../Globals'
import Styles from './Styles'
import { GFirebase } from '../../Services';

export class Security extends Component<any> {
    state: {
        user: any,
        oldPass: any,
        newPass: any,
        newPassConfirm: any,
        updateLoader: any
    } = {
            user: this.props.route.params.user,
            oldPass: '',
            newPass: '',
            newPassConfirm: '',
            updateLoader: false,
        }
    render() {
        const { oldPass, newPass, newPassConfirm, updateLoader } = this.state
        return (
            <View style={Styles.container}>
                <GHeader
                    back
                    navigation={this.props.navigation}
                    bgColor={"transparent"}
                    centerTitle="Security"
                    style={{ borderBottomWidth: 0 }}
                />
                <View style={Styles.subContainer}>
                    <TextInput
                        style={GTextInput.input}
                        value={oldPass}
                        onChangeText={this.onChangeOld}
                        placeholder="Old Password"
                        placeholderTextColor={Colors.color2}
                        secureTextEntry
                    />
                    <TextInput
                        style={{ ...GTextInput.input, marginTop: hp(1) }}
                        value={newPass}
                        onChangeText={this.onChangeNew}
                        placeholder="New Password"
                        placeholderTextColor={Colors.color2}
                        secureTextEntry
                    />
                    <TextInput
                        style={{ ...GTextInput.input, marginTop: hp(1) }}
                        value={newPassConfirm}
                        onChangeText={this.onChangeNewConfirm}
                        placeholder="Confirm New Password"
                        placeholderTextColor={Colors.color2}
                        secureTextEntry
                    />
                    <TouchableOpacity style={{ ...GButton.btn, marginTop: hp(6) }}
                        onPress={this.onUpdate}
                    >
                        {
                            updateLoader ?
                                <ActivityIndicator color={Colors.white} size="small" /> :
                                <Text style={GButton.txt}>Update</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    onChangeOld = (text) => this.setState({ oldPass: text })
    onChangeNew = (text) => this.setState({ newPass: text })
    onChangeNewConfirm = (text) => this.setState({ newPassConfirm: text })

    onUpdate = () => {
        const { oldPass, newPass, newPassConfirm, user } = this.state
        if(oldPass.trim().length === 0) {
            GToast.shortBottom('Please Enter your old password')
        }
        else if(newPass.trim().length === 0) {
            GToast.shortBottom('Please Enter your new password')
        }
        else if(newPassConfirm.trim().length === 0) {
            GToast.shortBottom('Please Enter your new password again')
        }
        else if(newPass !== newPassConfirm) {
            GToast.shortBottom('Password Not matched')
        }
        else {
            this.setState({ updateLoader: true })
            GFirebase.updatePassword(user, oldPass, newPass).then(() => {
                this.setState({ updateLoader: false })
                GToast.shortBottom('Password Updated')
            })
                .catch(() => this.setState({ updateLoader: false }))
        }
    }


}

export default Security
