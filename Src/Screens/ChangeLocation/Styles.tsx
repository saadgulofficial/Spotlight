import { StyleSheet, Dimensions } from 'react-native'
import { hp, wp } from '../../Globals'
import { Colors, Fonts } from '../../Res'
const { width } = Dimensions.get('window')


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchContainer: {
        paddingVertical: hp(2),
        paddingHorizontal: wp(4)
    },
    searchBar: {
        backgroundColor: Colors.white,
        fontSize: wp(4),
        paddingHorizontal: wp(4),
        paddingVertical: hp(2),
        borderRadius: 10,
        color: Colors.black,
    },
    buttonContainer: {
        position: 'absolute',
        width: wp(100),
        paddingBottom: hp(5),
        bottom: 0,
        paddingHorizontal: wp(4)
    },
    mapMarkerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapMarker: {
        height: hp(7),
    },
    flatListContainer: {
        backgroundColor: Colors.white,
        paddingBottom: hp(3),
        paddingHorizontal: wp(3),
        marginHorizontal: wp(4),
        marginBottom: hp(1),
        borderRadius: 10,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        color: Colors.black,
        elevation: 5,
    },
    placesIcon: {
        height: hp(2.8),
        width: wp(4.4)
    },
    placeContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.color7,
        marginVertical: hp(0.15),
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(1)
    },
    placesText: {
        fontSize: wp(4),
        marginLeft: wp(3),
        maxWidth: wp(78),
        color: Colors.color2
    },
    placesLoaderContainer: {
        paddingVertical: hp(3),
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: 10,
        marginHorizontal: wp(4),
        marginBottom: hp(1)
    }

})