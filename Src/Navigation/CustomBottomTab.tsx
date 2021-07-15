import React from "react";
import { Text, TouchableOpacity, StyleSheet, View, Dimensions, Image, Platform } from 'react-native';

import { hp, wp } from '../Globals'
import { Colors, Fonts, Images, Svgs } from "../Res";
import Fontisto from 'react-native-vector-icons/Fontisto'

const { width } = Dimensions.get('window')
const CustomBottomTab = ({ state, descriptors, navigation }: any) => {

    const focusedOptions = descriptors[state.routes[state.index].key].options;
    if(focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View style={Styles.container} >
            {state.routes.map((route: any, index: any) => {
                const { options } = descriptors[route.key];

                const isFocused = state.index === index;
                const icon = route.name === 'Home' ?
                    isFocused ? <Svgs.HomeFocused /> : <Svgs.home />
                    : route.name === 'Profile' ?
                        isFocused ? <Svgs.userFocused /> : <Svgs.user />
                        : null


                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if(!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <View key={index}>
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={Styles.button}
                            activeOpacity={1}
                        >
                            <View>
                                {
                                    route.name === 'CreatePost' &&
                                    <View style={Styles.createPost}>
                                        <Fontisto name="plus-a" color={Colors.white} size={wp(8)} />
                                    </View>
                                }
                                {icon}
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
}
export default CustomBottomTab


const Styles = StyleSheet.create({
    container: {
        paddingTop: hp(0.7),
        paddingBottom: Platform.OS === 'ios' ? hp(3) : hp(1),
        paddingHorizontal: wp(5.5),
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderTopWidth: Platform.OS === 'android' ? 0.25 : 0,
        borderColor: Colors.color7
    },
    button: {
        borderWidth: 0,
        width: wp(20),
        height: hp(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    createPost: {
        width: width * 0.165,
        height: width * 0.165 * 1,
        borderRadius: width * 0.165 * 1 / 2,
        backgroundColor: Colors.theme,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
        alignSelf: 'center',
        marginBottom: hp(3.8),


        shadowColor: Colors.color4,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 14,
    }

})