import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import Entypo from 'react-native-vector-icons/Entypo'
import { wp } from '../Globals'
import { Colors } from '../Res'

class CommentActionSheet extends Component<any> {

    render() {
        const { onPress, post } = this.props
        const { hidePostsFromOthers, allowComments } = post
        return (
            <View>
                <TouchableOpacity
                    onPress={this.onOptionPress}
                    style={{ paddingHorizontal: wp(2) }}
                >
                    <Entypo name="dots-three-horizontal" color={Colors.color} size={wp(8)} />
                </TouchableOpacity>
                <ActionSheet
                    //@ts-ignore
                    ref={o => this.ActionSheet = o}
                    options={[
                        hidePostsFromOthers ? 'Show This Post' : 'Hide This Post',
                        allowComments ? 'Turn Off Comments' : 'Turn On Comments',
                        'Delete This Post',
                        'Cancel'
                    ]}
                    cancelButtonIndex={3}
                    destructiveButtonIndex={2}
                    onPress={onPress}
                />
            </View>
        )
    }

    onOptionPress = () => {
        //@ts-ignore
        this.ActionSheet.show()
    }
}

export { CommentActionSheet }
