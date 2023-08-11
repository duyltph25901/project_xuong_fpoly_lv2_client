import { StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Dimensions, Image, TextInput, Platform, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Color, ConstNumber, ConstString, StyleTemplate, TextStyle } from '../../../../styles/index'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'
import { DateTime } from '../../../../controller/index'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import Ionic from 'react-native-vector-icons/Ionicons'

const width = Dimensions.get('window').width

const AddDiscount = () => {
    const [code, setCode] = useState('')
    const [value, setValue] = useState('')
    const [dateStart, setDateStart] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [adminCurrent, setAdminCurrent] = useState('')
    const [isLoading, setLoading] = useState(false)
    const navigation = useNavigation()

    const getAdminCurrent = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null) {
                console.log('Value retrieved successfully:', value)
                setAdminCurrent(value)
            } else {
                console.log('No data found for this key')
            }
        } catch (e) {
            console.log('Error retrieving data: ' + e)
        }
    }

    const onChangeStart = (event, selectedDate) => {
        const currentDate = selectedDate || dateStart
        setShow(Platform.OS == 'ios')
        setDateStart(currentDate)
    }

    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || dateEnd
        setShow(Platform.OS == 'ios')
        setDateEnd(currentDate)
    }

    const compareToDate = (dateStart, dateEnd) => {
        const date1 = new Date(dateStart.split('/').reverse().join('-'));
        const date2 = new Date(dateEnd.split('/').reverse().join('-'));

        return (date1 > date2)
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAdminCurrent(ConstString.key_admin_current)
        })

        return unsubscribe
    }, [navigation])

    const handleAdd = async () => {
        const url = `${ConstString.url}${ConstString.action_add_discount}`
        const timeStart = format(dateStart, 'dd/MM/yyyy')
        const timeEnd = format(dateEnd, 'dd/MM/yyyy')
        const createdAt = DateTime.getCurrentDateTime()
        const idAdmin = await JSON.parse(JSON.parse(adminCurrent)).id
        const isAdmin = true

        if (!code || !value) {
            Alert.alert(ConstString.oops, ConstString.err_null_input)
            return
        } if (Number(value) <= 0 || Number(value) >= 100) {
            Alert.alert(ConstString.oops, ConstString.err_input_value_discount)
            return
        } if (timeStart == timeEnd) {
            Alert.alert(ConstString.oops, ConstString.err_date_value)
            return
        } if (compareToDate(timeStart, timeEnd)) {
            Alert.alert(ConstString.oops, ConstString.err_date_value)
            return
        }

        setLoading(true)

        console.log(
            `
            \n>>>>> Check Add Discount: 
            Code: ${code}
            Value: ${value}%
            Time start: ${timeStart}
            Time end: ${timeEnd}
            Id admin: ${idAdmin}
            Created at: ${createdAt}\n
            `
        )

        const discount = {
            code: code,
            value: value,
            timeStart: timeStart,
            timeEnd: timeEnd,
            createdAt: createdAt,
            idAdmin: idAdmin,
            isAdmin: isAdmin
        }

        fetch(url, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(discount)
        })
            .then(res => { return res.json() })
            .then(res => {
                const code = res.flag
                if (code == ConstNumber.code_200) {
                    Alert.alert(ConstString.success, res.message)
                    clearInput()
                }
            })
            .catch(err => Alert.alert(ConstString.oops, err.message))
            .finally(() => { setLoading(false) })
    }

    const clearInput = () => {
        setValue('')
        setCode('')
        setDateEnd(new Date())
        setDateStart(new Date())
    }

    const generateDiscountCode = (inputString) => {
        // Chuyển đổi input thành một chuỗi ASCII
        const inputAscii = inputString.split('').map((char) => char.charCodeAt(0)).join('');

        // Tạo một chuỗi ngẫu nhiên có độ dài 5 ký tự
        const randomString = Array.from({ length: 5 }, () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            return characters.charAt(Math.floor(Math.random() * characters.length));
        }).join('');

        // Kết hợp chuỗi ngẫu nhiên với chuỗi ASCII của input và thêm một số ngẫu nhiên vào cuối cùng
        const discountCode = `${randomString}${inputAscii}${Math.floor(Math.random() * 10)}`;

        setCode(String(discountCode).slice(0, 7))
    }

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
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <View style={[StyleTemplate.container]}>
                                <View style={styles.layoutHeader}>
                                    <Text style={styles.textTitle}>Thêm mã giảm giá</Text>
                                    <View style={{ flexDirection: "row", width: width, justifyContent: 'center', alignItems: 'center' }}>
                                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                                            <View style={[StyleTemplate.containerInput, { marginBottom: 10 }]}>
                                                <TextInput style={{ flex: 1, fontSize: 16 }}
                                                    placeholder={ConstString.place_input_code_discount}
                                                    value={code}
                                                    onChangeText={(text) => setCode(text)}
                                                    keyboardType='default' />
                                                <TouchableOpacity onPress={() => generateDiscountCode("virgolib")}>
                                                    <Ionic name='reload-circle-sharp' size={25} color={Color.color_primary} />
                                                </TouchableOpacity>
                                                {
                                                    code && <TouchableOpacity onPress={() => setCode('')}>
                                                        <Image source={require('../../../../assets/images/icon_clear.png')}
                                                            style={{ height: 30, width: 30, resizeMode: 'cover', tintColor: Color.color_primary }} />
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                            <View style={[StyleTemplate.containerInput, { marginBottom: 10 }]}>
                                                <TextInput style={{ flex: 1, fontSize: 16 }}
                                                    placeholder={ConstString.place_input_value_discount}
                                                    value={value}
                                                    onChangeText={(text) => setValue(text)}
                                                    keyboardType='number-pad' />
                                                {
                                                    value && <TouchableOpacity onPress={() => setValue('')}>
                                                        <Image source={require('../../../../assets/images/icon_clear.png')}
                                                            style={{ height: 30, width: 30, resizeMode: 'cover', tintColor: Color.color_primary }} />
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                            <View style={[StyleTemplate.containerInput, { marginBottom: 10 }]}>
                                                <Text style={{ flex: 1 }}>Thời gian bắt đầu</Text>
                                                <DateTimePicker testID='dateTimePicker'
                                                    value={dateStart}
                                                    mode={mode}
                                                    is24Hour={true}
                                                    display='default'
                                                    onChange={onChangeStart}
                                                    locale="vi"
                                                />
                                            </View>
                                            <View style={[StyleTemplate.containerInput, { marginBottom: 10 }]}>
                                                <Text style={{ flex: 1 }}>Thời gian kết thúc</Text>
                                                <DateTimePicker testID='dateTimePicker'
                                                    value={dateEnd}
                                                    mode={mode}
                                                    is24Hour={true}
                                                    display='default'
                                                    onChange={onChangeEnd}
                                                    locale='vi'
                                                />
                                            </View>
                                            <TouchableOpacity style={[StyleTemplate.containerButton]}
                                                onPress={handleAdd}>
                                                <Text style={[TextStyle.text_button]}>Thêm</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 1, paddingTop: 12, flexDirection: 'column', width: width, }} />
                            </View>
                        </TouchableWithoutFeedback>
                    )
            }
        </>
    )
}

export default AddDiscount

const styles = StyleSheet.create({
    layoutHeader: {
        width: width,
    },
    textTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: Color.color_primary,
        margin: 12
    }
})