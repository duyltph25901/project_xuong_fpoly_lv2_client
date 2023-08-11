import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, FlatList, Linking } from 'react-native'
import React, { useState } from 'react'
import { Color, StyleTemplate } from '../../../../styles'
import { useNavigation } from '@react-navigation/native'

const width = Dimensions.get('window').width

const HelpCenterScreen = () => {
    const navigation = useNavigation()

    const [data, setData] = useState([
        {
            id: 0,
            title: 'Email',
            info: 'cskh@gmail.com',
        },
        {
            id: 1,
            title: 'Hotline',
            info: '123-12'
        },
    ])

    const chooseItem = (item) => {
        switch (item.id) {
            case 0: {
                Linking.openURL(`mailto:${item.info}`)
                break
            } case 1: {
                Linking.openURL(`tel:${item.info}`)
                break
            }
        }
    }

    return (
        <SafeAreaView style={[StyleTemplate.container]}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 12,
                marginBottom: 20,
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../../../assets/images/icon_back.png')}
                        style={{
                            height: 23,
                            width: 23,
                            resizeMode: 'cover',
                            tintColor: Color.color_primary
                        }}
                    />
                </TouchableOpacity>
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: Color.color_primary
                }}>Chăm sóc khách hàng</Text>
            </View>

            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <FlatList data={data}
                    keyExtractor={(item, index) => item.id}
                    scrollEnabled={false}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={{
                                width: width - 20,
                                paddingVertical: 12,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderBottomWidth: 1,
                                borderBottomColor: Color.color_primary,
                                paddingBottom: 7,
                                flexDirection: 'row'
                            }}
                                onPress={() => chooseItem(item)}>
                                {
                                    item.id == 0
                                        ? (
                                            <Image source={require('../../../../assets/images/icon_email_colorful.png')}
                                                style={{
                                                    height: 30,
                                                    width: 30,
                                                    resizeMode: 'cover',
                                                    marginEnd: 12
                                                }} />
                                        )
                                        : (
                                            <Image source={require('../../../../assets/images/icon_hotline.png')}
                                                style={{
                                                    height: 30,
                                                    width: 30,
                                                    resizeMode: 'cover',
                                                    marginEnd: 12
                                                }} />
                                        )
                                }
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 3 }}>{item.title}</Text>
                                    <Text style={{ fontSize: 12, fontStyle: 'italic', color: '#CCCCCC' }}>{item.info}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default HelpCenterScreen

const styles = StyleSheet.create({})