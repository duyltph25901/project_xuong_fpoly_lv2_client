import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, TextInput, Alert, Image, ActivityIndicator, } from 'react-native'
import React, { useState, } from 'react'
import { Color, ConstNumber, ConstString, StyleTemplate, TextStyle } from '../../../../styles/index'
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker'
import DropDownPicker from 'react-native-dropdown-picker'

const width = Dimensions.get('window').width

const EditCustomer = ({ route }) => {

    const navigation = useNavigation()
    const [customerDefault, setCustomerDefault] = useState(route.params.item)
    const [isLoading, setLoading] = useState(true)
    const [customerName, setCustomerName] = useState(customerDefault.user_name)
    const [phoneNumber, setPhoneNumber] = useState(customerDefault.phone_number)
    const [email, setEmail] = useState(customerDefault.email)
    const [address, setAddress] = useState(customerDefault.countries)
    const [gender, setGender] = useState(customerDefault.gender)
    const [linkImage, setLinkImage] = useState(customerDefault.image == ConstString.avatar_default ? '' : customerDefault.image)
    const [mode, setMode] = useState('date')
    const [date, setDate] = useState(new Date())
    const [items, setItems] = useState([
        { title: 'Nam', val: 1 },
        { title: 'Nữ', val: 0 },
        { title: 'Khác', val: 2 }
    ])
    const [open, setOpen] = useState(false)

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            searchCustomerByID()
        })

        return unsubscribe
    }, [navigation])

    const searchCustomerByID = async () => {
        const url_search = `${ConstString.url}${ConstString.action_search_customer_by_id}/${customerDefault.id}`
        fetch(url_search)
            .then(res => { return res.json() })
            .then(res => {
                const objectCurrent = res.object_current
                if (objectCurrent) {
                    setDate(convertDateTimeToDatePickerDialog(objectCurrent.dob))
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

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateStart
        setDate(currentDate)
    }

    const handleSelectedItem = (item) => {
        switch (item.val) {
            case 0: {
                setGender(1)
                break
            } case 1: {
                setGender(0)
                break
            } case 2: {
                setGender(2)
                break
            }
        }
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

    const convertDateTimeToDatePickerDialog = (dateString) => {
        const parts = String(dateString).split('/')
        const day = parts[0]
        const month = parts[1] - 1
        const year = parts[2]
        const date = new Date(year, month, day, 0, 0, 0, 0)
        const formattedDate = date.toString()
        console.log(
            `
            \n>>>>> Check date after formatted: ${formattedDate}\n
            `
        )

        return new Date(formattedDate)
    }

    const convertDateTimeToUSATime = (input) => {
        const date = new Date(input);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);

        return formattedDate
    }

    const handleDone = async () => {
        const dateFomat = convertDateTimeToUSATime(date)
        const url_update = `${ConstString.url}${ConstString.action_update_customer}`

        if (!customerName || !phoneNumber || !email || !address) {
            Alert.alert(ConstString.oops, ConstString.err_null_input)
            return
        } if (!isPhoneNumber(phoneNumber)) {
            Alert.alert(ConstString.oops, ConstString.err_phone_number)
            return
        } if (!isEmail(email)) {
            Alert.alert(ConstString.oops, ConstString.err_email)
            return
        } if (!isImageUrl(linkImage)) {
            Alert.alert(ConstString.oops, ConstString.err_url_is_not_image)
            return
        }

        setLoading(true)

        console.log(
            `
            \n>>>>> Check Update Customer: 
            Customer name: ${customerName}
            Phone number: ${phoneNumber}
            Email: ${email}
            Address: ${address}
            Link image: ${linkImage}
            Date of birth: ${dateFomat}
            Gender: ${gender == 1 ? 'Male' : (gender == 0 ? 'Female' : 'Other')}\n
            `
        )

        const objectUpdate = {
            userName: String(customerName).trim(),
            phoneNumber: String(phoneNumber).trim(),
            email: String(email).trim(),
            dob: String(dateFomat).trim(),
            countries: String(address).trim(),
            gender: gender,
            id: String(customerDefault.id).trim()
        }

        fetch(url_update, {
            method: 'put',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objectUpdate)
        })
            .then(res => { return res.json() })
            .then(res => {
                const code = res.flag
                const message = res.message

                if (code != ConstNumber.code_200) {
                    Alert.alert(ConstString.oops, message)
                } else {
                    Alert.alert(ConstString.congratulations, 'Cập nhật thành công!')
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
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 12,
                                marginTop: 8,
                                marginBottom: 10
                            }}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}>
                                    <Image source={require('../../../../assets/images/icon_back.png')}
                                        style={{
                                            height: 23,
                                            width: 23
                                        }}
                                    />
                                </TouchableOpacity>
                                <Text style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: Color.color_primary
                                }}>Cập nhật khách hàng</Text>

                                <TouchableOpacity
                                    onPress={() => handleDone()}>
                                    <Image source={require('../../../../assets/images/icon_done.png')}
                                        style={{
                                            height: 25,
                                            width: 25
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>

                            <TextInput style={[StyleTemplate.containerInput, styles.containerInput]}
                                placeholder={ConstString.place_input_customer_name}
                                keyboardType='default'
                                value={customerName}
                                onChangeText={(text) => setCustomerName(text)} />
                            <TextInput style={[StyleTemplate.containerInput, styles.containerInput]}
                                placeholder={ConstString.place_input_phone_number}
                                keyboardType='phone-pad'
                                value={phoneNumber}
                                onChangeText={(text) => setPhoneNumber(text)} />
                            <TextInput style={[StyleTemplate.containerInput, styles.containerInput]}
                                placeholder={ConstString.place_input_email}
                                keyboardType='email-address'
                                value={email}
                                onChangeText={(text) => setEmail(text)} />
                            <TextInput style={[StyleTemplate.containerInput, styles.containerInput]}
                                placeholder={ConstString.palce_input_countries}
                                keyboardType='default'
                                value={address}
                                onChangeText={(text) => setAddress(text)} />
                            <TextInput style={[StyleTemplate.containerInput, styles.containerInput]}
                                placeholder={ConstString.place_input_link_image_customer}
                                keyboardType='default'
                                value={linkImage}
                                onChangeText={(text) => setLinkImage(text)} />
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
                            <View style={{ flexDirection: 'row', width: width - 20, zIndex: 10, }}>
                                <DropDownPicker
                                    placeholder='Giới tính'
                                    open={open}
                                    value={gender}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setGender}
                                    setItems={setItems}
                                    onSelectItem={handleSelectedItem}
                                    schema={{
                                        label: 'title',
                                        value: 'val'
                                    }}
                                    style={{
                                        width: 100,
                                    }}
                                />
                            </View>

                            <View style={{ flex: 1 }} />
                        </SafeAreaView>
                    )
            }
        </>
    )
}

export default EditCustomer

const styles = StyleSheet.create({
    containerInput: {
        marginBottom: 15
    }
})