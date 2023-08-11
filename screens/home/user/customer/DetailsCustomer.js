import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, SafeAreaView, Alert, ActivityIndicator, Linking } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Color, ConstNumber, ConstString, StyleTemplate, TextStyle } from '../../../../styles/index'

const width = Dimensions.get('window').width

const DetailsCustomer = ({ route }) => {
    const navigation = useNavigation()

    const [customerDefault, setCustomerDefault] = useState(route.params.item)
    const [customer, setCustomers] = useState({})
    const [isLoading, setLoading] = useState(true)

    const deleteCustomer = async () => {
        Alert.alert(ConstString.confirm_delete, `Bạn có muốn xóa ${customer.user_name}?`, [
            {
                text: 'Không',
                style: 'cancel'
            }, {
                text: 'Có',
                onPress: () => {
                    const url_delete = `${ConstString.url}${ConstString.action_delete_customer}/${customer.id}`
                    fetch(url_delete, {
                        method: 'delete',
                        headers: {
                            Accept: 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                        .then(res => { return res.json() })
                        .then(res => {
                            const message = res.message
                            const code = res.flag

                            if (code != ConstNumber.code_200) {
                                Alert.alert(ConstString.oops, message)
                            } else {
                                Alert.alert(ConstString.congratulations, `Bạn đã xóa ${customer.user_name} ra khỏi danh sách!`)
                                navigation.goBack()
                            }
                        })
                        .catch(err => {
                            Alert.alert(ConstString.oops, err.message)
                        })
                        .finally(() => {
                            setLoading(false)
                        })
                }
            }
        ])
    }

    const getObjectCurrent = async () => {
        const url_search = `${ConstString.url}${ConstString.action_search_customer_by_id}/${customerDefault.id}`
        fetch(url_search)
            .then(res => { return res.json() })
            .then(res => {
                const code = res.flag
                const objectCurrent = res.object_current
                if (objectCurrent) {
                    setCustomers(objectCurrent)
                } else {
                    Alert.alert(ConstString.oops, 'Lỗi kết nối!')
                }
            })
            .catch(err => {
                Alert.alert(ConstString.oops, err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getObjectCurrent()
        });

        return unsubscribe;
    }, [navigation]);



    return (
        <>
            {
                isLoading
                    ? (
                        <SafeAreaView style={[StyleTemplate.container]}>
                            <ActivityIndicator />
                        </SafeAreaView>
                    )
                    : (
                        <SafeAreaView style={[StyleTemplate.container]}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 12, width: width }}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Image source={require('../../../../assets/images/icon_back.png')}
                                        style={{ height: 23, width: 23 }}
                                    />
                                </TouchableOpacity>
                                <Text style={{ flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: Color.color_primary, textDecorationLine: 'underline', fontStyle: 'italic' }}>{customer.user_name}</Text>
                                <TouchableOpacity onPress={() => {
                                    const item = customer
                                    navigation.navigate(ConstString.update_customer, { item })
                                }}>
                                    <Image source={require('../../../../assets/images/icon_edit.png')}
                                        style={{
                                            height: 25,
                                            width: 25,
                                            resizeMode: 'cover',
                                            marginEnd: 20
                                        }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={deleteCustomer}>
                                    <Image source={require('../../../../assets/images/icon_trash.png')}
                                        style={{
                                            height: 25,
                                            width: 25,
                                            resizeMode: 'cover',
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', width: width - 20, marginTop: 20 }}>
                                <Image style={{
                                    width: 130,
                                    height: 230,
                                    borderRadius: 12,
                                    borderWidth: 1,
                                    borderColor: Color.color_primary,
                                    resizeMode: 'cover'
                                }}
                                    source={{ uri: customer.image }} />
                                <View style={{ flex: 1, marginStart: 10 }}>
                                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 5, }}
                                        onPress={() => Linking.openURL(`mailto:${customer.email}`)}>
                                        <Image source={require('../../../../assets/images/icon_email_colorful.png')}
                                            style={{
                                                height: 24,
                                                width: 24,
                                                marginEnd: 10
                                            }}
                                        />
                                        <Text style={{
                                            fontSize: 14, fontWeight: '500', fontStyle: 'italic', color: Color.color_primary, textDecorationLine: 'underline'
                                        }}>{customer.email}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 15, }}
                                        onPress={() => {
                                            Linking.openURL(`tel:${customer.phone_number}`)
                                        }}>
                                        <Image source={require('../../../../assets/images/icon_phone.png')}
                                            style={{
                                                height: 24,
                                                width: 24,
                                                marginEnd: 10
                                            }}
                                        />
                                        <Text style={{
                                            fontSize: 14, fontWeight: '500', fontStyle: 'italic', color: Color.color_primary, textDecorationLine: 'underline'
                                        }}>{customer.phone_number}</Text>
                                    </TouchableOpacity>

                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 15, }}>
                                        <Image source={require('../../../../assets/images/icon_dob.png')}
                                            style={{
                                                height: 24,
                                                width: 24,
                                                marginEnd: 10
                                            }}
                                        />
                                        <Text style={{
                                            fontSize: 14, fontWeight: '400', color: Color.color_primary
                                        }}>{customer.dob}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 15, }}>
                                        <Image source={require('../../../../assets/images/icon_location.png')}
                                            style={{
                                                height: 24,
                                                width: 24,
                                                marginEnd: 10
                                            }}
                                        />
                                        <Text style={{
                                            fontSize: 14, fontWeight: '400', color: Color.color_primary
                                        }}>{customer.countries}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 15, }}>
                                        <Image source={require('../../../../assets/images/icon_gender.png')}
                                            style={{
                                                height: 24,
                                                width: 24,
                                                marginEnd: 10
                                            }}
                                        />
                                        <Text style={{
                                            fontSize: 14, fontWeight: '400', color: Color.color_primary
                                        }}>{customer.gender == 0 ? 'Nữ' : (customer.gender == 1 ? 'Nam' : 'Khác')}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 15, }}>
                                        <Image source={require('../../../../assets/images/icon_starpoint.png')}
                                            style={{
                                                height: 24,
                                                width: 24,
                                                marginEnd: 10
                                            }}
                                        />
                                        <Text style={{
                                            fontSize: 14, fontWeight: '400', color: customer.point <= 30 ? Color.color_enable_fail : Color.color_enable_true
                                        }}>{customer.point}</Text>
                                    </View>
                                </View>
                            </View>
                        </SafeAreaView>
                    )
            }
        </>
    )
}

export default DetailsCustomer

const styles = StyleSheet.create({})