import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableWithoutFeedback, Keyboard, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Color, ConstNumber, ConstString, StyleTemplate, TextStyle } from '../../../../styles/index'
import DateTimePicker from '@react-native-community/datetimepicker'
import DropDownPicker from 'react-native-dropdown-picker'

const width = Dimensions.get('window').width

const AddCustomer = () => {

    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [date, setDate] = useState(new Date())
    const [items, setItems] = useState([
        { title: 'Nam', val: 1 },
        { title: 'Nữ', val: 0 },
        { title: 'Khác', val: 2 }
    ])
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(1)
    const [customerName, setCustomerName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [link, setLink] = useState('')
    const [isLoading, setLoading] = useState(false)

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateStart
        setShow(Platform.OS == 'ios')
        setDate(currentDate)
    }

    const handleSelectedItem = (item) => {
        switch (item.val) {
            case 0: {
                setValue(1)
                break
            } case 1: {
                setValue(0)
                break
            } case 2: {
                setValue(2)
                break
            }
        }
    }

    const formartDate = (input) => {
        const date = new Date(input);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);

        return formattedDate
    }

    const isImageUrl = (link) => {
        if (!link) {
            return true
        }

        return link.endsWith(".jpg") || link.endsWith(".jpeg") || link.endsWith(".png") || link.endsWith(".gif")
    }

    const isPhoneNumber = (phoneNumber) => {
        const regex = /^\d{10}$/; // Biểu thức chính quy kiểm tra số điện thoại có 10 chữ số
        return regex.test(phoneNumber)
    }

    const isEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Biểu thức chính quy kiểm tra địa chỉ email
        return regex.test(email);
    }

    const handleDone = async () => {
        const url_add = `${ConstString.url}${ConstString.action_add_customer}`

        if (!customerName || !phoneNumber || !email || !address) {
            Alert.alert(ConstString.oops, ConstString.err_null_input)
            return
        } if (!isImageUrl(link)) {
            Alert.alert(ConstString.oops, ConstString.err_url_is_not_image)
            return
        } if (!isPhoneNumber(phoneNumber)) {
            Alert.alert(ConstString.oops, ConstString.err_phone_number)
            return
        } if (!isEmail(email)) {
            Alert.alert(ConstString.oops, ConstString.err_email)
            return
        }

        console.log(
            `
            \n>>>>> Check Add Customer: 
            Customer name: ${customerName}
            Phone number: ${phoneNumber}
            Email: ${email}
            Date of birth: ${date}
            Countries: ${address}
            Gender: ${value == 1 ? 'Nam' : 'Nữ'}
            Link image: ${link}\n
            `
        )

        setLoading(true)

        const customer = {
            userName: customerName,
            phoneNumber: phoneNumber,
            email: email,
            dob: formartDate(date),
            countries: address,
            gender: value,
            image: !link ? `${ConstString.avatar_default}` : link
        }

        fetch(url_add, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer)
        })
            .then(res => { return res.json() })
            .then(res => {
                const code = res.flag
                const message = res.message
                if (code == ConstNumber.code_200) {
                    Alert.alert(ConstString.congratulations, ConstString.success)
                    clearAllInput()
                } else {
                    Alert.alert(ConstString.oops, message)
                }
            })
            .catch(err => {
                Alert.alert(ConstString.oops, err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const clearAllInput = () => {
        setCustomerName('')
        setPhoneNumber('')
        setEmail('')
        setAddress('')
        setDate(new Date())
        setValue(1)
        setLink('')
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
                        <TouchableWithoutFeedback
                            onPress={() => Keyboard.dismiss()}>
                            <SafeAreaView style={[StyleTemplate.container, styles.container]}>
                                <TextInput style={[StyleTemplate.containerInput, styles.input, { marginTop: 20 }]}
                                    placeholder={ConstString.place_input_customer_name}
                                    keyboardType='default'
                                    value={customerName}
                                    onChangeText={(text) => setCustomerName(text)} />
                                <TextInput style={[StyleTemplate.containerInput, styles.input]}
                                    placeholder={ConstString.place_input_phone_number}
                                    keyboardType='phone-pad'
                                    value={phoneNumber}
                                    onChangeText={(text) => setPhoneNumber(text)} />
                                <TextInput style={[StyleTemplate.containerInput, styles.input]}
                                    placeholder={ConstString.place_input_email}
                                    keyboardType='email-address'
                                    value={email}
                                    onChangeText={(text) => setEmail(text)} />
                                <TextInput style={[StyleTemplate.containerInput, styles.input]}
                                    placeholder={ConstString.palce_input_countries}
                                    keyboardType='default'
                                    value={address}
                                    onChangeText={(text) => setAddress(text)} />
                                <TextInput placeholder={ConstString.place_input_link_image_customer}
                                    style={[StyleTemplate.containerInput, { marginBottom: 15 }]}
                                    value={link}
                                    onChangeText={(text) => setLink(text)} />
                                <View style={[StyleTemplate.containerInput, { marginBottom: 15 }]}>
                                    <Text style={{ flex: 1, }}>Ngày sinh</Text>
                                    <DateTimePicker testID='dateTimePicker'
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        display='default'
                                        onChange={onChange}
                                        locale='vi'
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', width: width - 20, zIndex: 10, marginBottom: 15 }}>
                                    <View style={{ flex: 1 }} />
                                    <DropDownPicker
                                        placeholder='Giới tính'
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


                                <TouchableOpacity style={[StyleTemplate.containerButton]}
                                    onPress={handleDone}>
                                    <Text style={[TextStyle.text_button]}>{ConstString.add}</Text>
                                </TouchableOpacity>

                                <View style={{ flex: 1 }} />
                            </SafeAreaView>
                        </TouchableWithoutFeedback>
                    )
            }
        </>
    )
}

export default AddCustomer

const styles = StyleSheet.create({
    input: {
        marginBottom: 15
    },
    container: {
        paddingVertical: 20
    }
})