import React, { Component } from 'react'
import { Text, View, TextInput, ActivityIndicator } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GToast } from '../../Components'
import { GHeader } from '../../Components/Header'
import { GButton, GTextInput, hp } from '../../Globals'
import { Colors } from '../../Res'
import { GFirebase } from '../../Services/Firebase'
import Styles from './Styles'

export class ForgotPassword extends Component<any> {
    state: {
        email: any,
        sendLoader: any
    } = {
            email: '',
            sendLoader: false
        }
    render() {
        const { email, sendLoader } = this.state
        return (
            <View style={{ flex: 1 }}>
                <GHeader
                    back
                    navigation={this.props.navigation}
                    bgColor={'transparent'}
                />
                <ScrollView contentContainerStyle={Styles.container}>
                    <View>
                        <View style={Styles.signinContainer}>
                            <Text style={Styles.signinText}>Forgot Password</Text>
                        </View>
                        <Text style={Styles.siginDis}>
                            Please enter your information below, and we will
                            send you an email to reset your password
                        </Text>
                        <View style={Styles.subContainer}>
                            <TextInput
                                value={email}
                                onChangeText={this.onChangeEmail}
                                placeholder={'Email'}
                                placeholderTextColor={Colors.color2}
                                style={GTextInput.input}
                                keyboardType='email-address'
                            />
                            <TouchableOpacity
                                style={{ ...GButton.btn, marginVertical: hp(6) }}
                                onPress={this.onSendPress}
                                disabled={sendLoader}
                            >
                                {sendLoader ? <ActivityIndicator color={Colors.white} size="small" />
                                    : <Text style={GButton.txt}>Send</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={Styles.resgisterContainer}>
                        <Text style={Styles.regDisText}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={this.onPressReg}>
                            <Text style={Styles.regText}>
                                Login here
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </View>
        )
    }

    onChangeEmail = (text) => {
        this.setState({ email: text })
    }
    onChangePassword = (text) => this.setState({ password: text })
    onPressReg = () => this.props.navigation.navigate('Signin')
    onSendPress = async () => {
        const { email } = this.state
        if(email.trim().length === 0) {
            GToast.shortBottom('Please enter your email')
        }
        else {
            this.setState({ sendLoader: true })
            await GFirebase.forgotPassword(email.toLowerCase()).then(() => {
                this.setState({ sendLoader: false })
            })
                .catch(() => {
                    this.setState({ sendLoader: false })
                })

        }

    }
}

export default ForgotPassword
