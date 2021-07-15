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
        paddingVertical: hp(1),
        paddingHorizontal: wp(4)
    },
    headerText: {
        fontSize: wp(8),
        fontFamily: Fonts.APPFONT_B,
        color: Colors.color
    },
    cardContainer: {
        borderBottomWidth: 0.25,
        borderBottomColor: Colors.color7,
        paddingVertical: hp(2),
        paddingRight: wp(4),
        marginLeft: wp(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    titleContainer: {
        width: wp(75),
        overflow: 'hidden'
    },
    cardTitle: {
        fontSize: wp(4.4),
        fontFamily: Fonts.APPFONT_SB
    },
    cardDis: {
        fontSize: wp(3.8),
        fontFamily: Fonts.APPFONT_R,
        color: Colors.color2
    },
    toggleLoader: {
        marginTop: hp(0.4),
        marginRight: wp(2)
    }
})