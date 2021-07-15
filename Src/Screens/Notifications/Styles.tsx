import { StyleSheet, Dimensions } from 'react-native'
import { hp, wp } from '../../Globals'
import { Colors, Fonts } from '../../Res'
const { width } = Dimensions.get('window')


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    flatListContainer: {
        // flex: 1,
        paddingBottom: hp(3),
        paddingHorizontal: wp(4),
    },
    flatItemContainer: {
        borderBottomWidth: 0.25,
        borderColor: Colors.color7,
        marginVertical: hp(2),
        paddingVertical: hp(1),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemTitle: {
        fontSize: wp(4.4),
        fontFamily: Fonts.APPFONT_B,
        fontWeight: 'bold',
    },
    itemDis: {
        fontSize: wp(4),
        fontFamily: Fonts.APPFONT_SB,
        color: Colors.blackRgba40
    },
    fieldsContainer: {
        width: wp(80),
    },
    deleteContainer: {
        width: wp(12),
    },
    deleteView: {
        height: hp(5),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.redRgba30,
    },
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyListText: {
        fontSize: wp(4),
        fontFamily: Fonts.APPFONT_SB,
        color: Colors.color2
    }
})