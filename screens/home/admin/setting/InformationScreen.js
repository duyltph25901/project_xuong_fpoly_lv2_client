import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, SafeAreaView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Color, StyleTemplate } from '../../../../styles'
import { useNavigation } from '@react-navigation/native'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const InformationScreen = () => {

    const navigation = useNavigation()
    const [informations, setInfo] = useState([
        {
            id: 0,
            title: 'Tên ứng dụng',
            content: 'VirgoLib'
        },
        {
            id: 1,
            title: 'Phiên bản',
            content: 'v1.0.0'
        }
    ])

    return (
        <SafeAreaView style={[StyleTemplate.container]}>
            <View style={{
                width: width - 20,
                paddingHorizontal: 12,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20
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
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: Color.color_primary
                }}>Thông tin ứng dụng</Text>
            </View>

            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <FlatList data={informations}
                    scrollEnabled={false}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <View style={{
                                width: width,
                                padding: 10,
                                paddingHorizontal: 12,
                                borderBottomWidth: 1,
                                borderBottomColor: Color.color_primary,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: '400',
                                    color: Color.color_text_primary
                                }}>{item.title}:</Text>
                                <View style={{ flex: 1 }} />
                                <Text style={{
                                    fontSize: 14,
                                    fontStyle: 'italic',
                                    fontWeight: '500',
                                    color: 'black',
                                    textDecorationLine: 'underline'
                                }}>{item.content}</Text>
                            </View>
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default InformationScreen

const styles = StyleSheet.create({})