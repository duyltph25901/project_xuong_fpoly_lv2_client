import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import { Color, StyleTemplate, ConstString } from '../../../../styles'
import { useNavigation } from '@react-navigation/native'

const width = Dimensions.get('window').width

const GuideScreen = () => {
    const navigation = useNavigation()
    const [data, setData] = useState([])

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
                        }} />
                </TouchableOpacity>
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: 20,
                    color: Color.color_primary,
                    fontWeight: 'bold'
                }}>Hướng dẫn sử dụng</Text>
            </View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TouchableOpacity style={{
                    width: width - 20,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 12,
                    backgroundColor: Color.color_primary,
                    marginBottom: 12
                }}
                    onPress={() => navigation.navigate(ConstString.guide_admin)}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '500',
                        color: 'white'
                    }}>Thủ thư</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    width: width - 20,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 12,
                    backgroundColor: Color.color_primary,
                    marginBottom: 12
                }}
                    onPress={() => navigation.navigate(ConstString.guide_boss)}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '500',
                        color: 'white'
                    }}>Chủ doanh nghiệp</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default GuideScreen

const styles = StyleSheet.create({})