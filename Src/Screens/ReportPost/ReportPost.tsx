import React, { Component } from 'react'
import { Text, View, Modal, SafeAreaView, TextInput, ScrollView, FlatList, TouchableOpacity, StatusBar, Platform, ActivityIndicator } from 'react-native'
import { GButton, hp, wp } from '../../Globals'
import { Colors } from '../../Res'
import Styles from './Styles'
import _ from 'lodash'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { GToast } from '../../Components'
import { GCommon, GDataManager, GFirebase } from '../../Services'
import GPush from '../../Services/Notifications/Push'

export class ReportPost extends Component<any> {
    state: {
        email: any,
        description: any,
        post: any,
        reportPostLoader: any,
        user: any
    } = {
            email: '',
            description: '',
            post: this.props.route.params.post,
            reportPostLoader: false,
            user: ''
        }
    componentDidMount = async () => this.getData()

    render() {
        const { email, description, reportPostLoader } = this.state
        return (
            <Modal
                transparent={false}
                style={Styles.container}
                visible={true}
            >
                <SafeAreaView style={Styles.container}>
                    <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
                    <View style={Styles.headerContainer}>
                        <AntDesign name="close" color={Colors.color} size={wp(8)} onPress={this.goBack} />
                    </View>
                    <ScrollView contentContainerStyle={{ justifyContent: 'space-between', flex: 1 }} >
                        <View>
                            <View style={Styles.reportPostContainer}>
                                <Text style={Styles.reportPost}>Report Post</Text>
                            </View>
                            <Text style={Styles.reportPostDis}>Please enter your information below to report this post</Text>
                            <View style={Styles.titleContainer}>
                                <View style={Styles.titleInput}>
                                    <Text style={Styles.titleText}>{email}</Text>
                                </View>
                                <TextInput
                                    style={Styles.disInput}
                                    value={description}
                                    placeholder="What do you find wrong with this post?"
                                    placeholderTextColor={Colors.color2}
                                    multiline
                                    onChangeText={this.onChangeDescription}
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={{ ...GButton.btn, marginHorizontal: wp(5), marginVertical: Platform.OS === 'ios' ? 0 : hp(2) }}
                            activeOpacity={0.7}
                            onPress={this.reportPost}
                        >
                            {
                                reportPostLoader ? <ActivityIndicator color={Colors.white} size="small" />
                                    : <Text style={GButton.txt}>Report Post</Text>
                            }
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView >
            </Modal >
        )
    }


    goBack = () => this.props.navigation.goBack()
    onChangeDescription = (text) => this.setState({ description: text })

    getData = () => {
        GDataManager.getLocalData(GDataManager.KEYS.USER_DETAILS).then(data => {
            if(data && data.email) {
                this.setState({ email: data.email, user: data })
            }
        })
    }

    reportPost = async () => {
        const { email, description, post, user } = this.state
        if(email.trim().length === 0) {
            GToast.shortBottom('Please enter your email address')
        }
        else if(description.trim().length === 0) {
            GToast.shortBottom('Please enter your report description')
        }
        else {
            this.setState({ reportPostLoader: true })
            const data = {
                email: email,
                description: description,
                postId: post.id,
                uid: user.uid
            }
            await GFirebase.reportPost(data).then(() => {
                GToast.shortBottom('Post Successfully reported')
                this.setState({ reportPostLoader: false, description: '' })
                if(post.createdBy !== user.uid) {
                    GFirebase.getSelectedUserData(post.createdBy)
                        .then(async (otherUser: any) => {
                            const token = otherUser.token
                            const data = {
                                title: 'Someone reported your post',
                                body: `You post #${post.title}# has been reported by someone`,
                                data: {
                                    notifyId: `id-${GCommon.getTimeStamp()}`,
                                    userName: user.name,
                                    userUid: user.uid,
                                    post: post,
                                    createdAt: GCommon.convertToUTC(new Date()),
                                    from: 'reportPost',
                                }
                            }
                            await GPush(token, data)
                        })
                }
            })
                .catch((err) => {
                    console.log(err)
                    this.setState({ reportPostLoader: false })
                })

        }
    }
}

export default ReportPost