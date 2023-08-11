import { StyleSheet, Text, View, SafeAreaView, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Color, ConstString, StyleTemplate } from '../../../../styles'
import { useNavigation } from '@react-navigation/native'

const width = Dimensions.get('window').width

const GuideBoss = () => {
    const navigation = useNavigation()
    const [data, setData] = useState([
        {
            id: 0,
            title: 'Thống kê doanh thu',
            content: ConstString.lorem
        },
        {
            id: 1,
            title: 'CRUD/Tìm kiếm thủ thư',
            content: ConstString.lorem
        },
        {
            id: 2,
            title: 'Cập nhật tài khoản',
            content: ConstString.lorem
        },
    ])

    return (
        <SafeAreaView style={[StyleTemplate.container]}>
            <View style={{
                width: width - 20,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 12,
                marginBottom: 20
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
                }}>
                    Hướng dẫn chủ doanh nghiệp
                </Text>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => {
                    return (
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: width - 20,
                            paddingVertical: 7,
                            borderBottomWidth: 1,
                            borderBottomColor: Color.color_primary,
                            paddingTop: 12
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                                color: Color.color_primary,
                                marginEnd: 12
                            }}>{item.id + 1}.</Text>
                            <View style={{ flex: 1, }}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    color: Color.color_primary,
                                    marginBottom: 7
                                }}>{item.title}</Text>
                                <Text style={{
                                    fontSize: 14,
                                    color: 'black',
                                    fontWeight: '400'
                                }}>{item.content}</Text>
                            </View>
                        </View>
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default GuideBoss

const styles = StyleSheet.create({})