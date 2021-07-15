import { StyleSheet, Dimensions } from 'react-native'
import { hp, wp } from '../../Globals'
import { Colors, Fonts } from '../../Res'
const { width } = Dimensions.get('window')
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    headerContainer: {
        borderBottomWidth: 0,
        alignItems: 'center',
        paddingHorizontal: wp(4)
    },
    headerText: {
        fontSize: wp(8),
        fontFamily: Fonts.APPFONT_B,
        color: Colors.color,
        width: wp(40),
    },
    profilePictureContainer: {
        paddingVertical: hp(2),
        paddingHorizontal: wp(4),
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImage: {
        width: width * 0.2,
        height: width * 0.2 * 1,
        borderRadius: width * 0.2 * 1 / 2,
    },
    nameSettingCon: {
        marginLeft: wp(3)
    },
    profileName: {
        fontSize: wp(6.5),
        fontFamily: Fonts.APPFONT_SB,
        color: Colors.color
    },
    settingsButton: {
        paddingVertical: hp(0.4),
        marginTop: hp(0.6),
        borderRadius: 5,
        paddingHorizontal: wp(6),
        backgroundColor: Colors.theme,
        alignSelf: 'flex-start'
    },
    settings: {
        fontSize: wp(3),
        color: Colors.white,
        fontFamily: Fonts.APPFONT_SB
    },
    profileDis: {
        fontSize: wp(4),
        fontFamily: Fonts.APPFONT_R,
        color: Colors.color2,
        marginHorizontal: wp(4)
    },

    tabBarHeader: {
        borderWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(6),
        justifyContent: 'space-between'
    },
    tabBarHeaderItem: {
        paddingVertical: hp(0.2),
        borderBottomWidth: 2,
        borderBottomColor: Colors.color,
    },
    tabBarHeaderText: {
        fontSize: wp(4.3),
        fontFamily: Fonts.APPFONT_B,
        color: Colors.color
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyListText: {
        fontSize: wp(5),
        fontFamily: Fonts.APPFONT_R,
        color: Colors.color7
    },
    discriptionContainer: {
        paddingBottom: hp(1.3),
    },
    seeMore: {
        fontSize: wp(3.5),
        fontFamily: Fonts.APPFONT_B,
        color: Colors.color
    }
})