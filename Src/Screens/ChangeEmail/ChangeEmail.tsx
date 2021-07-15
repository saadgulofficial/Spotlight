import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { GHeader, GToast } from '../../Components'
import { GButton, GTextInput, hp } from '../../Globals'
import { Colors } from '../../Res'
import { GFirebase } from '../../Services'
import Styles from './Styles'

export class ChangeEmail extends Component<any> {
    state: {
        email: any,
        password: any
        user: any,
        updateLoader: any
    } = {
            email: '',
            user: this.props.route.params.user,
            updateLoader: false,
            password: ''
        }
    render() {
        const { email, updateLoader, password } = this.state
        return (
            <View style={Styles.container}>
                <GHeader
                    back
                    navigation={this.props.navigation}
                    bgColor={"transparent"}
                    centerTitle="Change Email"
                    style={{ borderBottomWidth: 0 }}
                />
                <View style={Styles.subContainer}>
                    <TextInput
                        style={GTextInput.input}
                        value={email}
                        onChangeText={this.onChangeEmail}
                        placeholder="Enter New Email"
                        placeholderTextColor={Colors.color2}
                    />

                    <TextInput
                        style={{ ...GTextInput.input, marginVertical: hp(1) }}
                        value={password}
                        onChangeText={this.onChangePassword}
                        placeholder="Enter Your Password"
                        secureTextEntry
                        placeholderTextColor={Colors.color2}
                    />

                    <TouchableOpacity style={{ ...GButton.btn, marginVertical: hp(6) }}
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

    onChangeEmail = (text) => this.setState({ email: text })
    onChangePassword = (text) => this.setState({ password: text })

    onUpdate = () => {
        const { email, user, password } = this.state
        if(email.trim().length === 0) {
            GToast.shortBottom('Please Enter your new email')
        }
        else if(password.trim().length === 0) {
            GToast.shortBottom('Please Enter your password')
        }
        else {
            this.setState({ updateLoader: true })
            var newEmail = email.toLowerCase()
            GFirebase.updateEmail(user, password, newEmail).then(() => {
                this.setState({ updateLoader: false })
                GToast.shortBottom('Email Updated')
            })
                .catch(() => this.setState({ updateLoader: false }))
        }
    }
}

export default ChangeEmail