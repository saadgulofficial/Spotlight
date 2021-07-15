import React, { Component } from 'react'
import { Text, View, Modal, SafeAreaView, TextInput, ScrollView, FlatList, Keyboard, TouchableOpacity, ActivityIndicator, StatusBar, Alert, TouchableWithoutFeedback } from 'react-native'
import { GButton, hp, wp } from '../../Globals'
import { GToast } from '../../Components'
import { Colors } from '../../Res'
import Styles from './Styles'
import { GDataManager, GFirebase } from '../../Services'
import _ from 'lodash'
import AntDesign from 'react-native-vector-icons/AntDesign'


export class createPost extends Component<any> {
    state: {
        tags: any,
        tempTags: any
        title: any,
        discription: any,
        postNowLoader: any,
        user: any,
        keyboardOffset: any,
    } = {
            tags: [{ name: '#achievements', selected: false, id: 1 }, { name: '#jobs', selected: false, id: 2 }, { name: '#life', selected: false, id: 3 }, { name: '#training', selected: false, id: 4 }, { name: '#socialmarketing', selected: false, id: 5 }, { name: '#homedecor', selected: false, id: 6 }],
            tempTags: [{ name: '#achievements', selected: false, id: 1 }, { name: '#jobs', selected: false, id: 2 }, { name: '#life', selected: false, id: 3 }, { name: '#training', selected: false, id: 4 }, { name: '#socialmarketing', selected: false, id: 5 }, { name: '#homedecor', selected: false, id: 6 }],
            title: '',
            discription: '',
            postNowLoader: false,
            user: '',
            keyboardOffset: 0,
        }
    keyboardDidShowListener: any
    keyboardDidHideListener: any

    componentDidMount() {
        this.getData()
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    render() {
        const { tags, title, discription, postNowLoader, keyboardOffset } = this.state
        return (
            <Modal
                transparent={false}
                visible={true}
                onRequestClose={this.goBack}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <SafeAreaView style={Styles.container}>
                        <StatusBar backgroundColor={Colors.white} barStyle='dark-content' />
                        <View style={Styles.headerContainer}>
                            <AntDesign name="close" color={Colors.color} size={wp(8)} onPress={this.goBack} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <ScrollView
                                nestedScrollEnabled
                                contentContainerStyle={{
                                    bottom: keyboardOffset === 0 ? 0 : keyboardOffset - 270,
                                    paddingBottom: keyboardOffset === 0 ? 0 : hp(30)
                                }}
                                showsVerticalScrollIndicator={false}
                            >
                                <View>
                                    <View style={Styles.createPostContainer}>
                                        <Text style={Styles.createPost}>Create Post</Text>
                                    </View>
                                    <Text style={Styles.createPostDis}>Please enter your information below to create a new post</Text>
                                    <View style={Styles.titleContainer}>
                                        <TextInput
                                            style={Styles.titleInput}
                                            placeholder="Title"
                                            value={title}
                                            placeholderTextColor={Colors.color2}
                                            onChangeText={this.onChangeTitle}
                                        />
                                        <TextInput
                                            style={Styles.disInput}
                                            value={discription}
                                            placeholder="What would you like to share?"
                                            placeholderTextColor={Colors.color2}
                                            multiline
                                            onChangeText={this.onChangeDis}
                                        />
                                    </View>
                                    <FlatList
                                        data={tags}
                                        renderItem={this.renderTags}
                                        numColumns={2}
                                        style={Styles.tagsListContainer}
                                        keyExtractor={(item) => item.id}
                                        scrollEnabled
                                        columnWrapperStyle={Styles.tagRow}
                                    />
                                </View>
                                <TouchableOpacity style={{ ...GButton.btn, marginHorizontal: wp(5), marginTop: hp(5) }}
                                    onPress={this.onPostNowPress}
                                    activeOpacity={0.8}
                                >
                                    {
                                        postNowLoader ?
                                            <ActivityIndicator size="small" color="#fff" />
                                            : <Text style={GButton.txt}>Post Now</Text>
                                    }
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    renderTags = ({ item }) => {
        return (
            <TouchableOpacity style={{ ...Styles.tagItemContainer, backgroundColor: item.selected ? Colors.theme2 : Colors.color2 }} activeOpacity={0.9}
                onPress={this.onTagPress.bind(this, item)}
            >
                <Text style={Styles.tagText}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    onTagPress = (item) => {
        const { tags } = this.state
        item.selected = !item.selected
        _.replace(tags, item.id, item)
        this.setState({ tags: tags })
    }

    backPopup = () => Alert.alert(
        "",
        "Are you sure you want to leave the page ? because your post will not be saved ",
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "Ok", onPress: () => {
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    });
                }
            }
        ]
    );

    goBack = () => {
        const { title, discription } = this.state
        if(title.trim().length !== 0 || discription.trim().length !== 0) {
            this.backPopup()
        }
        else {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        }

    }
    onChangeTitle = (text) => this.setState({ title: text })
    onChangeDis = (text) => this.setState({ discription: text })

    getData = () => {
        const { KEYS, getLocalData } = GDataManager
        const { tags } = this.state
        getLocalData(KEYS.USER_DETAILS).then((user) => this.setState({ user }))
            .catch((err) => console.log('error while getting local user data on create Post Screen =>', err))
    }

    keyboardDidShow = (event) => {
        this.setState({
            keyboardOffset: event.endCoordinates.height,
        })
    }

    keyboardDidHide = () => {
        this.setState({
            keyboardOffset: 0,
        })
    }


    onPostNowPress = async () => {
        const { title, discription, user, tags, tempTags } = this.state
        const { allowComments, hidePostsFromOthers } = user
        const selectedTags = _.filter(tags, function (o) { return o.selected; });
        const selectedTagNames = _.chain(selectedTags).map((item) => { return item.name }).flatten().value()
        if(title.trim().length === 0) {
            GToast.shortBottom('Please enter post title')
        }
        else if(discription.trim().length === 0) {
            GToast.shortBottom('Please enter post discription')
        }
        else {
            this.setState({ postNowLoader: true })
            const post = {
                title: title,
                discription: discription,
                allowComments: allowComments,
                hidePostsFromOthers: hidePostsFromOthers,
                selectedTags: selectedTagNames
            }
            await GFirebase.createPost(post).then(() => {
                GToast.shortBottom('Post Created')
                this.setState({
                    title: '',
                    discription: '',
                    postNowLoader: false,
                    tags: tempTags
                })
            })
                .catch(() => this.setState({ postNowLoader: false }))
        }
    }



}

export default createPost