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
    reportPostContainer: {
        paddingVertical: hp(2),
        alignItems: 'center'
    },
    reportPost: {
        fontSize: wp(8),
        fontFamily: Fonts.APPFONT_B,
        color: Colors.color
    },
    reportPostDis: {
        textAlign: 'center',
        alignSelf: 'center',
        maxWidth: wp(70),
        fontFamily: Fonts.APPFONT_SB,
        fontSize: wp(4),
        color: Colors.blackRgba40
    },
    titleContainer: {
        borderWidth: 0,
        paddingVertical: hp(5),
        paddingHorizontal: wp(5),
    },
    titleInput: {
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.color3,
        paddingVertical: hp(1.5),
        fontSize: wp(4.4),
        fontFamily: Fonts.APPFONT_R,
        paddingHorizontal: wp(2),
        marginVertical: hp(1.6),
        color: Colors.black
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
        color: Colors.black
    },
    titleText: {
        fontSize: wp(4.4),
        fontFamily: Fonts.APPFONT_R,
        color: Colors.black
    }

})