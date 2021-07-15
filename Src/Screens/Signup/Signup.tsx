import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { GButton, GTextInput, hp } from '../../Globals'
import { GHeader, GToast } from '../../Components'
import { Colors } from '../../Res'
import { GCommon, GFirebase } from '../../Services/index'
import DismissKeyboardView from '../../Components/dismissKeyboard'
import Styles from './Styles'

export class Signup extends Component<any> {
    state: {
        email: any,
        password: any,
        name: any,
        regLoader: any
    } = {
            email: '',
            password: '',
            name: '',
            regLoader: false
        }
    render() {
        const { email, password, name, regLoader } = this.state
        return (
            <DismissKeyboardView style={{ flex: 1, }}>
                <GHeader
                    back
                    navigation={this.props.navigation}
                    bgColor={'transparent'}
                />
                <KeyboardAvoidingView
                    //@ts-ignore
                    behavior={Platform.OS === "ios" ? 'padding' : null}
                    style={Styles.container}
                >
                    <View>
                        <View style={Styles.signinContainer}>
                            <Text style={Styles.signinText}>Sign Up</Text>
                        </View>
                        <Text style={Styles.siginDis}>
                            Please enter your information below to
                            register an account
                        </Text>
                        <View style={Styles.subContainer}>

                            <TextInput
                                value={name}
                                onChangeText={this.onChangeName}
                                placeholder={'Name'}
                                placeholderTextColor={Colors.color2}
                                style={{ ...GTextInput.input, marginVertical: hp(2) }}
                            />

                            <TextInput
                                value={email}
                                onChangeText={this.onChangeEmail}
                                keyboardType='email-address'
                                placeholder={'Email'}
                                placeholderTextColor={Colors.color2}
                                style={GTextInput.input}
                            />

                            <TextInput
                                value={password}
                                onChangeText={this.onChangePassword}
                                placeholder={'Password'}
                                secureTextEntry
                                placeholderTextColor={Colors.color2}
                                style={{ ...GTextInput.input, marginVertical: hp(2) }}
                            />
                            <TouchableOpacity
                                style={{ ...GButton.btn, marginVertical: hp(4) }}
                                onPress={this.onRegisterPress}
                                disabled={regLoader}
                            >
                                {
                                    regLoader ?
                                        <ActivityIndicator color={Colors.white} size="small" />
                                        : <Text style={GButton.txt}>Resgister</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={Styles.resgisterContainer}>
                        <Text style={Styles.regDisText}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={this.onLoginPress}>
                            <Text style={Styles.regText}>
                                Login here
                            </Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>
            </DismissKeyboardView>
        )
    }

    onChangeEmail = (text) => {
        this.setState({ email: text })
    }
    onChangePassword = (text) => this.setState({ password: text })
    onChangeName = (text) => {
        const newText = GCommon.Capitalize(text)
        this.setState({ name: newText })
    }

    onLoginPress = () => this.props.navigation.goBack()
    onRegisterPress = async () => {
        const { email, name, password } = this.state
        if(name.trim().length === 0) {
            GToast.shortBottom('Please enter your name')
        }
        else if(email.trim().length === 0) {
            GToast.shortBottom('Please enter your email')
        }
        else if(password.trim().length === 0) {
            GToast.shortBottom('Please enter your password')
        }
        else {
            this.setState({ regLoader: true })
            const user = {
                name: name,
                email: email.toLowerCase(),
                password: password,
                allowComments: true,
                allowPeoplePosts: true,
                hidePostsFromOthers: false
            }
            await GFirebase.register(user).then(() => {
                this.setState({ regLoader: false })
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'BottomTabTwo' }],
                });
            }).catch(() => this.setState({ regLoader: false }))
        }
    }

}

export default Signup
