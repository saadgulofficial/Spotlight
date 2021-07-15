import { StyleSheet } from 'react-native'
import { hp, wp } from '../../Globals'
import { Colors, Fonts } from '../../Res'
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    headerContainer: {
        width: wp(85),
        alignItems: 'center'
    },
    headerText: {
        fontSize: wp(4.5),
        fontFamily: Fonts.APPFONT_SB,
        color: Colors.color
    },
    subContainer: {
        paddingHorizontal: wp(4),
        paddingVertical: hp(4)
    },
    disInput: {
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.color3,
        fontSize: wp(4.4),
        fontFamily: Fonts.APPFONT_R,
        paddingHorizontal: wp(2),
        marginTop: hp(2),
        height: hp(22),
        textAlignVertical: 'top',
    },
})