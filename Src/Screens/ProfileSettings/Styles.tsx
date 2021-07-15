import { StyleSheet, Dimensions } from 'react-native'
import { hp, wp } from '../../Globals'
import { Colors, Fonts } from '../../Res'
const { width } = Dimensions.get('window')
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    profileImageContainer: {
        borderWidth: 0,
        paddingTop: hp(3),
        paddingBottom: hp(1),
        alignSelf: 'center',
        alignItems: 'center'
    },
    profile: {
        width: width * 0.25,
        height: width * 0.25 * 1,
        borderRadius: width * 0.25 * 1 / 2,
    },
    editBtn: {
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: wp(4),
        paddingVertical: hp(0.3),
        backgroundColor: Colors.white,
        borderRadius: 30,

        shadowColor: 'rgba(0,0,0,0.7)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    editText: {
        fontSize: wp(3),
        fontFamily: Fonts.APPFONT_B
    },
    fieldsContainer: {
        borderWidth: 0,
        paddingTop: hp(7)
    },
    fieldView: {
        borderWidth: 0.25,
        borderColor: Colors.color7,
        paddingVertical: hp(1.7),
        paddingHorizontal: wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(4)
    },
    fieldName: {
        fontSize: wp(4),
        fontFamily: Fonts.APPFONT_R
    },
    progressText: {
        fontSize: wp(4),
        fontFamily: Fonts.APPFONT_SB,
        color: Colors.black
    },
    uploadingText: {
        fontSize: wp(3.6),
        fontFamily: Fonts.APPFONT_R,
        marginVertical: hp(1),
        color: Colors.black
    }
})