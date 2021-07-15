import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Header } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { hp, wp } from '../Globals'
import { Colors, Fonts } from '../Res'

const GHeader = ({ left, centerComponent, centerTitle, right, style, bgColor, back, navigation }: any) => {
    const handleBack = () => { navigation.goBack() }
    return (
        <Header
            leftComponent={back ?
                <TouchableOpacity style={Styles.leftContainer}
                    onPress={handleBack}
                >
                    <AntDesign size={wp(5.5)} name="left" color={Colors.black} style={{ paddingBottom: hp(1), paddingTop: hp(0.2), paddingHorizontal: wp(2), }} />
                    {/* <Text style={Styles.backText}>Back</Text> */}
                </TouchableOpacity>
                : left}
            centerComponent={
                centerComponent ? centerComponent :
                    centerTitle ?
                        <Text style={Styles.centerTitleText}>
                            {centerTitle}
                        </Text>
                        : null
            }
            rightComponent={right}
            backgroundColor={bgColor}
            containerStyle={style}
        />
    )
}

const Styles = StyleSheet.create({
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        fontSize: wp(5),
        fontFamily: Fonts.APPFONT_R
    },
    centerTitleText: {
        fontSize: wp(4.5),
        fontFamily: Fonts.APPFONT_SB,
        color: Colors.color
    }
})

export { GHeader }
