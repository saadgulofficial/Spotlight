import React, { Component } from 'react'
import { Text, View, Switch, ActivityIndicator } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { GHeader, GLoader, GToast } from '../../Components'
import { hp, wp } from '../../Globals'
import { Colors } from '../../Res'
import { GDataManager, GFirebase } from '../../Services'
import Styles from './Styles'

export class PrivacySettings extends Component<any> {
    state: {
        allowComments: any,
        allowPeoplePosts: any,
        hidePostsFromOthers: any
        user: any,
        containerLoader: any,
        allowCommentsLoader: any,
        allowPeoplePostsLoader: any,
        hidePostsFromOthersLoader: any

    } = {
            allowComments: '',
            allowPeoplePosts: '',
            hidePostsFromOthers: '',
            user: this.props.route.params.user,
            containerLoader: true,
            allowCommentsLoader: false,
            allowPeoplePostsLoader: false,
            hidePostsFromOthersLoader: false
        }

    componentDidMount = () => {
        this.getData()
    }
    render() {
        const { allowComments, hidePostsFromOthers, allowPeoplePosts, containerLoader,
            allowCommentsLoader, allowPeoplePostsLoader, hidePostsFromOthersLoader } = this.state
        return (
            <View style={Styles.container}>
                <GHeader
                    back
                    navigation={this.props.navigation}
                    bgColor={"transparent"}
                    centerTitle="Privacy Settings"
                    style={{ borderBottomWidth: 0 }}
                />
                {containerLoader ? <GLoader /> :
                    <View>
                        <View style={Styles.cardContainer}>
                            <View style={Styles.titleContainer}>
                                <Text style={Styles.cardTitle} numberOfLines={1}>Allow Other People’s Comments</Text>
                                <Text style={Styles.cardDis}>
                                    Enable this to allow other people comments on your new posts
                                </Text>
                            </View>
                            {
                                allowCommentsLoader ? <ActivityIndicator color={Colors.color10} size="small" style={Styles.toggleLoader} />
                                    :
                                    <Switch
                                        trackColor={{ false: "#767577", true: Colors.color10 }}
                                        thumbColor={allowComments ? "white" : "#f4f3f4"}
                                        ios_backgroundColor="#fff"
                                        onValueChange={this.allowCommentsToggle}
                                        value={allowComments}
                                    />
                            }
                        </View>

                        <View style={Styles.cardContainer}>
                            <View style={Styles.titleContainer}>
                                <Text style={Styles.cardTitle} numberOfLines={1}>View Other People's Posts</Text>
                                <Text style={Styles.cardDis}>
                                    Enable this to view other people's posts on your home screen
                                </Text>
                            </View>
                            {
                                allowPeoplePostsLoader ? <ActivityIndicator color={Colors.color10} size="small" style={Styles.toggleLoader} />
                                    :
                                    <Switch
                                        trackColor={{ false: "#767577", true: Colors.color10 }}
                                        thumbColor={allowPeoplePosts ? "white" : "#f4f3f4"}
                                        ios_backgroundColor="#fff"
                                        onValueChange={this.allowPeoplePostsToggle}
                                        value={allowPeoplePosts}

                                    />
                            }
                        </View>

                        <View style={Styles.cardContainer}>
                            <View style={Styles.titleContainer}>
                                <Text style={Styles.cardTitle} numberOfLines={1}>Hide Posts from Others</Text>
                                <Text style={Styles.cardDis}>
                                    Enable this to hide your new posts from others
                                </Text>
                            </View>
                            {
                                hidePostsFromOthersLoader ? <ActivityIndicator color={Colors.color10} size="small" style={Styles.toggleLoader} />
                                    :
                                    <Switch
                                        trackColor={{ false: "#767577", true: Colors.color10 }}
                                        thumbColor={hidePostsFromOthers ? "white" : "#f4f3f4"}
                                        ios_backgroundColor="#fff"
                                        onValueChange={this.hidePostsFromOthersToggle}
                                        value={hidePostsFromOthers}

                                    />
                            }
                        </View>
                    </View>
                }
            </View>
        )
    }

    getData = () => {
        const { user } = this.state
        const { allowComments, allowPeoplePosts, hidePostsFromOthers } = user
        console.log(user)
        this.setState({
            allowComments,
            allowPeoplePosts,
            hidePostsFromOthers,
            containerLoader: false
        })
    }

    updateData = async () => {
        const { allowComments, allowPeoplePosts, hidePostsFromOthers, user } = this.state
        const data = {
            allowComments: allowComments,
            allowPeoplePosts: allowPeoplePosts,
            hidePostsFromOthers: hidePostsFromOthers,
        }
        GFirebase.updatePrivacy(data, user).then(() => {
            this.setState({
                allowCommentsLoader: false,
                allowPeoplePostsLoader: false,
                hidePostsFromOthersLoader: false
            })
            GToast.shortBottom('Privacy Updated')
        })
            .catch(() => {
                this.setState({
                    allowCommentsLoader: false,
                    allowPeoplePostsLoader: false,
                    hidePostsFromOthersLoader: false
                })
            })
    }

    allowCommentsToggle = () => {
        const { allowComments } = this.state
        this.setState({ allowComments: !allowComments, allowCommentsLoader: true }, () => this.updateData())
    }
    allowPeoplePostsToggle = () => {
        const { allowPeoplePosts } = this.state
        this.setState({ allowPeoplePosts: !allowPeoplePosts, allowPeoplePostsLoader: true }, () => this.updateData())
    }
    hidePostsFromOthersToggle = () => {
        const { hidePostsFromOthers } = this.state
        this.setState({ hidePostsFromOthers: !hidePostsFromOthers, hidePostsFromOthersLoader: true }, () => this.updateData())
    }
}

export default PrivacySettings
