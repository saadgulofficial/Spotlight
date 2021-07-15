import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import { GHeader, GToast } from '../../Components'
import { GButton, GTextInput, hp } from '../../Globals'
import { Colors } from '../../Res'
import { GDataManager, GFirebase } from '../../Services'
import Styles from './Styles'

export class ChangeName extends Component<any> {
    state: {
        name,
        user: any,
        updateLoader: any
    } = {
            name: '',
            user: this.props.route.params.user,
            updateLoader: false
        }

    componentDidMount = () => {
        this.setData()
    }
    render() {
        const { name, updateLoader } = this.state
        return (
            <View style={Styles.container}>
                <GHeader
                    back
                    navigation={this.props.navigation}
                    bgColor={"transparent"}
                    centerTitle="Change Name"
                    style={{ borderBottomWidth: 0 }}
                />
                <View style={Styles.subContainer}>
                    <TextInput
                        style={GTextInput.input}
                        placeholder="Enter New Name"
                        placeholderTextColor={Colors.color2}
                        value={name}
                        onChangeText={this.onChangeName}
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
    onChangeName = (text) => this.setState({ name: text })
    onUpdate = () => {
        const { name, user } = this.state
        if(name.trim().length === 0) {
            GToast.shortBottom('Please Enter your new name')
        }
        else {
            this.setState({ updateLoader: true })
            user.name = name
            GFirebase.updateUserName(user).then(() => {
                this.setState({ updateLoader: false })
                GToast.shortBottom('Name Updated')
            })
                .catch(() => this.setState({ updateLoader: false }))
        }
    }

    setData = () => {
        const { user } = this.state
        this.setState({ name: user.name })
    }
}

export default ChangeName
