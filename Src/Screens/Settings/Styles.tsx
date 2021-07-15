import { StyleSheet, Dimensions } from 'react-native'
import { hp, wp } from '../../Globals'
import { Colors, Fonts } from '../../Res'
const { width } = Dimensions.get('window')
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    profileContainer: {
        marginVertical: hp(3),
        borderWidth: 0.25,
        borderColor: Colors.color7,
        paddingVertical: hp(2),
        paddingHorizontal: wp(4),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.blackRgba2
    },
    profileImage: {
        width: width * 0.165,
        height: width * 0.165 * 1,
        borderRadius: width * 0.165 * 1 / 2,
    },
    nameEmailCon: {
        marginLeft: wp(3)
    },
    profileName: {
        color: Colors.color8,
        fontFamily: Fonts.APPFONT_R,
        fontSize: wp(5)
    },
    profileEmail: {
        color: Colors.color8,
        fontFamily: Fonts.APPFONT_R,
        fontSize: wp(3.5)
    },
    cardContainer: {
        borderWidth: 0.25,
        borderColor: Colors.color7,
        paddingVertical: hp(2),
        paddingHorizontal: wp(4),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.blackRgba2,
        borderBottomWidth: 0
    },
    cardText: {
        color: Colors.color8,
        fontFamily: Fonts.APPFONT_R,
        fontSize: wp(4.8)
    }
})