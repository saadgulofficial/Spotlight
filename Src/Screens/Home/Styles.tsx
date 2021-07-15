import { Dimensions } from 'react-native'
import { Platform, StyleSheet } from 'react-native'
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
        paddingHorizontal: wp(4),
        alignItems: 'center',
        marginTop: hp(-2)
    },
    headerText: {
        fontSize: wp(8),
        fontFamily: Fonts.APPFONT_B,
        color: Colors.color,
        width: wp(40),
    },
    alertContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchBarContainer: {
        paddingHorizontal: wp(4)
    },
    searchBar: {
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.color3,
        paddingVertical: Platform.OS === 'ios' ? hp(1.6) : hp(0.8),
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchInput: {
        fontSize: wp(4),
        marginHorizontal: wp(2),
        fontFamily: Fonts.APPFONT_R,
        width: wp(80),
        color: Colors.black
    },
    emptyListContainer: {
        flex: 1,
        paddingTop: hp(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyListText: {
        fontSize: wp(5),
        fontFamily: Fonts.APPFONT_R,
        color: Colors.color7
    },
    notificationIconContainer: {
        marginLeft: wp(2),
        paddingVertical: hp(1),
        paddingHorizontal: wp(2),
    },
    badgeView: {
        position: 'absolute',
        backgroundColor: 'red',
        width: width * 0.05,
        height: width * 0.05 * 1,
        borderRadius: width * 0.05 * 1 / 2,
        right: wp(-2),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(2)
    },
    badgeText: {
        fontSize: wp(3.2),
        color: Colors.white,
        fontFamily: Fonts.APPFONT_B
    },
    filterIconContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    reset: {
        fontSize: wp(4.4),
        fontFamily: Fonts.APPFONT_R,
        color: Colors.color,
        marginRight: wp(2)
    }
})