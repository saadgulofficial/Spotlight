import React, { Component } from 'react'
import { Text, View, Modal, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { GButton, hp, wp } from '../../Globals'
import { Colors } from '../../Res'
import Styles from './Styes'
import _ from 'lodash'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { GDataManager } from '../../Services'

export class FilterPost extends Component<any> {

    state: {
        tags: any,
        filterPostLoader: any
    } = {
            tags: [{ name: '#achievements', selected: false, id: 1 }, { name: '#jobs', selected: false, id: 2 }, { name: '#life', selected: false, id: 3 }, { name: '#training', selected: false, id: 4 }, { name: '#socialmarketing', selected: false, id: 5 }, { name: '#homedecor', selected: false, id: 6 }],
            filterPostLoader: false
        }

    render() {
        const { tags, filterPostLoader } = this.state
        return (
            <Modal
                transparent={false}
                style={Styles.container}
                visible={true}
                onRequestClose={this.goBack}
            >
                <SafeAreaView style={Styles.container}>
                    <View style={Styles.headerContainer}>
                        <AntDesign name="close" color={Colors.color} size={wp(8)} onPress={this.goBack} />
                    </View>
                    <View>
                        <View>
                            <View style={Styles.filterPostContainer}>
                                <Text style={Styles.filterPost}>Filter Post</Text>
                            </View>
                            <Text style={Styles.filterPostDis}>Select tags that you are interested in to filter your feed</Text>
                        </View>
                        <FlatList
                            data={tags}
                            renderItem={this.renderTags}
                            numColumns={2}
                            style={Styles.tagsListContainer}
                            keyExtractor={(item) => item.id}
                            scrollEnabled
                            columnWrapperStyle={Styles.tagRow}
                        />

                        <TouchableOpacity style={{ ...GButton.btn, marginHorizontal: wp(5) }}
                            activeOpacity={0.9}
                            onPress={this.filterPost}
                        >
                            {
                                filterPostLoader ? <ActivityIndicator size="small" color={Colors.white} />
                                    :
                                    <Text style={GButton.txt}> Filter Post </Text>
                            }
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }

    renderTags = ({ item }) => {
        return (
            <TouchableOpacity style={{ ...Styles.tagItemContainer, backgroundColor: item.selected ? Colors.color6 : Colors.color2 }} activeOpacity={0.9}
                onPress={this.onTagPress.bind(this, item)}
            >
                <Text style={Styles.tagText}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    onTagPress = (item) => {
        const { tags } = this.state
        item.selected = !item.selected
        _.replace(tags, item.id, item)
        this.setState({ tags: tags })
    }

    goBack = () => this.props.navigation.goBack()

    filterPost = () => {
        const { tags } = this.state
        const { setLocalData, KEYS } = GDataManager
        this.setState({ filterPostLoader: true })
        const selectedTags = _.filter(tags, function (o) { return o.selected; });
        const selectedTagNames = _.chain(selectedTags).map((item) => { return item.name }).flatten().value()
        setLocalData(KEYS.FILTERTAGS, selectedTagNames)
            .then(() => {
                this.setState({ filterPostLoader: false })
                global.filterPressed = true
                this.goBack()
            })
            .catch(() => this.setState({ filterPostLoader: false }))
    }

}

export default FilterPost