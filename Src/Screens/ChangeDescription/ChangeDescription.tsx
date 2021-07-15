import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { GHeader, GToast } from '../../Components'
import { GButton, GTextInput, hp } from '../../Globals'
import { Colors } from '../../Res'
import { GDataManager, GFirebase } from '../../Services'
import Styles from './Styles'

export class ChangeDescription extends Component<any> {
    state: {
        description,
        user: any,
        updateLoader: any
    } = {
            description: '',
            user: this.props.route.params.user,
            updateLoader: false
        }

    componentDidMount = () => {
        this.setData()
    }
    render() {
        const { description, updateLoader } = this.state
        return (
            <View style={Styles.container}>
                <GHeader
                    back
                    navigation={this.props.navigation}
                    bgColor={"transparent"}
                    centerTitle="Change Description"
                    style={{ borderBottomWidth: 0 }}
                />
                <View style={Styles.subContainer}>
                    <TextInput
                        style={{ ...GTextInput.input, ...Styles.description }}
                        placeholder="Enter New Description"
                        placeholderTextColor={Colors.color2}
                        value={description}
                        multiline
                        onChangeText={this.onChangeDescription}
                    />
                    <TouchableOpacity style={{ ...GButton.btn, marginVertical: hp(6) }}
                        onPress={this.onUpdate}
                    >
                        {
                            updateLoader ?
                                <ActivityIndicator color={Colors.white} size="small" />
                                : <Text style={GButton.txt}>Update</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    onChangeDescription = (text) => this.setState({ description: text })
    onUpdate = () => {
        const { description, user } = this.state
        if(description.trim().length === 0) {
            GToast.shortBottom('Please Enter your new description')
        }
        else {
            this.setState({ updateLoader: true })
            user.description = description
            GFirebase.updateUserDescription(user).then(() => {
                this.setState({ updateLoader: false })
                GToast.shortBottom('description Updated')
            })
                .catch(() => this.setState({ updateLoader: false }))
        }
    }

    setData = () => {
        const { user } = this.state
        if(user.description) {
            this.setState({ description: user.description })
        }

    }
}

export default ChangeDescription
