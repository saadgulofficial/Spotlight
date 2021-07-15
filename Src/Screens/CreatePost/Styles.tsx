import { Platform, StyleSheet } from 'react-native'
import { hp, wp } from '../../Globals'
import { Colors, Fonts } from '../../Res'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    headerContainer: {
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(3)
    },
    createPostContainer: {
        paddingVertical: hp(2),
        alignItems: 'center'
    },
    createPost: {
        fontSize: wp(8),
        fontFamily: Fonts.APPFONT_B,
        color: Colors.color
    },
    createPostDis: {
        textAlign: 'center',
        alignSelf: 'center',
        maxWidth: wp(70),
        fontFamily: Fonts.APPFONT_SB,
        fontSize: wp(4),
        color: Colors.blackRgba40
    },
    titleContainer: {
        paddingTop: hp(5),
        marginBottom: hp(2),
        paddingHorizontal: wp(5),
    },
    titleInput: {
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.color3,
        paddingVertical: hp(1.5),
        fontSize: wp(4.4),
        fontFamily: Fonts.APPFONT_R,
        paddingHorizontal: wp(2),
        marginVertical: hp(1.6)
    },
    disInput: {
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.color3,
        fontSize: wp(4.4),
        fontFamily: Fonts.APPFONT_R,
        paddingHorizontal: wp(2),
        marginTop: hp(1.5),
        height: hp(22),
        textAlignVertical: 'top',
    },
    tagsListContainer: {
        paddingHorizontal: wp(4),
        width: wp(100),
        flexDirection: 'column',
        // borderWidth: 1,
        height: hp(15),
    },
    tagRow: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    tagItemContainer: {
        paddingHorizontal: wp(6),
        marginHorizontal: wp(2),
        marginBottom: hp(1),
        paddingVertical: hp(0.6),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    tagText: {
        fontSize: wp(4),
        fontFamily: Fonts.APPFONT_SB,
        color: Colors.white
    }
})