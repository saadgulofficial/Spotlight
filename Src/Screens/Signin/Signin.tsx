import React, { Component } from 'react'
import { Text, View, TextInput, ActivityIndicator } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GToast } from '../../Components'
import { GButton, GTextInput, hp } from '../../Globals'
import { Colors } from '../../Res'
import { GFirebase } from '../../Services'
import Styles from './Styles'

export class Signin extends Component<any> {
    state: {
        email: any,
        password: any,
        loginLoader: any
    } = {
            email: '',
            password: '',
            loginLoader: false
        }
    render() {
        const { email, password, loginLoader } = this.state
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={Styles.container}>
                    <View>
                        <View style={Styles.signinContainer}>
                            <Text style={Styles.signinText}>Sign In</Text>
                        </View>
                        <Text style={Styles.siginDis}>
                            Please enter your information below to
                            login to your account
                        </Text>
                        <View style={Styles.subContainer}>
                            <TextInput
                                value={email}
                                onChangeText={this.onChangeEmail}
                                placeholder={'Email'}
                                placeholderTextColor={Colors.color2}
                                keyboardType='email-address'
                                style={GTextInput.input}
                            />

                            <TextInput
                                value={password}
                                secureTextEntry
                                onChangeText={this.onChangePassword}
                                placeholder={'Password'}
                                placeholderTextColor={Colors.color2}
                                style={{ ...GTextInput.input, marginVertical: hp(2) }}
                            />
                            <TouchableOpacity onPress={this.onForgotPass}>
                                <Text style={Styles.forgotPassText}>Forgot Password?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ ...GButton.btn, marginVertical: hp(4) }}
                                onPress={this.onLoginPress}
                            >
                                {
                                    loginLoader ? <ActivityIndicator color={Colors.white} size="small" />
                                        : <Text style={GButton.txt}>Login</Text>
                                }

                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={Styles.resgisterContainer}>
                        <Text style={Styles.regDisText}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity onPress={this.onPressReg}>
                            <Text style={Styles.regText}>
                                Register here
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

    onChangeEmail = (text) => {
        this.setState({ email: text })
    }
    onChangePassword = (text) => this.setState({ password: text })
    onPressReg = () => this.props.navigation.navigate('Signup')
    onForgotPass = () => this.props.navigation.navigate('ForgotPassword')
    onLoginPress = async () => {
        const { email, password } = this.state
        if(email.trim().length === 0) {
            GToast.shortBottom('Please enter your email')
        }
        else if(password.trim().length === 0) {
            GToast.shortBottom('Please enter your password')
        }
        else {
            this.setState({ loginLoader: true })
            const user = {
                email: email.toLowerCase(),
                password: password
            }
            await GFirebase.signin(user).then(() => {
                this.setState({ loginLoader: false })
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'BottomTabTwo' }],
                });
            }).catch(() => this.setState({ loginLoader: false }))
        }
    }
}

export default Signin
