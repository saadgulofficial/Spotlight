import { StyleSheet } from 'react-native'
import { hp, wp } from '../../Globals'
import { Colors, Fonts } from '../../Res'
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    signinContainer: {
        borderWidth: 0,
        paddingBottom: hp(3),
        alignItems: 'center'
    },
    signinText: {
        fontSize: wp(9),
        fontFamily: Fonts.APPFONT_B
    },
    siginDis: {
        fontSize: wp(4),
        alignSelf: 'center',
        textAlign: 'center',
        maxWidth: wp(85),
        color: Colors.blackRgba40,
        fontFamily: Fonts.APPFONT_SB,
        lineHeight: hp(2.3),
    },
    subContainer: {
        paddingTop: hp(10),
        paddingHorizontal: wp(5)
    },
    forgotPassText: {
        alignSelf: 'flex-end',
        fontSize: wp(4),
        fontFamily: Fonts.APPFONT_R,
        marginTop: hp(1)
    },
    resgisterContainer: {
        paddingVertical: hp(4),
        alignItems: 'center'
    },
    regDisText: {
        fontSize: wp(4.3),
        fontFamily: Fonts.APPFONT_R,
        color: Colors.color2
    },
    regText: {
        fontSize: wp(4.3),
        fontFamily: Fonts.APPFONT_SB,
        color: Colors.color,
        marginTop: hp(0.5)
    }
})