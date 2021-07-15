import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { GHeader, GLoader, SocialCard } from '../../Components';
import { hp, wp } from '../../Globals'
import Styles from './Styles'
import { GFirebase, GFunctions } from '../../Services';
import _ from 'lodash'
import { Images } from '../../Res';
import { GModalLoader } from '../../Components'


export class Profile extends Component<any> {
    private _unsubscribe: any
    state: {
        history: any,
        likedPosts: any,
        bookMarks: any
        posts: any,
        postsLoader: any,
        user: any,
        postUpdateLoader: any,
        postUpdateLoaderMessage: any,
        page: any,
        noScroll: any,
        seeMore: any
    } = {
            postsLoader: true,
            likedPosts: [],
            history: [],
            bookMarks: [],
            posts: [],
            user: '',
            postUpdateLoader: false,
            postUpdateLoaderMessage: 'Updating Post Setting...',
            page: 0,
            noScroll: false,
            seeMore: ''
        }


    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => { this.getData() });
        this.getData()
    }
    componentWillUnmount() { this._unsubscribe(); }

    render() {
        const { history, likedPosts, bookMarks, postsLoader, user, postUpdateLoader, postUpdateLoaderMessage, seeMore } = this.state
        return (
            <View style={Styles.container}>
                <GHeader
                    bgColor={"transparent"}
                    style={Styles.headerContainer}
                    left={<Text style={Styles.headerText}>My Profile</Text>}
                />
                {
                    postUpdateLoader &&
                    <GModalLoader
                        show={postUpdateLoader}
                        loadingMessage={postUpdateLoaderMessage}
                    />
                }
                <View style={Styles.profilePictureContainer}>
                    {
                        user.image ?
                            <Image
                                source={{ uri: user.image }}
                                style={Styles.profileImage}
                                resizeMethod='auto'
                                resizeMode='cover'
                            />
                            :
                            <Image
                                source={Images.user}
                                style={Styles.profileImage}
                                resizeMethod='auto'
                                resizeMode='cover'
                            />
                    }
                    <View style={Styles.nameSettingCon}>
                        <Text style={Styles.profileName}>{user.name}</Text>
                        <TouchableOpacity style={Styles.settingsButton}
                            onPress={this.onPressSettings}
                        >
                            <Text style={Styles.settings}>Settings</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={Styles.discriptionContainer}>
                    {
                        user.description && user.description.length > 170 ?
                            (
                                seeMore ? (
                                    <TouchableOpacity onPress={() => this.setState({ seeMore: false })} activeOpacity={1}>
                                        <Text style={Styles.profileDis}>{user.description}</Text>
                                        <Text style={{ ...Styles.seeMore, marginLeft: wp(4), marginTop: hp(0.3) }}>Read less</Text>
                                    </TouchableOpacity>
                                ) :
                                    (
                                        <TouchableOpacity onPress={() => this.setState({ seeMore: true })} activeOpacity={1}>
                                            <Text style={Styles.profileDis}>{`${user.description.slice(0, 85)}  `}
                                                <Text style={Styles.seeMore}>Read More...</Text>
                                            </Text>
                                        </TouchableOpacity>
                                    )
                            )
                            : (
                                <Text style={Styles.profileDis}>{user.description}</Text>
                            )
                    }
                </View>


                {/* <Text style={Styles.profileDis} numberOfLines={2}>
                    {user.description}
                </Text> */}

                <ScrollableTabView
                    style={{ marginTop: 20 }}
                    initialPage={0}
                    renderTabBar={(props) => this.renderTabBarHeader(props)}
                >
                    <View
                        //@ts-ignore 
                        tabLabel='History'
                        style={{ flex: 1 }}
                    >
                        {
                            postsLoader ? <View style={Styles.emptyListContainer}><GLoader /></View> :
                                <FlatList
                                    data={history}
                                    renderItem={this.renderSocialCard}
                                    contentContainerStyle={{ paddingVertical: hp(2), paddingHorizontal: wp(4) }}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsVerticalScrollIndicator={false}
                                    ListEmptyComponent={this.renderEmptyList}
                                />
                        }
                    </View>

                    <View
                        //@ts-ignore 
                        tabLabel='Liked Posts'
                        style={{ flex: 1 }}
                    >
                        {
                            postsLoader ? <View style={Styles.emptyListContainer}><GLoader /></View> :
                                <FlatList
                                    data={likedPosts}
                                    renderItem={this.renderSocialCard}
                                    contentContainerStyle={{ paddingVertical: hp(2), paddingHorizontal: wp(4) }}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsVerticalScrollIndicator={false}
                                    ListEmptyComponent={this.renderEmptyList}
                                />
                        }
                    </View>

                    <View
                        //@ts-ignore 
                        tabLabel='Bookmarks'
                        style={{ flex: 1 }}
                    >
                        {
                            postsLoader ? <View style={Styles.emptyListContainer}><GLoader /></View> :
                                <FlatList
                                    data={bookMarks}
                                    renderItem={this.renderSocialCard}
                                    contentContainerStyle={{ paddingVertical: hp(2), paddingHorizontal: wp(4) }}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsVerticalScrollIndicator={false}
                                    ListEmptyComponent={this.renderEmptyList}
                                />
                        }
                    </View>

                </ScrollableTabView>
            </View>
        )
    }

    renderTabBarHeader = (props) => {
        const { tabs, activeTab } = props
        return (
            <View style={Styles.tabBarHeader}>
                <TouchableOpacity style={{ ...Styles.tabBarHeaderItem, borderBottomWidth: activeTab === 0 ? 2 : 0 }}
                    activeOpacity={1}
                    onPress={() => {
                        this.setState({ page: 0, noScroll: true })
                    }}
                >
                    <Text style={Styles.tabBarHeaderText}>{tabs[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...Styles.tabBarHeaderItem, borderBottomWidth: activeTab === 1 ? 2 : 0 }}
                    activeOpacity={1}
                    onPress={() => {
                        this.setState({ page: 1 })
                    }}
                >
                    <Text style={Styles.tabBarHeaderText}>{tabs[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...Styles.tabBarHeaderItem, borderBottomWidth: activeTab === 2 ? 2 : 0 }}
                    activeOpacity={1}
                    onPress={() => {
                        this.setState({ page: 2, noScroll: true })
                    }}
                >
                    <Text style={Styles.tabBarHeaderText}>{tabs[2]}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    handleActionSheetPress = (index, item) => {
        const { history } = this.state
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
                                _.remove(history, function (o) { return o.id === item.id })
                                this.forceUpdate()
                                Alert.alert('Post Deleted')
                            })
                                .catch(() => this.setState({ postUpdateLoader: false }))
                        }
                    }
                ])
        }
    }
    renderSocialCard = ({ item }) => {
        return (
            <SocialCard
                item={item}
                navigation={this.props.navigation}
                optionPress={(index) => this.handleActionSheetPress(index, item)}
                forceUpdateItem={this.forceUpdateItem}
            />
        )

    }

    renderEmptyList = () => {
        return (
            <View style={Styles.emptyListContainer}>
                <Text style={Styles.emptyListText}>No post found</Text>
            </View>
        )
    }

    getData = () => {
        this.setState({ postsLoader: true })
        GFirebase.getCurrentUserLocal().then((user => this.setState({ user })))
        GFunctions.getPosts().then((posts) => {
            GFirebase.getCurrentUserUid().then((uid: any) => {
                const history = _.filter(posts, function (o) { return o.createdBy === uid });
                const likedPosts = _.filter(posts, function (o) { return o.likedByMe });
                const bookMarks = _.filter(posts, function (o) { return o.savedByMe });
                this.setState({ history, likedPosts, bookMarks, posts, postsLoader: false, })
            })
        })
            .catch(() => this.setState({ postsLoader: false }))
    }

    forceUpdateItem = () => {
        const { posts, user } = this.state
        const uid = user.uid
        this.setState({ postsLoader: true })
        const history = _.filter(posts, function (o) { return o.createdBy === uid });
        const likedPosts = _.filter(posts, function (o) { return o.likedByMe });
        const bookMarks = _.filter(posts, function (o) { return o.savedByMe });
        this.setState({ history, likedPosts, bookMarks, postsLoader: false, })
    }

    onPressSettings = () => {
        const { user } = this.state
        this.props.navigation.navigate('Settings', { user: user })
    }
}

export default Profile
