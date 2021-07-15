import { StyleSheet } from 'react-native'
import { hp, wp } from '../../Globals'
import { Colors, Fonts } from '../../Res'

const GButton = StyleSheet.create({

    btn: {
        backgroundColor: Colors.theme,
        paddingVertical: hp(1.7),
        borderRadius: 10,
        alignItems: 'center'
    },
    txt: {
        fontSize: wp(4.5),
        fontFamily: Fonts.APPFONT_SB,
        color: Colors.white
    },
    smallbtn: {
        backgroundColor: Colors.black1,
        paddingVertical: hp(1),
        borderRadius: 4,
        alignItems: 'center'
    },
    rowBtn: {
        backgroundColor: Colors.black1,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(4),
        flexDirection: 'row'
    },
    shdw: {

    },


})

export { GButton }