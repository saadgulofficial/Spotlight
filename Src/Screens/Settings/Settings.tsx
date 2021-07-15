import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { GHeader } from '../../Components'
import { hp, wp } from '../../Globals'
import { Colors, Images } from '../../Res'
import { GDataManager, GFirebase } from '../../Services'
import Styles from './Styles'
export class Settings extends Component<any> {
    private _unsubscribe: any
    state: {
        user: any
    } = {
            user: this.props.route.params.user,
        }

    async componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            this.getData()
        });
    }
    componentWillUnmount() { this._unsubscribe(); }

    render() {
        const { user } = this.state
        return (
            <View style={Styles.container}>
                <GHeader
                    back
                    navigation={this.props.navigation}
                    bgColor={"transparent"}
                    centerTitle="Settings"
                    style={{ borderBottomWidth: 0 }}
                />
                <View style={Styles.profileContainer}>
                    {
                        user && user.image ?
                            <Image
                                source={{ uri: user.image }}
                                style={Styles.profileImage}
                            />
                            :
                            <Image
                                source={Images.user}
                                style={Styles.profileImage}
                            />
                    }
                    <View style={Styles.nameEmailCon}>
                        <Text style={Styles.profileName}>{user.name}</Text>
                        <Text style={Styles.profileEmail}>{user.email}</Text>
                    </View>
                </View>

                <TouchableOpacity style={Styles.cardContainer}
                    onPress={this.privacySettings}
                >
                    <Text style={Styles.cardText}>Privacy Settings</Text>
                    <AntDesign name="right" size={wp(5)} color={Colors.color9} />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.cardContainer}
                    onPress={this.profileSettings}
                >
                    <Text style={Styles.cardText}>Profile Settings</Text>
                    <AntDesign name="right" size={wp(5)} color={Colors.color9} />
                </TouchableOpacity>
                <TouchableOpacity style={{ ...Styles.cardContainer, borderBottomWidth: 0.25, marginBottom: hp(3) }}
                    onPress={this.security}
                >
                    <Text style={Styles.cardText}>Securiy</Text>
                    <AntDesign name="right" size={wp(5)} color={Colors.color9} />
                </TouchableOpacity>

                <TouchableOpacity style={{ ...Styles.cardContainer, borderBottomWidth: 0.25, marginBottom: hp(7) }}
                    onPress={this.contactSupport}
                >
                    <Text style={Styles.cardText}>Contact Support or Suggestions</Text>
                    <AntDesign name="right" size={wp(5)} color={Colors.color9} />
                </TouchableOpacity>

                <TouchableOpacity style={{ ...Styles.cardContainer, borderBottomWidth: 0.25, marginBottom: hp(3) }}
                    onPress={this.logOut}
                >
                    <Text style={Styles.cardText}>Log Out</Text>
                    <AntDesign name="right" size={wp(5)} color={Colors.color9} />
                </TouchableOpacity>
            </View>
        )
    }

    privacySettings = () => {
        const { user } = this.state
        this.props.navigation.navigate('PrivacySettings', { user: user })
    }
    profileSettings = () => {
        const { user } = this.state
        this.props.navigation.navigate('ProfileSettings', { user: user })
    }
    security = () => {
        const { user } = this.state
        this.props.navigation.navigate('Security', { user: user })
    }
    contactSupport = () => {
        const { user } = this.state
        this.props.navigation.navigate('ContactSupport', { user: user })
    }
    logOut = () => Alert.alert(
        "Log Out",
        "Are you sure you want to log out ?",
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "Log Out", onPress: () => {
                    GFirebase.logOut().then(() => {
                        const { clearAll } = GDataManager
                        clearAll().then(() => {
                            this.props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'SigninTwo' }],
                            });
                        })
                    })

                }
            }
        ]
    );

    getData = async () => {
        const { KEYS, getLocalData } = GDataManager
        await getLocalData(KEYS.USER_DETAILS).then((user) => this.setState({ user }))
    }
}

export default Settings
