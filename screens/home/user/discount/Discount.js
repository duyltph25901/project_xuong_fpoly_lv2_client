import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Color, ConstNumber, ConstString, StyleTemplate, TextStyle } from '../../../../styles/index'
import DropDownPicker from 'react-native-dropdown-picker'
import { format } from 'date-fns'

const width = Dimensions.get('window').width

const Discount = () => {
    const navigation = useNavigation()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null)
    const [items, setItems] = useState([
        { title: 'Tất cả', val: 0 },
        { title: 'Lượt áp dụng tăng dần', val: 1 },
        { title: 'Lượt áp dụng giảm dần', val: 2 },
        { title: 'Khả dụng', val: 3 },
        { title: 'Không khả dụng', val: 4 },
    ])
    const [discounts, setDiscounts] = useState([])
    const [isLoading, setLoading] = useState(true)
    const flatListRef = useRef(null)

    const getDiscounts = async () => {
        const url = `${ConstString.url}${ConstString.action_get_discount}`
        fetch(url)
            .then(res => { return res.json() })
            .then(res => {
                setDiscounts(res.discounts)
            })
            .catch(err => Alert.alert(ConstString.oops, err.message))
            .finally(() => {
                setLoading(false)
            })
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getEnableDisount()
            setValue(3)
        })

        return unsubscribe
    }, [navigation])

    const sortUsageIncrease = () => { setDiscounts(discounts.sort((a, b) => b.times - a.times)) }

    const sortUsageReduce = () => { setDiscounts(discounts.sort((a, b) => a.times - b.times)) }

    const getEnableDisount = async () => {
        setLoading(true)
        setDiscounts([])
        const url = `${ConstString.url}${ConstString.action_get_discount_enable}`
        fetch(url)
            .then(res => { return res.json() })
            .then(res => {
                setDiscounts(res.discounts)
            })
            .catch(err => {
                Alert.alert(ConstString.oops, err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const getDisableDiscount = async () => {
        setLoading(true)
        setDiscounts([])
        const url = `${ConstString.url}${ConstString.action_get_discount_disable}`
        fetch(url)
            .then(res => { return res.json() })
            .then(res => {
                setDiscounts(res.discounts)
            })
            .catch(err => {
                Alert.alert(ConstString.oops, err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleSelectedItem = (item) => {
        switch (item.val) {
            case 0: {
                setLoading(true)
                getDiscounts()
                break
            } case 1: {
                sortUsageReduce()
                break
            } case 2: {
                sortUsageIncrease()
                break
            } case 3: {
                getEnableDisount()
                break
            } case 4: {
                getDisableDiscount()
                break
            }
        }
    }

    const onRefresh = React.useCallback(() => {
        setLoading(true)
        getDiscounts()
    }, [])

    return (
        <>
            {
                isLoading
                    ? (
                        <View style={[StyleTemplate.container]}>
                            <ActivityIndicator />
                        </View>
                    )
                    : (
                        <View style={[StyleTemplate.container]}>
                            <View style={{ flexDirection: 'row', width: width - 20, marginTop: 12, zIndex: 10 }}>
                                <DropDownPicker
                                    placeholder='Sắp xếp/Lọc'
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

                            <View style={{ flex: 1, width: width, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <FlatList data={discounts}
                                    refreshing={false}
                                    ref={flatListRef}
                                    onRefresh={onRefresh}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({ item, index, separators }) => {
                                        return (
                                            <View style={[
                                                styles.containerItem]}>
                                                <Text style={{ fontSize: 16, fontWeight: '500', color: Color.color_primary }}>{(index + 1)}.</Text>
                                                <View style={{ flex: 1, flexDirection: 'column', marginStart: 12 }}>
                                                    <Text style={{ color: Color.color_primary, fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline', fontStyle: 'italic', marginBottom: 7 }}>{item.code}</Text>
                                                    <Text style={{ fontSize: 16, color: 'black', fontWeight: '300', marginBottom: 7 }}>Lượt dùng: <Text style={{ fontWeight: 'bold', color: Color.color_primary }}>{item.times}</Text></Text>
                                                    <Text style={{ fontSize: 16, fontWeight: '300', color: 'black', marginBottom: 7 }}>Giá trị giảm: <Text style={{ fontWeight: 'bold', color: Color.color_primary }}>{item.value_discount}%</Text></Text>
                                                    <Text style={{ fontSize: 16, fontWeight: '300', color: 'black' }}>Thời hạn: <Text style={{ fontStyle: 'italic', fontSize: 14, textDecorationLine: 'underline', color: Color.color_primary }}>{item.time_start} - {item.time_end}</Text></Text>
                                                </View>
                                                <View style={{ flexDirection: 'column' }}>
                                                    {/* <TouchableOpacity style={{ height: 30, width: 30, marginBottom: 10 }}>
                                                            <Image source={require('../../../../assets/images/icon_edit.png')}
                                                                style={{ height: 30, width: 30, resizeMode: 'cover' }}
                                                            />
                                                        </TouchableOpacity> */}
                                                    {/* <TouchableOpacity style={{ height: 30, width: 30, marginBottom: 10 }}>
                                                            <Image source={require('../../../../assets/images/icon_trash.png')}
                                                                style={{ height: 30, width: 30, resizeMode: 'cover' }}
                                                            />
                                                        </TouchableOpacity> */}
                                                </View>
                                            </View>
                                        )
                                    }} />
                            </View>
                        </View>
                    )
            }
        </>
    )
}

export default Discount

const styles = StyleSheet.create({
    containerItem: {
        width: width - 20,
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Color.color_primary,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boderWarning: {
        borderColor: Color.color_warning_yellow,
    },
    boderEnableFail: {
        borderColor: Color.color_enable_fail,
    },
    boderEnableTrue: {
        borderColor: Color.color_enable_true,
    },
})