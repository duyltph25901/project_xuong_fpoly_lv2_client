import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, FlatList, Alert, ActivityIndicator, Image, TextInput } from 'react-native'
import React, { useState, useRef } from 'react'
import { Color, ConstNumber, ConstString, StyleTemplate, TextStyle } from '../../../../styles/index'
import { useNavigation } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker'

const width = Dimensions.get('window').width

const Loan = () => {
    const navigation = useNavigation()
    const [loans, setLoans] = useState([])
    const [isLoading, setLoading] = useState(false)
    const flatListRef = useRef(null)
    const [items, setItems] = useState([
        { title: 'Tất cả', val: 0 },
        { title: 'Đã trả', val: 1 },
        { title: 'Chưa trả', val: 2 },
    ])
    const [value, setValue] = useState(2)
    const [open, setOpen] = useState(false)
    const [keySearch, setKeySearch] = useState('')

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData(`${ConstString.url}${ConstString.action_filter_loan_not_pay}`)
            setKeySearch('')
        })

        return unsubscribe
    }, [navigation])

    const getData = async (url) => {
        setLoading(true)
        fetch(url)
            .then(res => { return res.json() })
            .then(res => {
                setLoans(res.loans)
            })
            .catch(err => {
                Alert.alert(ConstString.oops, err.messsage)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const compareDateWithToday = (dateStr) => {
        const inputDate = new Date(dateStr.split('/').reverse().join('-'))
        const today = new Date()

        if (inputDate < today) {
            return -1
        } else {
            return 1
        }
    }

    const handlePayBook = async (item) => {
        const isLate = (compareDateWithToday(item.pay_day) == 1) ? false : true
        const message = isLate ? `Trả sách muộn, '${item.customer_name}' sẽ bị trừ 1 điểm uy tín!` : 'Bạn có muốn thực hiện trả sách?'
        const title = isLate ? 'Xác nhận trả sách muộn' : 'Xác nhận trả sách'

        Alert.alert(title, message, [
            {
                text: 'Không',
                style: 'cancel'
            },
            {
                text: 'Có',
                onPress: async () => {
                    const url = `${ConstString.url}${ConstString.action_pay_book}`
                    const objectPost = {
                        id_book: item.id_book,
                        id_loan: item.id,
                        is_late: isLate,
                        id_customer: item.id_customer
                    }

                    setLoading(true)
                    fetch(url, {
                        method: 'put',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(objectPost)
                    })
                        .then(res => { return res.json() })
                        .then(res => {
                            const code = res.flag
                            if (code != ConstNumber.code_200) {
                                Alert.alert(ConstString.oops, res.messsage)
                            } else {
                                Alert.alert(ConstString.congratulations, res.messsage)
                                setValue(2)
                                getData(`${ConstString.url}${ConstString.action_filter_loan_not_pay}`)
                            }
                        })
                        .catch(err => {
                            Alert.alert(ConstString.oops, err.messsage)
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
        getData(`${ConstString.url}${ConstString.action_get_loans}`)
        setValue(0)
        setKeySearch('')
    }, [])

    const handleSelectedItem = (item) => {
        setKeySearch('')
        switch (item.val) {
            case 0: {
                getData(`${ConstString.url}${ConstString.action_get_loans}`)
                break
            } case 1: {
                getData(`${ConstString.url}${ConstString.action_filter_loan_payed}`)
                break
            } default: {
                getData(`${ConstString.url}${ConstString.action_filter_loan_not_pay}`)
                break
            }
        }
    }

    const handleSearch = async () => {
        if (!keySearch) {
            return
        } else {
            setValue(2)
            setLoading(true)
            const url = `${ConstString.url}${ConstString.action_search_loan_by_customer_name}/${keySearch}`
            fetch(url)
                .then(res => { return res.json() })
                .then(res => {
                    setLoans([])
                    setLoans(res.loans)
                })
                .catch(err => {
                    Alert.alert(ConstString.oops, err.message)
                })
                .finally(() => {
                    setLoading(false)
                })
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
                        <SafeAreaView style={[StyleTemplate.container]}>
                            <View style={{
                                width: width - 20,
                                marginTop: 15,
                                zIndex: 100
                            }}>
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

                            <View style={[StyleTemplate.containerInput, {
                                marginTop: 10,
                                height: 50,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }]}>
                                <TouchableOpacity onPress={handleSearch}>
                                    <Image source={require('../../../../assets/images/icon_search.png')}
                                        style={{
                                            height: 23,
                                            width: 23,
                                            resizeMode: 'cover',
                                            marginEnd: 12,
                                            tintColor: Color.color_primary
                                        }}
                                    />
                                </TouchableOpacity>
                                <TextInput style={{ flex: 1, fontSize: 16, color: 'black', fontWeight: '400' }}
                                    placeholder='Tìm kiếm phiếu theo tên'
                                    value={keySearch}
                                    onChangeText={(text) => setKeySearch(text)} />
                                {
                                    keySearch &&
                                    <TouchableOpacity onPress={() => setKeySearch('')}>
                                        <Image source={require('../../../../assets/images/icon_clear.png')}
                                            style={{
                                                height: 23,
                                                width: 23,
                                                resizeMode: 'cover',
                                                marginStart: 12,
                                                tintColor: Color.color_primary
                                            }}
                                        />
                                    </TouchableOpacity>
                                }
                            </View>
                            <FlatList style={{ marginTop: 20, flex: 1 }}
                                data={loans}
                                keyExtractor={(item, index) => { item.id }}
                                onRefresh={onRefresh}
                                refreshing={false}
                                ref={flatListRef}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{
                                            width: width - 20,
                                            padding: 12,
                                            borderWidth: 1,
                                            borderColor: Color.color_primary,
                                            borderRadius: 21,
                                            marginBottom: 20,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <View style={{ flexDirection: 'row', width: width - 30, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: Color.color_primary, marginBottom: 7, flex: 1, textAlign: 'center' }}>VigroLib</Text>
                                                {
                                                    item.status == 0
                                                        ? (
                                                            <TouchableOpacity onPress={() => handlePayBook(item)}>
                                                                <Image source={require('../../../../assets/images/icon_done.png')}
                                                                    style={{
                                                                        height: 25,
                                                                        width: 25
                                                                    }}
                                                                />
                                                            </TouchableOpacity>
                                                        )
                                                        : null
                                                }
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', marginBottom: 14 }}>
                                                <Text style={{ fontSize: 13 }}>Người tạo đơn: </Text>
                                                <Text style={{ fontSize: 14, fontStyle: 'italic', textDecorationLine: 'underline', fontWeight: '400', color: Color.color_primary }}>{item.user_name_admin}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginBottom: 7 }}>
                                                <Text>No: {item.id}</Text>
                                                <View style={{ flex: 1 }} />
                                            </View>
                                            <View style={{ flexDirection: 'row', marginBottom: 7 }}>
                                                <Text>Ngày tạo đơn: {item.created_at}</Text>
                                                <View style={{ flex: 1 }} />
                                            </View>
                                            <View style={{ flexDirection: 'row', marginBottom: 7 }}>
                                                <Text>Ngày hẹn trả: {item.pay_day}</Text>
                                                <View style={{ flex: 1 }} />
                                            </View>
                                            <View style={{ flexDirection: 'row', marginBottom: 7 }}>
                                                <Text>Người thuê sách: {item.customer_name}</Text>
                                                <View style={{ flex: 1 }} />
                                            </View>
                                            <View style={{ width: width - 30, height: 1, backgroundColor: Color.color_primary, marginVertical: 14 }} />
                                            <View style={{ flexDirection: 'row', marginBottom: 7 }}>
                                                <Text>Tên sách: </Text>
                                                <Text style={{ fontSize: 14, fontWeight: '500', fontStyle: 'italic', textDecorationLine: 'underline', color: Color.color_primary }}>{
                                                    String(item.book_name).length >= 35 ? `${String(item.book_name).slice(0, 35)}...` : String(item.book_name)
                                                }</Text>
                                                <View style={{ flex: 1 }} />
                                            </View>
                                            <View style={{ flexDirection: 'row', marginBottom: 7 }}>
                                                <Text>Giá thuê: </Text>
                                                <Text style={{ fontSize: 14, fontWeight: '500', fontStyle: 'italic', textDecorationLine: 'underline', color: Color.color_enable_true }}>{Number(item.book_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                                                <View style={{ flex: 1 }} />
                                            </View>
                                            <View style={{ flexDirection: 'row', marginBottom: 7 }}>
                                                <Text>Số lượng: 1</Text>
                                                <View style={{ flex: 1 }} />
                                            </View>
                                            <View style={{ flexDirection: 'row', marginBottom: 7 }}>
                                                <Text>Giảm giá: </Text>
                                                <Text style={{ fontSize: 14, fontWeight: '500', color: 'red', textDecorationLine: 'underline', fontStyle: 'italic' }}>-{item.value_discount}%</Text>
                                                <View style={{ flex: 1 }} />
                                            </View>
                                            <Text style={{
                                                marginVertical: 14,
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                                color: 'red'
                                            }}>Thành tiền: {Number(item.end_price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                                        </View>
                                    )
                                }} />
                        </SafeAreaView>
                    )
            }
        </>
    )
}

export default Loan

const styles = StyleSheet.create({})