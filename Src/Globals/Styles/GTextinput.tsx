import { StyleSheet, Dimensions, Platform } from 'react-native'
import { Colors, Fonts } from '../../Res'
import { hp, wp } from '../Scalling'

const GTextInput = StyleSheet.create({
    input: {
        borderBottomWidth: 0.5,
        borderColor: Colors.color3,
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(3),
        fontSize: wp(4),
        fontFamily: Fonts.APPFONT_R,
        color: Colors.black
    }
})

export { GTextInput }