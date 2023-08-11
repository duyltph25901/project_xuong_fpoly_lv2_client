import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { Color, ConstString, StyleTemplate } from '../../../../styles'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import { FlatGrid } from 'react-native-super-grid'
const width = Dimensions.get('window').width

const DetailsCategory = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const item = route.params.item
    const [isLoading, setLoading] = useState(true)
    const numColumns = 2
    const [data, setData] = useState([])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData()
        })

        return unsubscribe
    }, [navigation])

    const formatData = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns)

        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns)
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true })
            numberOfElementsLastRow++
        }

        return data
    }

    const getData = async () => {
        const url = `${ConstString.url}${ConstString.action_search_book_by_category}/${item.id}`
        fetch(url)
            .then(res => { return res.json() })
            .then(res => {
                setData(res.books)
            })
            .catch(err => {
                Alert.alert(ConstString.oops, err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <SafeAreaView style={[StyleTemplate.container]}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: width - 20,
                paddingVertical: 12
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../../../assets/images/icon_back.png')}
                        style={{
                            height: 23,
                            width: 23,
                            resizeMode: 'cover',
                            tintColor: Color.color_primary
                        }} />
                </TouchableOpacity>
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '500',
                    color: Color.color_primary,
                    textDecorationLine: 'underline',
                    fontStyle: 'italic'
                }}>{item.name}</Text>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {
                    isLoading
                        ? (
                            <ActivityIndicator />
                        )
                        : (
                            <FlatGrid style={{ flex: 1, }}
                                data={formatData(data, numColumns)}
                                keyExtractor={(item, index) => item.id}
                                itemDimension={130}
                                spacing={10}
                                renderItem={({ item }) => {
                                    return (
                                        <>
                                            {
                                                item.image
                                                && (
                                                    <View style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        borderRadius: 12,
                                                        borderWidth: 1,
                                                        borderColor: Color.color_primary,
                                                        paddingVertical: 5,
                                                    }}>
                                                        <Image source={{ uri: item.image }}
                                                            style={{
                                                                height: 200,
                                                                width: 160,
                                                                resizeMode: 'stretch',
                                                                borderImageSlice: 50,
                                                                borderImageWidth: 20,
                                                            }}
                                                        />
                                                    </View>
                                                )
                                            }
                                        </>
                                    )
                                }} />
                        )
                }
            </View>
        </SafeAreaView>
    )
}

export default DetailsCategory

const styles = StyleSheet.create({})