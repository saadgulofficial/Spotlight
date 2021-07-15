import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { hp, wp } from '../Globals'
import { Colors, Fonts } from '../Res'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { CommentActionSheet } from './CommentActionSheet'
import { GCommon, GDataManager, GFirebase } from '../Services'
import _ from 'lodash'
import { useForceUpdate } from '../Components/ForceUpdate'

const SocialCard = ({ item, navigation, optionPress, forceUpdateItem }: any) => {
    const [seeMore, setSeeMore] = useState(false);
    const onReportFlagPress = () => navigation.navigate('ReportPost', { post: item })
    const showFullPost = () => navigation.navigate('FullPost', { post: item })
    const forceUpdate = useForceUpdate()


    const onLikePress = () => {
        GFirebase.getCurrentUserUid().then(async uid => {
            if(item.likes && item.likes.length !== 0) {
                const check = _.find(item.likes, function (o) { return o === uid })
                if(check) {
                    item.likedByMe = false
                    _.remove(item.likes, function (o) { return o === uid });
                    forceUpdate()
                    forceUpdateItem()
                }
                else {
                    item.likes.push(uid)
                    item.likedByMe = true
                    forceUpdate()
                    forceUpdateItem()
                }
            }
            else {
                item.likes = [uid]
                item.likedByMe = true
                forceUpdate()
                forceUpdateItem()
            }

            await GFirebase.postLike(item).then(() => {
                forceUpdate()
                forceUpdateItem()
            })
        })
    }

    const onSavePress = async () => {
        const { KEYS, setLocalData, getLocalData } = GDataManager
        await getLocalData(KEYS.SAVEDPOSTS).then(async (data) => {
            if(data && data.length !== 0) {
                const check = _.find(data, function (o) { return o.id === item.id })
                if(check) {
                    _.remove(data, function (o) { return o.id === item.id });
                    item.savedByMe = false
                    await setLocalData(KEYS.SAVEDPOSTS, data)
                    forceUpdate()
                    forceUpdateItem()
                }
                else {
                    item.savedByMe = true
                    data.push(item)
                    await setLocalData(KEYS.SAVEDPOSTS, data)
                    forceUpdate()
                    forceUpdateItem()
                }
            }
            else {
                item.savedByMe = true
                await setLocalData(KEYS.SAVEDPOSTS, [item])
                forceUpdate()
                forceUpdateItem()
            }
        })
    }




    return (
        <View style={Styles.itemContaier}>
            <View style={Styles.nameContainer}>
                <TouchableOpacity style={Styles.nameSubCon} onPress={showFullPost} activeOpacity={1}>
                    <Text style={Styles.title}>{item.title}</Text>
                    <Text style={Styles.createdAt}>{GCommon.convertToLocalFromNow(item.createdAt)}</Text>
                </TouchableOpacity>
                {
                    item.myPost &&
                    <CommentActionSheet
                        onPress={optionPress}
                        post={item}
                    />
                }
            </View>
            <View style={Styles.discriptionContainer}>
                {
                    item.discription && item.discription.length > 170 ?
                        (
                            seeMore ? (
                                <TouchableOpacity onPress={() => setSeeMore(false)} activeOpacity={1}>
                                    <Text style={Styles.discription}>{item.discription}</Text>
                                    <Text style={Styles.seeMore}>See less</Text>
                                </TouchableOpacity>
                            ) :
                                (
                                    <TouchableOpacity onPress={() => setSeeMore(true)} activeOpacity={1}>
                                        <Text style={Styles.discription}>{`${item.discription.slice(0, 180)}  `}
                                            <Text style={Styles.seeMore}>See More...</Text>
                                        </Text>
                                    </TouchableOpacity>
                                )
                        )
                        : (
                            <Text style={Styles.discription}>{item.discription}</Text>
                        )}

            </View>
            <View style={Styles.likeComContainer}>
                <View style={Styles.likeComSubCon}>
                    <View style={Styles.iconRowContainer}>
                        <TouchableOpacity activeOpacity={0.4} onPress={onLikePress}>
                            {
                                item.likedByMe ?
                                    <AntDesign name="heart" size={wp(6)} color={Colors.red} style={{ paddingRight: wp(1) }} />
                                    : <AntDesign name="hearto" size={wp(6)} color={Colors.red} style={{ paddingRight: wp(1) }} />
                            }
                        </TouchableOpacity>

                        <Text style={Styles.iconText}>{item.likes && item.likes.length !== 0 && item.likes.length}</Text>
                    </View>

                    {
                        item.allowComments &&
                        <TouchableOpacity style={{ ...Styles.iconRowContainer, marginLeft: wp(5) }}
                            onPress={showFullPost}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="md-chatbubbles" size={wp(7)} color={Colors.theme} style={{ paddingRight: wp(1) }} />
                            <Text style={Styles.iconText}>{item.comments && item.comments.length !== 0 && item.comments.length}</Text>
                        </TouchableOpacity>
                    }
                    <View style={{ ...Styles.iconRowContainer, marginLeft: wp(5) }}>
                        <TouchableOpacity onPress={onSavePress}>
                            {
                                item.savedByMe ?
                                    <Ionicons name="md-bookmark" size={wp(7)} color={Colors.theme} />
                                    :
                                    <Ionicons name="md-bookmark-outline" size={wp(7)} color={Colors.theme} />
                            }
                        </TouchableOpacity>

                    </View>
                </View>
                {
                    !item.myPost &&
                    <TouchableOpacity activeOpacity={0.7} onPress={onReportFlagPress}>
                        <Ionicons name="md-flag-outline" size={wp(7)} color={Colors.theme} />
                    </TouchableOpacity>
                }

            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    itemContaier: {
        borderWidth: 0,
        marginVertical: hp(2),
        backgroundColor: Colors.white,
    },
    nameContainer: {
        paddingVertical: hp(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    nameSubCon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: wp(4.8),
        fontFamily: Fonts.APPFONT_SB,
        color: Colors.color
    },
    createdAt: {
        fontSize: wp(3.8),
        color: Colors.color2,
        marginHorizontal: wp(4)
    },
    discriptionContainer: {
        paddingBottom: hp(1.3),
    },
    discription: {
        fontSize: wp(3.8),
        lineHeight: hp(2.3),
        color: Colors.color2
    },
    likeComContainer: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 40,
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),

        shadowColor: Colors.blackRgba60,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,

    },
    likeComSubCon: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconText: {
        fontSize: wp(3.8),
        color: Colors.color,
        fontFamily: Fonts.APPFONT_SB,
    },
    seeMore: {
        fontSize: wp(3.5),
        fontFamily: Fonts.APPFONT_B,
        color: Colors.color
    }
})

export { SocialCard }
