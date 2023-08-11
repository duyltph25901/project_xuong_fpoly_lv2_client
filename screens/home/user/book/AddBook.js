import {
    StyleSheet, Text, View, SafeAreaView, TextInput,
    Dimensions, TouchableWithoutFeedback, Keyboard,
    TouchableOpacity, Alert, ActivityIndicator
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import React, { useState, useEffect } from 'react'
import { Color, TextStyle, ConstString, ConstNumber, StyleTemplate, } from '../../../../styles/index'
import { DateTime, Validate } from '../../../../controller/index'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const width = Dimensions.get('window').width

const AddBook = () => {
    const navigation = useNavigation()
    const [bookName, setBookName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [linkImage, setLinkImage] = useState('')
    const [isLoading, setLoading] = useState(true)
    const [price, setPrice] = useState('')
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null)
    const [items, setItems] = useState([])
    const [adminCurrent, setAdminCurrent] = useState('')
    const url = ConstString.url
    const action_add_book = ConstString.action_add_book

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

    const isUrl = (link) => { return /^(https?:\/\/)/.test(link) }

    const isImageUrl = (link) => { return link.endsWith(".jpg") || link.endsWith(".jpeg") || link.endsWith(".png") || link.endsWith(".gif") }

    const getAllCategory = async () => {
        const url = `${ConstString.url}${ConstString.action_get_all_category}`
        fetch(url)
            .then(response => response.json())
            .then(async (json) => {
                const code = await json.flag

                if (code == ConstNumber.code_200) {
                    setItems(json.categories)
                } else {
                    Alert.alert(ConstString.oops, `${ConstString.get_data_fail}`)
                }
            })
            .catch(error => {
                Alert.alert(ConstString.oops, `${error.message}`)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAllCategory()
            getAdminCurrent(ConstString.key_admin_current)
        })

        return unsubscribe
    }, [navigation])

    const handleAddBook = async () => {
        const urlAddBook = `${url}${action_add_book}`
        const createdAt = DateTime.getCurrentDateTime()
        const updatedAt = createdAt
        const idAdmin = JSON.parse(JSON.parse(adminCurrent)).id

        // check null input
        if (!bookName || !quantity || !linkImage || !price || !value) {
            Alert.alert(ConstString.oops, ConstString.err_null_input)
            return
        } if (price == 0 || quantity == 0) {
            Alert.alert(ConstString.oops, ConstString.err_exeption_number)
            return
        } if (!isUrl(linkImage)) {
            Alert.alert(ConstString.oops, ConstString.err_url_not_formarted)
            return
        } if (!isImageUrl(linkImage)) {
            Alert.alert(ConstString.oops, ConstString.err_url_is_not_image)
            return
        }

        const book = {
            name: bookName,
            quantity: quantity,
            created_at: createdAt,
            updated_at: updatedAt,
            image: linkImage,
            price: price,
            id_category: value,
            created_by: idAdmin,
            is_admin: true
        }

        // Alert.alert(JSON.stringify(book))
        console.log(
            `
            \n>>>>> Check Add book:
            Name: ${bookName}
            Quantity: ${quantity}
            Created at: ${createdAt}
            Updated at: ${updatedAt}
            Image: ${linkImage}
            Price: ${price}
            Id category = ${value}
            Created by: ${idAdmin}\n
            `
        )

        setLoading(true)

        fetch(urlAddBook, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book)
        })
            .then(res => { return res.json() })
            .then(data => {
                const code = data.flag
                const message = data.message

                if (code == 200) {
                    Alert.alert(ConstString.success, message)
                    clearInput()
                }
            })
            .catch(err => {
                Alert.alert(ConstString.oops, err.message)
            })
            .finally(() => setLoading(false))
    }

    const clearInput = () => {
        setBookName('')
        setQuantity('')
        setLinkImage('')
        setPrice('')
        setValue(null)
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
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <SafeAreaView style={StyleTemplate.container}>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <View style={[StyleTemplate.containerInput, { marginVertical: 12 }]}>
                                        <TextInput style={[{ flex: 1, marginHorizontal: 12 }, TextStyle.input]}
                                            placeholder={ConstString.place_input_book_name}
                                            value={bookName}
                                            onChangeText={(text) => setBookName(text)}
                                            keyboardType='default' />
                                    </View>
                                    <View style={[StyleTemplate.containerInput,]}>
                                        <TextInput style={[{ flex: 1, marginHorizontal: 12 }, TextStyle.input]}
                                            placeholder={ConstString.place_input_quantity_book}
                                            value={quantity}
                                            onChangeText={(text) => setQuantity(Number(text))}
                                            keyboardType='number-pad' />
                                    </View>
                                    <View style={[StyleTemplate.containerInput, { marginVertical: 12 }]}>
                                        <TextInput style={[{ flex: 1, marginHorizontal: 12 }, TextStyle.input]}
                                            placeholder={ConstString.place_input_link_image}
                                            value={linkImage}
                                            onChangeText={(text) => setLinkImage(text)}
                                            keyboardType='url' />
                                    </View>
                                    <View style={[StyleTemplate.containerInput,]}>
                                        <TextInput style={[{ flex: 1, marginHorizontal: 12 }, TextStyle.input]}
                                            placeholder={ConstString.place_input_price_book}
                                            value={price}
                                            onChangeText={(text) => setPrice(Number(text))}
                                            keyboardType='number-pad' />
                                    </View>
                                    <View style={{
                                        width: width - 20,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        zIndex: 100
                                    }}>
                                        <DropDownPicker
                                            placeholder='Thể loại'
                                            open={open}
                                            value={value}
                                            items={items}
                                            setOpen={setOpen}
                                            setValue={setValue}
                                            setItems={setItems}
                                            schema={{
                                                label: 'name',
                                                value: 'id'
                                            }}
                                            style={{
                                                marginVertical: 12,
                                                width: width - 20
                                            }}
                                        />
                                    </View>
                                    <TouchableOpacity style={[StyleTemplate.containerButtonOutline]}
                                        onPress={handleAddBook}>
                                        <Text style={[TextStyle.text_button_outline]}>Thêm sách</Text>
                                    </TouchableOpacity>
                                </View>
                            </SafeAreaView>
                        </TouchableWithoutFeedback>
                    )
            }
        </>
    )
}

export default AddBook

const styles = StyleSheet.create({})