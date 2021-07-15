import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image, TextInput, BackHandler, KeyboardAvoidingView, Keyboard, Alert, ScrollView } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { CommentActionSheet, GHeader, GToast, GModalLoader } from '../../Components'
import { hp, wp } from '../../Globals'
import { Colors, Images } from '../../Res'
import Styles from './Styles'
import { GCommon, GDataManager, GFirebase } from '../../Services'
import _ from 'lodash'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import GPush from '../../Services/Notifications/Push'
import moduleName from '../../../globalDeclaration'

export class FullPost extends Component<any> {
    state: {
        post: any,
        newComment: any,
        user: any,
        containerLoader: any,
        postUpdateLoader: any,
        postUpdateLoaderMessage: any
    } = {
            post: this.props.route.params.post,
            newComment: '',
            user: '',
            containerLoader: true,
            postUpdateLoader: false,
            postUpdateLoaderMessage: 'Updating Post Setting...'
        }

    componentDidMount = async () => {
        this.handleNotification()
        this.getData()
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.goBack
        );
    }
    componentWillUnmount() {
        this.backHandler.remove();
    }

    backHandler: any
    render() {
        const { post, newComment, user, postUpdateLoader, postUpdateLoaderMessage } = this.state
        return (
            <View style={Styles.container}>
                <GModalLoader
                    show={postUpdateLoader}
                    loadingMessage={postUpdateLoaderMessage}
                />
                <GHeader
                    bgColor={"transparent"}
                    centerTitle={post.title}
                    style={{ borderBottomWidth: 0 }}
                    right={post.myPost && <View style={{ marginTop: hp(-0.3) }}>
                        <CommentActionSheet onPress={this.handleActionSheetPress} post={post} />
                    </View>}
                    left={
                        <TouchableOpacity onPress={this.goBack} activeOpacity={1}>
                            <AntDesign size={wp(5.5)} name="left" color={Colors.black} style={Styles.headerLeft} />
                        </TouchableOpacity>
                    }
                />
                <KeyboardAvoidingView
                    //@ts-ignore
                    behavior={Platform.OS === "ios" ? 'padding' : null}
                    style={{ flex: 1 }}
                    contentContainerStyle={Styles.subContainer}
                >
                    <View style={{ flex: 1, }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={Styles.disContainer}>
                                <Text style={Styles.disText}>
                                    {post.discription}
                                </Text>
                            </View>
                            <View style={Styles.commentsHeader}>
                                <Text style={Styles.comments}>Comments</Text>
                                {
                                    !post.myPost &&
                                    <TouchableOpacity activeOpacity={0.7} onPress={this.onFlagPress}>
                                        <Ionicons name="md-flag-outline" size={wp(7)} color={Colors.theme} style={{ marginRight: wp(2) }} />
                                    </TouchableOpacity>
                                }
                            </View>

                            <View style={{ flex: 1 }}>
                                <FlatList
                                    data={post.comments}
                                    renderItem={(item) => this.renderComments(item, user)}
                                    ListEmptyComponent={this.renderEmptyComments}
                                    keyExtractor={(item, index) => index.toString()}
                                    style={Styles.flatListContainer}
                                />
                            </View>
                        </ScrollView>
                    </View>


                    <View style={Styles.footerContainer}>
                        <View style={Styles.footerRow}>
                            <View style={Styles.iconRowContainer}>
                                <TouchableOpacity activeOpacity={0.4} onPress={this.onLikePress}>
                                    {
                                        post.likedByMe ?
                                            <AntDesign name="heart" size={wp(6)} color={Colors.red} style={{ paddingRight: wp(1) }} />
                                            : <AntDesign name="hearto" size={wp(6)} color={Colors.red} style={{ paddingRight: wp(1) }} />
                                    }
                                </TouchableOpacity>
                                <Text style={Styles.iconText}>{post.likes && post.likes.length !== 0 && post.likes.length}</Text>
                            </View>
                            {
                                post.allowComments &&
                                <View style={{ ...Styles.iconRowContainer }}>
                                    <Ionicons name="md-chatbubbles" size={wp(6.5)} color={Colors.theme} style={{ paddingRight: wp(1) }} />
                                    <Text style={Styles.iconText}>{post.comments && post.comments.length !== 0 && post.comments.length}</Text>
                                </View>
                            }

                            <View style={{ ...Styles.iconRowContainer, marginLeft: wp(5) }}>
                                {
                                    post.savedByMe ?
                                        <Ionicons name="md-bookmark" size={wp(6.5)} color={Colors.theme} onPress={this.onSave} />
                                        :
                                        <Ionicons name="md-bookmark-outline" size={wp(6.5)} color={Colors.theme} onPress={this.onSave} />
                                }
                            </View>
                        </View>
                        {
                            post.allowComments &&
                            <View style={Styles.commentInputContainer}>
                                <TextInput
                                    style={Styles.commentInput}
                                    value={newComment}
                                    placeholder="Add your comment"
                                    placeholderTextColor={Colors.color7}
                                    onChangeText={this.onCommentInput}
                                    multiline={true}
                                />
                                {
                                    newComment.length !== 0 ?
                                        <Ionicons name="md-send-sharp" size={wp(7.5)} color={Colors.theme} style={{ paddingRight: wp(1) }}
                                            onPress={this.onSendPress}
                                        />
                                        :
                                        <Ionicons name="md-send-outline" size={wp(7.5)} color={Colors.color7} style={{ paddingRight: wp(1) }} />
                                }
                            </View>
                        }
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
    renderComments = (items, user) => {
        const item = items.item
        return (
            <View style={Styles.itemContainer}>
                <View style={Styles.imageNameContainer}>
                    <View style={{ ...Styles.imageNameContainer, justifyContent: 'flex-start' }}>
                        {
                            item.image ?
                                <Image source={{ uri: item.image }} style={Styles.profileImage} />
                                :
                                <Image source={Images.user} style={Styles.profileImage} />
                        }
                        <View style={{ marginHorizontal: wp(2), }}>
                            <Text style={Styles.name}>{item.name}</Text>
                            <Text style={Styles.time}>{GCommon.convertToLocalFromNow(item.createdAt)}</Text>
                        </View>
                    </View>
                    {
                        item.uid === user.uid &&
                        <TouchableOpacity style={Styles.deleteCommentView} onPress={this.onDeleteComment.bind(this, item)}>
                            <MaterialCommunityIcons name="delete-forever" size={wp(7)} color={Colors.color11} />
                        </TouchableOpacity>
                    }
                </View>
                <Text style={Styles.comment}>{item.comment} </Text>
            </View>
        )
    }
    renderEmptyComments = () => (
        <View style={Styles.emptyCommentList}>
            <Text style={Styles.noComments}>No comments</Text>
        </View>
    )
    onFlagPress = () => {
        const { post } = this.state
        this.props.navigation.navigate('ReportPost', { post: post })
    }

    goBack = () => {
        this.props.navigation.goBack()
        return true;
    }

    onCommentInput = (text) => this.setState({ newComment: text })
    hideKeyboard = () => Keyboard.dismiss()
    onOptionPress = () => { global.CommentActionSheet.show() }

    onSave = async () => {
        const { post } = this.state
        const { KEYS, setLocalData, getLocalData } = GDataManager
        await getLocalData(KEYS.SAVEDPOSTS).then(async (data) => {
            if(data && data.length !== 0) {
                const check = _.find(data, function (o) { return o.id === post.id })
                if(check) {
                    _.remove(data, function (o: any) { return o.id === post.id });
                    post.savedByMe = false
                    await setLocalData(KEYS.SAVEDPOSTS, data)
                    this.forceUpdate()
                }
                else {
                    post.savedByMe = true
                    data.push(post)
                    await setLocalData(KEYS.SAVEDPOSTS, data)
                    this.forceUpdate()
                }
            }
            else {
                post.savedByMe = true
                await setLocalData(KEYS.SAVEDPOSTS, [post])
                this.forceUpdate()
            }
        })
    }


    onSendPress = async () => {
        const { newComment, post, user } = this.state
        const { comments } = post
        var commentObj: any = {
            uid: user.uid,
            id: `id-${GCommon.getTimeStamp()}`,
            comment: newComment,
            createdAt: GCommon.convertToUTC(new Date()),
            image: user.image ? user.image : null,
            name: user.name
        }
        if(comments && comments.length !== 0) {
            post.comments.unshift(commentObj)
        }
        else {
            post.comments = [commentObj]
        }
        this.setState({ post, newComment: '' })
        await GFirebase.postComment(post).then(async () => {
            if(post.createdBy !== user.uid) {
                GFirebase.getSelectedUserData(post.createdBy)
                    .then(async (otherUser: any) => {
                        const token = otherUser.token
                        const data = {
                            title: 'You recieved a comment',
                            body: newComment,
                            data: {
                                notifyId: `id-${GCommon.getTimeStamp()}`,
                                userName: user.name,
                                userUid: user.uid,
                                post: post,
                                createdAt: GCommon.convertToUTC(new Date()),
                                from: 'newComment',
                            }
                        }
                        await GPush(token, data)
                    })
            }
        })

    }


    onLikePress = () => {
        const { post } = this.state
        GFirebase.getCurrentUserUid().then(async uid => {
            const check = _.find(post.likes, function (o) { return o === uid })
            if(check) {
                post.likedByMe = false
                _.remove(post.likes, function (o) { return o === uid });
                this.setState({ post: post })
            }
            else {
                post.likes.push(uid)
                post.likedByMe = true
                this.setState({ post: post })
            }
            await GFirebase.postLike(post)
        })
    }

    getData = () => {
        const { KEYS, getLocalData, setLocalData } = GDataManager
        getLocalData(KEYS.USER_DETAILS).then((user) => {
            this.setState({ user, containerLoader: false })
        }).catch((err) => {
            console.log('error while getting local user data in Full post Screen ->', err)
            this.setState({ containerLoader: false })
        })
    }

    handleActionSheetPress = (index) => {
        const { post } = this.state
        if(index === 0) {
            this.setState({ postUpdateLoader: true })
            post.hidePostsFromOthers = !post.hidePostsFromOthers
            GFirebase.updatePost(post).then(() => {
                this.setState({ postUpdateLoader: false, post: post }, () => {
                    Alert.alert('Post Updated')
                })
            })
                .catch(() => this.setState({ postUpdateLoader: false }))
        }
        else if(index === 1) {
            this.setState({ postUpdateLoader: true })
            post.allowComments = !post.allowComments
            GFirebase.updatePost(post).then(() => {
                this.setState({ postUpdateLoader: false, post: post }, () => {
                    Alert.alert('Post Updated')
                })
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
                            this.setState({ postUpdateLoader: true, postUpdateLoaderMessage: 'Deleting Post...' })
                            GFirebase.deletePost(post).then(() => {
                                this.setState({ postUpdateLoader: false }, () => {
                                    Alert.alert('Post Deleted')
                                    this.props.navigation.goBack()
                                })
                            })
                                .catch(() => this.setState({ postUpdateLoader: false }))
                        }
                    }
                ])
        }
    }

    onDeleteComment = async (item) => {
        Alert.alert(
            "",
            "Are your sure you want to delete your comment?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {
                        this.setState({ postUpdateLoader: true, postUpdateLoaderMessage: 'Deleting Comment...' })
                        const { post } = this.state
                        _.remove(post.comments, function (o) { return o.id === item.id });
                        await GFirebase.deleteComment(post).then(() => {
                            this.forceUpdate()
                            this.setState({ postUpdateLoader: false })
                            Alert.alert('Comment Deleted')
                        })
                    }
                }
            ]
        );
    }

    handleNotification = () => {
        var notify: any = ''
        if(global.commentNotify) {
            notify = global.commentNotify
        }
        else if(global.reportPost) {
            notify = global.reportPost
        }
        if(notify !== '') {
            const { KEYS, getLocalData, setLocalData } = GDataManager
            getLocalData(KEYS.NOTIFICATIONS).then(async data => {
                if(data) {
                    const newData = _.chain(data).map((item) => {
                        if(item.data.notifyId === notify.notifyId) {
                            item.seenStatus = 'seen'
                            return item
                        }
                        else {
                            return item
                        }
                    }).flatten().value()
                    await setLocalData(KEYS.NOTIFICATIONS, newData)
                    global.commentNotify = undefined
                    global.reportPost = undefined
                }
            })
        }
    }
}

export default FullPost
