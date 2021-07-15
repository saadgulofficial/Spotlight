import React, { useEffect } from 'react'
import { View, Text, Keyboard } from 'react-native'

const KeyboardListener = ({ onShow, onHide }: any) => {
    useEffect(() => {
        const show = Keyboard.addListener('keyboardDidShow', onShow)
        const hide = Keyboard.addListener('keyboardDidHide', onHide);

        return () => {
            show.remove()
            hide.remove()
        }
    }, [])
    return (
        <View />
    )

}

export { KeyboardListener }
