import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { GHeader, GToast } from '../../Components'
import { GButton, GTextInput, hp, wp } from '../../Globals'
import { Colors } from '../../Res'
import { GFirebase } from '../../Services'
import Styles from './Styles'

export class ContactSupport extends Component<any> {
    state: {
        user: any,
        email: any
        description: any,
        sendLoader: any
    } = {
            user: this.props.route.params.user,
            description: '',
            sendLoader: false,
            email: this.props.route.params.user.email
        }
    render() {
        const { user, description, sendLoader, email } = this.state
        return (
            <View style={Styles.container}>
                <GHeader
                    back
                    navigation={this.props.navigation}
                    bgColor={"transparent"}
                    centerComponent={<View style={Styles.headerContainer}>
                        <Text style={Styles.headerText}>
                            Contact Support and Suggestions
                        </Text>
                    </View>}
                    style={{ borderBottomWidth: 0 }}
                />
                <View style={Styles.subContainer}>
                    <TextInput
                        style={GTextInput.input}
                        value={email}
                        onChangeText={this.onChangeEmail}
                        placeholder="Your Email Address"
                        placeholderTextColor={Colors.color2}
                    />

                    <TextInput
                        style={Styles.disInput}
                        value={description}
                        onChangeText={this.onChangeDescription}
                        placeholder="What would you like to ask or suggest?"
                        placeholderTextColor={Colors.color2}
                        multiline
                    />

                    <TouchableOpacity style={{ ...GButton.btn, marginTop: hp(8) }}
                        onPress={this.onSend}
                    >
                        {
                            sendLoader ?
                                <ActivityIndicator size="small" color={Colors.white} />
                                :
                                <Text style={GButton.txt}>Send</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    onChangeEmail = (text) => this.setState({ email: text })
    onChangeDescription = (text) => this.setState({ description: text })
    onSend = () => {
        const { email, description, user } = this.state
        if(email.trim().length === 0) {
            GToast.shortBottom('Please enter your email address')
        }
        else if(description.trim().length === 0) {
            GToast.shortBottom('Please enter Description')
        }
        else {
            this.setState({ sendLoader: true })
            GFirebase.contactSupport(email, description)
                .then(() => {
                    this.setState({ sendLoader: false, description: '' })
                    GToast.shortBottom('Message Sent Successfully')
                })
                .catch(() => this.setState({ sendLoader: false }))
        }
    }
}

export default ContactSupport
