import { StyleSheet, Dimensions } from 'react-native'
import { hp, wp } from '../../Globals'
import { Colors, Fonts } from '../../Res'
const { width } = Dimensions.get('window')


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    headerLeft: {
        paddingBottom: hp(1),
        paddingTop: hp(0.2),
        paddingHorizontal: wp(2),
    },
    subContainer: {
        flex: 1,
        justifyContent: 'space-between'
    },
    disContainer: {
        paddingVertical: hp(2),
        marginHorizontal: wp(4),
        borderBottomWidth: 0.25,
        borderBottomColor: Colors.color7
    },
    disText: {
        fontSize: wp(4),
        fontFamily: Fonts.APPFONT_R,
        color: Colors.color2
    },
    commentsHeader: {
        paddingVertical: hp(3),
        paddingHorizontal: wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    comments: {
        fontSize: wp(5.5),
        fontFamily: Fonts.APPFONT_B,
        color: Colors.color
    },
    flatListContainer: {
        marginTop: hp(-2),
        paddingHorizontal: wp(4),
    },
    itemContainer: {
        borderBottomWidth: 0.25,
        borderBottomColor: Colors.color7,
        paddingVertical: hp(2)
    },
    imageNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileImage: {
        width: width * 0.14,
        height: width * 0.14 * 1,
        borderRadius: width * 0.14 * 1 / 2,
    },
    deleteCommentView: {
        height: hp(5.5),
        borderRadius: 10,
        paddingHorizontal: wp(3),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.redRgba30,
    },
    name: {
        fontSize: wp(4.3),
        fontFamily: Fonts.APPFONT_SB,
        color: Colors.color,
    },
    time: {
        fontSize: wp(3),
        color: Colors.color2,
        fontFamily: Fonts.APPFONT_R
    },
    comment: {
        fontSize: wp(3.8),
        marginVertical: hp(1),
        color: Colors.color2,
        marginLeft: wp(1)
    },
    footerContainer: {
        paddingVertical: hp(2),
        paddingBottom: hp(3),
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: Colors.white,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(10),
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
    commentInputContainer: {
        paddingTop: hp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(4)
    },
    commentInput: {
        width: wp(80),
        borderRadius: 30,
        paddingVertical: hp(1),
        backgroundColor: '#F2F2F6',
        paddingHorizontal: wp(4.5),
        fontSize: wp(4),
        fontFamily: Fonts.APPFONT_R,
        maxHeight: hp(20),
        color: Colors.black
    },
    emptyCommentList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noComments: {
        fontSize: wp(5),
        fontFamily: Fonts.APPFONT_R,
        color: Colors.color7
    }

})