import React from 'react'
import { View, Text, Modal, StyleSheet, ActivityIndicator } from 'react-native'
import { hp, wp } from '../Globals'

const GModalLoader = props => {
    const {
        show = false,
        color = "black",
        backgroundColor = "white",
        dimLights = 0.6,
        loadingMessage = "Loading Please wait..."
    } = props;
    return (
        <Modal transparent={true} animationType="none" visible={show}>
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: `rgba(0,0,0,${dimLights})`
                }}
            >
                <View
                    style={{
                        paddingVertical: hp(2),
                        paddingHorizontal: wp(4),
                        backgroundColor: `${backgroundColor}`,
                        borderRadius: 13
                    }}
                >
                    <ActivityIndicator animating={show} color={color} size="large" />
                    <Text style={{ color: `${color}`, marginTop: hp(1), fontSize: wp(4) }}>{loadingMessage}</Text>
                </View>
            </View>
        </Modal>
    );
};

export { GModalLoader }