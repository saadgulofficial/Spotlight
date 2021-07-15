import { StyleSheet } from 'react-native'
import { hp, wp } from '../../Globals'
import { Colors } from '../../Res'
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    subContainer: {
        paddingHorizontal: wp(4),
        paddingVertical: hp(4)
    }
})