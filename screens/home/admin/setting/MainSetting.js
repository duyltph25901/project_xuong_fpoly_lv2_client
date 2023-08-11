import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Color, ConstString, StyleTemplate } from '../../../../styles'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const width = Dimensions.get('window').width

const MainSetting = () => {
    const navigation = useNavigation()
    const arrOption = [
        {
            id: 0,
            title: 'Cập nhật thông tin',
            image: '../../../../assets/images/icon_update_profile.png'
        },
        {
            id: 1,
            title: 'Trung tâm hỗ trợ',
            image: '../../../../assets/images/icon_help_center.png'
        },
        {
            id: 2,
            title: 'Thông tin ứng dụng',
            image: '../../../../assets/images/icon_about_us.png'
        },
        {
            id: 3,
            title: 'Hướng dẫn sử dụng',
            image: '../../../../assets/images/icon_guide.png'
        }
    ]
    const [options, setOption] = useState(arrOption)

    const handleLogout = () => {
        Alert.alert(ConstString.confirm_log_out, 'Bạn có muốn đăng xuất khỏi thiết bị này?', [
            {
                text: 'Không',
                style: 'cancel'
            }, {
                text: 'Có',
                onPress: () => {
                    for (let i = 0; i < 2; i++) {
                        navigation.getParent().goBack()
                    }
                }
            }
        ])
    }

    const handleChooseItem = (item) => {
        switch (item.id) {
            case 0: {
                navigation.navigate(ConstString.update_profile_admin)
                break
            } case 1: {
                navigation.navigate(ConstString.help_center)
                break
            } case 2: {
                navigation.navigate(ConstString.information_app_screen)
                break
            } case 3: {
                navigation.navigate(ConstString.guide_app_screen)
                break
            } default: {
                navigation.navigate(ConstString.update_profile_admin)
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
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: Color.color_primary,
                    flex: 1,
                    textAlign: 'center'
                }}>Cài đặt</Text>

                <TouchableOpacity onPress={handleLogout}>
                    <Image source={require('../../../../assets/images/icon_log_out.png')}
                        style={styles.icon_default}
                    />
                </TouchableOpacity>
            </View>
            <FlatList style={{
            }}
                data={options}
                keyExtractor={(item, index) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={{
                            width: width,
                            borderBottomWidth: 1,
                            borderBottomColor: Color.color_primary,
                            marginBottom: 5,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 12
                        }}
                            onPress={() => handleChooseItem(item)}>
                            {
                                item.id == 0 ? (
                                    <Image source={require('../../../../assets/images/icon_update_profile.png')}
                                        style={styles.icon} />
                                )
                                    : (
                                        item.id == 1 ? (
                                            <Image source={require('../../../../assets/images/icon_help_center.png')}
                                                style={styles.icon} />
                                        )
                                            : (
                                                item.id == 2 ? (
                                                    <Image source={require('../../../../assets/images/icon_about_us.png')}
                                                        style={styles.icon} />
                                                ) : (
                                                    <Image source={require('../../../../assets/images/icon_guide.png')}
                                                        style={styles.icon} />
                                                )
                                            )
                                    )
                            }
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '400',
                            }}>{item.title}</Text>
                            <View style={{ flex: 1 }} />
                            <Image style={styles.icon_secondary}
                                source={require('../../../../assets/images/icon_next.png')}
                            />
                        </TouchableOpacity>
                    )
                }} />
        </SafeAreaView>
    )
}

export default MainSetting

const styles = StyleSheet.create({
    icon: {
        height: 30,
        width: 30,
        resizeMode: 'cover',
        marginVertical: 12,
        marginEnd: 12
    },
    icon_secondary: {
        height: 18,
        width: 18,
        resizeMode: 'cover',
        tintColor: Color.color_primary
    },
    icon_default: {
        height: 25,
        width: 25,
        resizeMode: 'cover'
    }
})