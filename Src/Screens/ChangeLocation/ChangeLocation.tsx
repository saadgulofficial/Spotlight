import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, TextInput, FlatList, ActivityIndicator, PermissionsAndroid, Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import LinearGradient from 'react-native-linear-gradient';
import Geocoder from 'react-native-geocoding';
import MapView from 'react-native-maps';
import { GHeader, GToast } from '../../Components'
import { GButton, hp, wp } from '../../Globals'
import { Colors, Images } from '../../Res'
import Styles from './Styles'
import { GFirebase } from '../../Services';

export class ChangeLocation extends Component<any> {
    state: {
        region: any,
        placesLoader: any,
        placeInput: any,
        places: any,
        selectLoctionLoader: any
    } = {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            placesLoader: false,
            placeInput: '',
            places: [],
            selectLoctionLoader: false
        }
    watchID: number;

    async componentDidMount() {
        await this.getCurrentLocation()
        Geocoder.init("AIzaSyCD2pSKlgxknr3H_EKIe2E-QdwgSDNxrwc");
    }

    componentWillUnmount() {
        Geolocation.clearWatch(this.watchID);
    }
    render() {
        const { placeInput, places, placesLoader, selectLoctionLoader } = this.state
        return (
            <View style={Styles.container}>
                <MapView
                    region={this.state.region}
                    onRegionChangeComplete={this.onRegionChange}
                    style={Styles.map}
                    zoomEnabled
                    provider={Platform.OS === 'android' ? 'google' : null}
                >
                    {
                        Platform.OS === 'ios' &&
                        <Image source={Images.mapMarker} resizeMode='contain' style={Styles.mapMarker} />
                    }
                </MapView>
                {
                    Platform.OS === 'android' &&
                    <View style={Styles.mapMarkerContainer}>
                        <Image source={Images.mapMarker} resizeMode='contain' style={Styles.mapMarker} />
                    </View>
                }
                <View style={{ position: 'absolute' }}>
                    <LinearGradient colors={['rgba(255,255,255,0)', '#fff']} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} >
                        <GHeader
                            back
                            navigation={this.props.navigation}
                            bgColor={"transparent"}
                            centerTitle={'Set your location'}
                            style={{ borderBottomWidth: 0 }}
                        />
                        <View style={{ ...Styles.searchContainer, ...Styles.shadow }}>
                            <TextInput
                                style={Styles.searchBar}
                                placeholder="Search by City"
                                placeholderTextColor={Colors.blackRgba40}
                                value={placeInput}
                                onChangeText={this.getPlace}
                            />
                        </View>
                        {
                            placesLoader &&
                            <View style={{ ...Styles.placesLoaderContainer, ...Styles.shadow }}>
                                <ActivityIndicator size="small" color={Colors.black} />
                            </View>
                        }

                        {
                            places.length !== 0 &&
                            <View style={{ ...Styles.flatListContainer, ...Styles.shadow }}>
                                <FlatList
                                    data={places}
                                    renderItem={this.renderPlaces}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        }
                    </LinearGradient>
                </View>
                <View style={Styles.buttonContainer}>
                    <TouchableOpacity style={GButton.btn}
                        disabled={selectLoctionLoader}
                        onPress={this.onSelectLocation}
                    >
                        {
                            selectLoctionLoader ?
                                <ActivityIndicator size="small" color={Colors.white} />
                                :
                                <Text style={GButton.txt}>Select Location</Text>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderPlaces = ({ item }) => {
        return (
            <TouchableOpacity style={Styles.placeContainer} activeOpacity={0.8}
                onPress={this.onPlacePress.bind(this, item)}
            >
                <Image source={Images.mapMarker} style={Styles.placesIcon} resizeMode='cover' />
                <Text style={Styles.placesText} numberOfLines={2}>{item.description}</Text>
            </TouchableOpacity>
        )
    }

    onRegionChange = (region) => this.setState({ region })
    getPlace = async (text) => {
        const { placesLoader } = this.state
        placesLoader === false ? this.setState({ placesLoader: true }) : null
        this.setState({ placeInput: text })
        if(text.trim().length === 0) {
            this.setState({ places: [], placesLoader: false })
        }
        try {
            let response = await fetch(
                'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + text + '&key=AIzaSyCD2pSKlgxknr3H_EKIe2E-QdwgSDNxrwc');
            if(response.status == 200) {
                response.json().then(async data => {
                    if(data.status === 'OK') {
                        let placesObject = []
                        data.predictions.map((item, index) => {
                            let object: any = {}
                            object.description = item.description
                            object.place_id = item.place_id
                            object.mainText = item.structured_formatting.main_text
                            placesObject[index] = object
                        })
                        this.setState({ places: placesObject }, () => {
                            this.setState({ placesLoader: false })
                        })
                    }
                });
            } else {
                this.setState({ placesLoader: false })
            }
        } catch(error) {
            this.setState({ placesLoader: false })
            console.error(error)
        }
    }

    onPlacePress = (item) => {
        Geocoder.from(item.description)
            .then(json => {
                var location = json.results[0].geometry.location;
                const { lat, lng } = location
                this.setState({
                    region: {
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    },
                    places: [],
                    placeInput: item.description
                })
            })
            .catch(error => console.log(error));
    }


    async getCurrentLocation() {
        Platform.OS === 'android' ?
            await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            : await Geolocation.requestAuthorization('whenInUse');
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    },
                })
            },
            (err) => { console.log(err) },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    onSelectLocation = () => {
        const { region } = this.state
        this.setState({ selectLoctionLoader: true })
        GFirebase.setLocation(region)
            .then(() => {
                GToast.shortBottom('Location Updated')
                this.setState({ selectLoctionLoader: false })
            })
            .catch(() => this.setState({ selectLoctionLoader: false }))
    }
}

export default ChangeLocation
