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
    filterPostContainer: {
        paddingVertical: hp(2),
        alignItems: 'center'
    },
    filterPost: {
        fontSize: wp(8),
        fontFamily: Fonts.APPFONT_B,
        color: Colors.color
    },
    filterPostDis: {
        textAlign: 'center',
        alignSelf: 'center',
        maxWidth: wp(70),
        fontFamily: Fonts.APPFONT_SB,
        fontSize: wp(4),
        color: Colors.blackRgba40
    },
    tagsListContainer: {
        paddingHorizontal: wp(4),
        marginVertical: hp(4),
        width: wp(100),
        flexDirection: 'column',
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
    },
    tagRow: {
        flex: 1,
        justifyContent: 'flex-start'
    },
})