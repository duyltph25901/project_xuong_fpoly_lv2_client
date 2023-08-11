import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, TouchableWithoutFeedback, Alert, ActivityIndicator, FlatList, TextInput, Keyboard } from 'react-native'
import React, { useState, useRef } from 'react'
import { Color, ConstNumber, ConstString, StyleTemplate, TextStyle } from '../../../../styles/index'
import { useNavigation } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker'

const width = Dimensions.get('window').width

const Customer = () => {
    const navigation = useNavigation()
    const [isLoading, setLoading] = useState(true)
    const [customers, setCustomers] = useState([])
    const flatListRef = useRef(null)
    const [keySearch, setKeySearc] = useState('')
    const [value, setValue] = useState(0)
    const [items, setItems] = useState([
        { title: 'Tất cả', val: 0 },
        { title: 'Hội viên tích cực', val: 1 },
        { title: 'Danh sách đen', val: 2 },
    ])
    const [open, setOpen] = useState(false)

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(true)
            setValue(0)
            getData(`${ConstString.url}${ConstString.action_get_all_customers}`)
            setKeySearc('')
        })

        return unsubscribe
    }, [navigation])

    const getData = async (url) => {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setCustomers(res.customer)
            })
            .catch(err => {
                Alert.alert(ConstString.oops, err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleDeleteCustomer = async (customer) => {
        Alert.alert(ConstString.confirm_delete, `Bạn có muốn xóa ${customer.user_name}?`, [
            {
                text: 'Không',
                style: 'cancel'
            }, {
                text: 'Có',
                onPress: () => {
                    setLoading(true)
                    const url_delete = `${ConstString.url}${ConstString.action_delete_customer}/${customer.id}`
                    fetch(url_delete, {
                        method: 'delete',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res => { return res.json() })
                        .then(res => {
                            const code = res.flag
                            const message = res.message
                            if (code != ConstNumber.code_200) {
                                Alert.alert(ConstString.oops, message)
                            } else {
                                Alert.alert(ConstString.congratulations, message)
                                getData(`${ConstString.url}${ConstString.action_get_all_customers}`)
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

    const onRefresh = React.useCallback(() => {
        setLoading(true)
        setValue(0)
        getData(`${ConstString.url}${ConstString.action_get_all_customers}`)
        setKeySearc('')
    }, [])

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^\+?[0-9]{10,}$/
        return regex.test(phoneNumber)
    }

    const handleSearch = async () => {
        if (!keySearch) {
            Keyboard.dismiss()
        } else {
            Keyboard.dismiss()
            setLoading(true)
            setCustomers([])
            setValue(0)
            if (validateEmail(keySearch)) { // search by email
                const url = `${ConstString.url}${ConstString.action_search_customer_by_email}`
                handleSearchCustomer(url, keySearch)
            } else if (validatePhoneNumber(keySearch)) { // search by phone number
                const url = `${ConstString.url}${ConstString.action_search_customer_by_phone}`
                handleSearchCustomer(url, keySearch)
            } else { // search by name
                const url = `${ConstString.url}${ConstString.action_search_customer_by_name}`
                handleSearchCustomer(url, keySearch)
            }
        }
    }

    const handleSearchCustomer = async (url, key) => {
        const objectSearch = {
            keySearch: key
        }

        fetch(url, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objectSearch)
        })
            .then(res => { return res.json() })
            .then(res => {
                setCustomers(res.customers)
            })
            .catch(err => {
                Alert.alert(ConstString.oops, err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleSelectedItem = (item) => {
        setKeySearc('')
        setLoading(true)
        switch (item.val) {
            case 0: {
                getData(`${ConstString.url}${ConstString.action_get_all_customers}`)
                break
            } case 1: {
                const url = `${ConstString.url}${ConstString.action_get_list_negative}`
                getData(url)
                break
            } default: {
                const url = `${ConstString.url}${ConstString.action_get_black_list_customer}`
                getData(url)
            }
        }
    }

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
                        <SafeAreaView style={[StyleTemplate.container,]}>
                            <View style={[StyleTemplate.containerButtonOutline, { marginTop: 20, paddingHorizontal: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                                <TouchableOpacity onPress={handleSearch}>
                                    <Image source={require('../../../../assets/images/icon_search.png')}
                                        style={{
                                            height: 23,
                                            width: 23,
                                            tintColor: Color.color_primary,
                                            resizeMode: 'cover'
                                        }}
                                    />
                                </TouchableOpacity>
                                <TextInput style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 12,
                                    fontSize: 16
                                }}
                                    value={keySearch}
                                    onChangeText={(text) => setKeySearc(text)}
                                    placeholder='Tìm kiếm khách hàng' />
                                {
                                    keySearch &&
                                    <TouchableOpacity onPress={() => setKeySearc('')}>
                                        <Image source={require('../../../../assets/images/icon_clear.png')}
                                            style={{
                                                height: 23,
                                                width: 23,
                                                tintColor: Color.color_primary,
                                                resizeMode: 'cover'
                                            }}
                                        />
                                    </TouchableOpacity>
                                }
                            </View>

                            <View style={{ flexDirection: 'row', width: width - 20, marginTop: 12, zIndex: 10 }}>
                                <DropDownPicker
                                    placeholder='Sắp xếp'
                                    open={open}
                                    value={value}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    setItems={setItems}
                                    onSelectItem={handleSelectedItem}
                                    schema={{
                                        label: 'title',
                                        value: 'val'
                                    }}
                                    style={{
                                        width: width - 20,
                                    }}
                                />
                            </View>

                            <FlatList style={{ marginTop: 20 }}
                                data={customers}
                                keyExtractor={(item, index) => item.id}
                                numColumns={1}
                                onRefresh={onRefresh}
                                refreshing={false}
                                ref={flatListRef}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity style={styles.containerItem}
                                            onPress={() => {
                                                navigation.navigate(ConstString.details_customer, { item })
                                            }}
                                            onLongPress={() => handleDeleteCustomer(item)}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={{ uri: item.image }}
                                                    style={{
                                                        height: 100,
                                                        width: 70,
                                                        borderRadius: 12,
                                                        borderWidth: 2,
                                                        borderColor: Color.color_primary
                                                    }} />
                                                <View style={{ flex: 1, marginStart: 20, alignItems: 'flex-start', justifyContent: 'center', height: 100, paddingTop: 5 }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={{
                                                            fontSize: 16,
                                                            fontWeight: 'bold',
                                                            color: Color.color_primary,
                                                            marginBottom: 3,
                                                            marginEnd: 7
                                                        }}>{item.user_name}</Text>
                                                        {
                                                            item.gender == 0
                                                                ? (
                                                                    <Image source={require('../../../../assets/images/icon_female.png')}
                                                                        style={{
                                                                            height: 15,
                                                                            width: 15
                                                                        }}
                                                                    />
                                                                )
                                                                : (
                                                                    <Image source={require('../../../../assets/images/icon_male.png')}
                                                                        style={{
                                                                            height: 15,
                                                                            width: 15
                                                                        }}
                                                                    />
                                                                )
                                                        }
                                                    </View>
                                                    <Text style={{
                                                        fontSize: 14,
                                                        color: '#959595',
                                                        fontStyle: 'italic',
                                                        marginBottom: 3
                                                    }}>{item.email}</Text>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginBottom: 7
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 14,
                                                            fontWeight: 'bold',
                                                            fontStyle: 'italic',
                                                            marginEnd: 3,
                                                            color: (item.point <= 30 ? Color.color_enable_fail : Color.color_enable_true)
                                                        }}>{item.point}</Text>
                                                        <Image source={require('../../../../assets/images/icon_starpoint.png')}
                                                            style={{
                                                                height: 15,
                                                                width: 15,
                                                                resizeMode: 'cover'
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }} />
                        </SafeAreaView>
                    )
            }
        </>
    )
}

export default Customer

const styles = StyleSheet.create({
    containerItem: {
        width: width - 20,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Color.color_primary,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
})