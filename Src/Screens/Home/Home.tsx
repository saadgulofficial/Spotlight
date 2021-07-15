import React, { Component } from 'react'
import { Text, View, SafeAreaView, TextInput, FlatList, StatusBar, TextStyle, TouchableOpacity, AppState, Platform, Alert } from 'react-native'
import { GHeader, GLoader, SocialCard } from '../../Components'
import { hp, wp } from '../../Globals'
import { Colors, Svgs } from '../../Res'
import Styles from './Styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'
import { GDataManager, GFirebase, GFunctions } from '../../Services'
import { Notification } from "react-native-in-app-message";
import ShowMessage from '../../Services/Notifications/Foreground'
import BackgroundNotification from '../../Services/Notifications/Background'
import moduleName from '../../../globalDeclaration'
import messaging from '@react-native-firebase/messaging';
import { GModalLoader } from '../../Components'

export class Home extends Component<any> {
    private _unsubscribe: any
    state: {
        posts: any,
        postsLoader: any,
        tempPosts: any,
        searchText: any
        withOutFilterPosts: any,
        isFetching: any,
        notificationsBadge: any,
        postUpdateLoader: any,
        postUpdateLoaderMessage: any,
    } = {
            posts: [],
            tempPosts: [],
            withOutFilterPosts: [],
            postsLoader: true,
            searchText: '',
            isFetching: false,
            notificationsBadge: 0,
            postUpdateLoader: false,
            postUpdateLoaderMessage: 'Updating Post Setting...',
        }
    async componentDidMount() {
        messaging().onMessage((remoteMessage) => { this.handleOnMessageBadge(remoteMessage) })
        AppState.addEventListener("change", this.handleAppStateChange);
        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            await this.getData()
            await GFirebase.updateToken()
            this.handleBadge()
        });
    }
    componentWillUnmount() {
        this._unsubscribe()
    }

    handleAppStateChange = async (nextAppState) => {
        if(nextAppState === "active") {
            this.handleBadge()
            this.forceUpdate()
        }
    }

    render() {
        const { posts, searchText, postsLoader, isFetching, notificationsBadge, postUpdateLoader, postUpdateLoaderMessage, } = this.state
        const { navigation } = this.props
        return (
            <View style={Styles.container}>
                <BackgroundNotification navigation={navigation} />
                <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
                <GHeader
                    bgColor={"transparent"}
                    style={Styles.headerContainer}
                    left={<Text style={Styles.headerText}>Spotlight</Text>}
                    right={
                        <View style={Styles.alertContainer}>
                            {
                                global.filterPressed &&
                                <TouchableOpacity onPress={this.onReset}>
                                    <Text style={Styles.reset}>Reset</Text>
                                </TouchableOpacity>
                            }
                            <TouchableOpacity onPress={this.onFilterPress} style={Styles.filterIconContainer}>
                                <Ionicons name="md-filter" size={wp(8)} color={Colors.color} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onNotificationPress} style={Styles.notificationIconContainer} >
                                <Svgs.alert />
                                {
                                    notificationsBadge !== 0 &&
                                    <View style={Styles.badgeView} >
                                        <Text style={Styles.badgeText}>{notificationsBadge}</Text>
                                    </View>
                                }
                            </TouchableOpacity>
                        </View>
                    }
                />
                {
                    postUpdateLoader &&
                    <GModalLoader
                        show={postUpdateLoader}
                        loadingMessage={postUpdateLoaderMessage}
                    />
                }
                <Notification
                    ref={(s) => global.NRef = s}
                    autohide={true}
                    duration={2500}
                    customComponent={<ShowMessage navigation={navigation} />}
                    style={{ backgroundColor: 'transparent', width: wp(80), borderRadius: 30, marginTop: hp(6) }}
                    showKnob={false}
                    onPress={() => { }}
                />

                <View style={Styles.searchBarContainer}>
                    <View style={Styles.searchBar}>
                        {<Svgs.search />}
                        <TextInput
                            placeholder="Search"
                            value={searchText}
                            onChangeText={this.updateSearch}
                            placeholderTextColor={Colors.color2}
                            style={Styles.searchInput}
                        />
                    </View>
                </View>
                <View
                    style={{ flex: 1 }}
                >
                    {
                        postsLoader ? <View style={Styles.emptyListContainer}><GLoader /></View> :
                            <FlatList
                                refreshing={isFetching}
                                onRefresh={this.handleRefresh}
                                data={posts}
                                ListEmptyComponent={this.renderEmptyList}
                                renderItem={this.renderSocialCard}
                                contentContainerStyle={{ paddingVertical: hp(2), paddingHorizontal: wp(4) }}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                            />
                    }
                </View>

            </View>
        )
    }

    renderEmptyList = () => {
        return (
            <View style={Styles.emptyListContainer}>
                <Text style={Styles.emptyListText}>No post found</Text>
            </View>
        )
    }
    renderSocialCard = ({ item }) => {
        return (
            <SocialCard
                item={item}
                navigation={this.props.navigation}
                optionPress={(index) => this.handleActionSheetPress(index, item)}
            />
        )
    }

    onNotificationPress = () => this.props.navigation.navigate('Notifications')
    onFilterPress = () => this.props.navigation.navigate('FilterPosts')

    updateSearch = (searchText: any) => {
        const { tempPosts } = this.state
        this.setState({ searchText },
            () => {
                if(searchText.trim().length === 0) {
                    this.setState({ posts: tempPosts });
                    return;
                }
                var temp = tempPosts.filter(function (element) {
                    const text = searchText.toUpperCase().trim()
                    //@ts-ignore
                    const title = element.title.trim().toUpperCase().trim()
                    return title.includes(text)
                }).map(function (item) {
                    return item
                })
                this.setState({ posts: temp })
            }
        )
    }


    getData = async () => {
        const { GFunctions } = require('../../Services/Functions')
        GFunctions.getPosts().then((posts) => {
            GFirebase.getCurrentUserLocal().then((user: any) => {
                const { uid, allowPeoplePosts } = user
                if(allowPeoplePosts) {
                    _.remove(posts, function (o: any) {
                        if(o.createdBy === uid) { return null }
                        else { return o.hidePostsFromOthers && o.createdBy !== uid }
                    });
                }
                else {
                    _.remove(posts, function (o: any) { return o.createdBy !== uid })
                }
                if(global.filterPressed) {
                    GFunctions.filterPosts(posts).then((filterPost) => {
                        this.setState({ posts: filterPost, tempPosts: filterPost, postsLoader: false, withOutFilterPosts: posts, isFetching: false })
                    })
                        .catch(() => {
                            this.setState({ posts, tempPosts: posts, postsLoader: false, withOutFilterPosts: posts, isFetching: false })
                        })
                }
                else {
                    this.setState({ posts, tempPosts: posts, postsLoader: false, isFetching: false })
                }
            })
                .catch((err) => {
                    console.log('error while getting current user uid from getData of Home Screen =>', err)
                    this.setState({ posts, tempPosts: posts, postsLoader: false, isFetching: false })
                })
        })
            .catch(() => this.setState({ postsLoader: false, isFetching: false }))
    }



    onReset = () => {
        const { withOutFilterPosts } = this.state
        global.filterPressed = false
        this.setState({ posts: withOutFilterPosts, tempPosts: withOutFilterPosts })
    }

    handleRefresh = async () => {
        this.setState({ isFetching: true })
        await this.getData()
    }

    handleBadge = () => {
        if(Platform.OS === 'ios') {
            GFunctions.getNotificationsBadgeIOS().then((notificationsBadge) => {
                this.setState({ notificationsBadge })
            })
        }
        else {
            GFunctions.getNotificationsBadgeLocal().then((notificationsBadge) => {
                console.log('notificationsBadge ->', notificationsBadge)
                this.setState({ notificationsBadge })
            })
        }
    }


    handleOnMessageBadge = (remoteMessage) => {
        GFunctions.getNotificationsBadgeForground(remoteMessage).then((notificationsBadge) => {
            this.setState({ notificationsBadge })
        })
    }



    handleActionSheetPress = (index, item) => {
        const { posts } = this.state
        if(index === 0) {
            this.setState({ postUpdateLoader: true })
            item.hidePostsFromOthers = !item.hidePostsFromOthers
            GFirebase.updatePost(item).then(() => {
                this.setState({ postUpdateLoader: false })
                this.forceUpdate()
                Alert.alert('Post Updated')
            })
                .catch(() => this.setState({ postUpdateLoader: false }))
        }
        else if(index === 1) {
            this.setState({ postUpdateLoader: true })
            item.allowComments = !item.allowComments
            GFirebase.updatePost(item).then(() => {
                this.setState({ postUpdateLoader: false })
                this.forceUpdate()
                Alert.alert('Post Updated')
            })
                .catch(() => this.setState({ postUpdateLoader: false }))
        }
        else if(index === 2) {
            Alert.alert(
                "",
                "Are your sure you want to delete your post?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: async () => {
                            this.setState({ postUpdateLoader: true })
                            this.setState({ postUpdateLoaderMessage: 'Deleting Post...' })
                            GFirebase.deletePost(item).then(() => {
                                this.setState({ postUpdateLoader: false })
                                _.remove(posts, function (o) { return o.id === item.id })
                                this.setState({ posts: posts, tempPosts: posts, withOutFilterPosts: posts })
                                this.forceUpdate()
                                Alert.alert('Post Deleted')
                            })
                                .catch(() => this.setState({ postUpdateLoader: false }))
                        }
                    }
                ])
        }
    }



}

export default Home
