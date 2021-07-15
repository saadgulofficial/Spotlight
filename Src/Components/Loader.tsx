import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Colors } from '../Res'
import { wp, hp } from '../Globals'
const GLoader = () => {
    return (
        <View style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', position: 'absolute', height: hp(100), width: wp(100) }}>
            <ActivityIndicator color={Colors.theme} size='small' />
        </View>
    )
}

export { GLoader }
