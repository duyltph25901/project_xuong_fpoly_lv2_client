import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Alert, TextInput, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color, ConstNumber, ConstString, StyleTemplate, TextStyle } from '../../../../styles/index'
import { useNavigation } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker'
import { DateTime, } from '../../../../controller/index'
import AsyncStorage from '@react-native-async-storage/async-storage'

const width = Dimensions.get('window').width

const UpdateBook = ({ route }) => {
    const navigation = useNavigation()
    const [book, setBook] = useState(route.params.book)
    const [bookNameUpdate, setBookNameUpdate] = useState('')
    const [quantity, setQuantity] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [isLoading, setLoading] = useState(true)
    const [categories, setCategories] = useState([])
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null)
    const [adminCurrent, setAdminCurrent] = useState('')

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

    const getCategories = async () => {
        const url = `${ConstString.url}${ConstString.action_get_all_category}`
        fetch(url)
            .then(response => response.json())
            .then(async (json) => {
                const code = await json.flag

                if (code == ConstNumber.code_200) {
                    setCategories(json.categories)
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

    const isUrl = (link) => { return /^(https?:\/\/)/.test(link) }

    const isImageUrl = (link) => { return link.endsWith(".jpg") || link.endsWith(".jpeg") || link.endsWith(".png") || link.endsWith(".gif") }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setBookNameUpdate(book.name)
            setQuantity(String(book.quantity))
            setImage(book.image)
            setPrice(String(book.price))
            setValue(book.category_id)
            getCategories()
            getAdminCurrent(ConstString.key_admin_current)
        })

        return unsubscribe
    }, [navigation])

    const updateBook = async () => {
        const url = `${ConstString.url}${ConstString.action_update_book}`
        const updatedAt = DateTime.getCurrentDateTime()
        const idAdmin = JSON.parse(JSON.parse(adminCurrent)).id

        // check null input
        if (!bookNameUpdate || !quantity || !image || !price || !value) {
            Alert.alert(ConstString.oops, ConstString.err_null_input)
            return
        } if (price == 0 || quantity == 0) {
            Alert.alert(ConstString.oops, ConstString.err_exeption_number)
            return
        } if (!isUrl(image)) {
            Alert.alert(ConstString.oops, ConstString.err_url_not_formarted)
            return
        } if (!isImageUrl(image)) {
            Alert.alert(ConstString.oops, ConstString.err_url_is_not_image)
            return
        }

        setLoading(true)

        const bookUpdate = {
            name: bookNameUpdate,
            quantity: quantity,
            updated_at: updatedAt,
            image: image,
            price: price,
            id_category: value,
            id: book.id
        }

        console.log(
            `
            \n>>>>> Check Update Book:
            Name: ${bookNameUpdate}
            Quantity: ${quantity}
            Created at: ${book.created_at}
            Updated at: ${updatedAt}
            Image: ${image}
            Price: ${price}
            Id category = ${value}
            Created by: ${idAdmin}
            Id book: ${book.id}\n
            `
        )

        fetch(url, {
            method: 'put',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookUpdate)
        })
            .then(res => { return res.json() })
            .then(res => {
                const code = res.flag
                if (code == ConstNumber.code_200) {
                    Alert.alert(ConstString.success, res.message)
                    for (let i = 0; i < 2; i++) {
                        navigation.goBack()
                    }
                }
            })
            .catch(err => Alert.alert(ConstString.oops, err.message))
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <>
            {
                isLoading
                    ? (
                        <View style={StyleTemplate.container}>
                            <ActivityIndicator />
                        </View>
                    )
                    : (
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <View style={StyleTemplate.container}>
                                <View style={styles.layoutHeader}>
                                    <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <Image source={require('../../../../assets/images/icon_back.png')}
                                            style={styles.icon}
                                        />
                                    </TouchableOpacity>
                                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={styles.textTitle}>Cập nhật sách</Text>
                                    </View>
                                </View>

                                <View style={{ flex: 1, marginTop: 20, flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={[{ flexDirection: 'row', marginBottom: 7 }, StyleTemplate.containerInput]}>
                                        <TextInput style={{ flex: 1 }}
                                            value={bookNameUpdate}
                                            onChangeText={(text) => setBookNameUpdate(text)}
                                            placeholder={ConstString.place_input_book_name}
                                            keyboardType='default' />
                                        {
                                            bookNameUpdate && (<TouchableOpacity onPress={() => setBookNameUpdate('')}>
                                                <Image source={require('../../../../assets/images/icon_clear.png')}
                                                    style={{ width: 30, height: 30, resizeMode: 'cover', tintColor: Color.color_primary }}
                                                />
                                            </TouchableOpacity>)
                                        }
                                    </View>
                                    <View style={[{ flexDirection: 'row', marginBottom: 7 }, StyleTemplate.containerInput]}>
                                        <TextInput style={{ flex: 1 }}
                                            value={quantity}
                                            keyboardType='number-pad'
                                            onChangeText={(text) => setQuantity(text)}
                                            placeholder={ConstString.place_input_quantity_book} />
                                        {
                                            quantity && <TouchableOpacity onPress={() => setQuantity('')}>
                                                <Image source={require('../../../../assets/images/icon_clear.png')}
                                                    style={{ width: 30, height: 30, resizeMode: 'cover', tintColor: Color.color_primary }}
                                                />
                                            </TouchableOpacity>
                                        }
                                    </View>
                                    <View style={[{ flexDirection: 'row', marginBottom: 7 }, StyleTemplate.containerInput]}>
                                        <TextInput style={{ flex: 1 }}
                                            value={image}
                                            keyboardType='url'
                                            placeholder={ConstString.place_input_link_image}
                                            onChangeText={(text) => setImage(text)} />
                                        {
                                            image && (
                                                <TouchableOpacity onPress={() => setImage('')}>
                                                    <Image source={require('../../../../assets/images/icon_clear.png')}
                                                        style={{ width: 30, height: 30, resizeMode: 'cover', tintColor: Color.color_primary }}
                                                    />
                                                </TouchableOpacity>
                                            )
                                        }
                                    </View>
                                    <View style={[{ flexDirection: 'row', marginBottom: 7 }, StyleTemplate.containerInput]}>
                                        <TextInput style={{ flex: 1 }}
                                            value={price}
                                            keyboardType='number-pad'
                                            placeholder={ConstString.place_input_price_book}
                                            onChangeText={(text) => setPrice(text)} />
                                        {
                                            price && (
                                                <TouchableOpacity onPress={() => setPrice('')}>
                                                    <Image source={require('../../../../assets/images/icon_clear.png')}
                                                        style={{ width: 30, height: 30, resizeMode: 'cover', tintColor: Color.color_primary }}
                                                    />
                                                </TouchableOpacity>
                                            )
                                        }
                                    </View>
                                    <DropDownPicker
                                        placeholder='Thể loại'
                                        open={open}
                                        value={value}
                                        items={categories}
                                        setOpen={setOpen}
                                        setValue={setValue}
                                        setItems={setCategories}
                                        schema={{
                                            label: 'name',
                                            value: 'id'
                                        }}
                                        style={{
                                            marginVertical: 7,
                                            width: width - 20
                                        }}
                                    />
                                    <TouchableOpacity style={[StyleTemplate.containerButton]}
                                        onPress={updateBook}>
                                        <Text style={[TextStyle.text_button]}>Lưu thay đổi</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )
            }
        </>
    )
}

export default UpdateBook

const styles = StyleSheet.create({
    icon: {
        height: 23,
        width: 23,
        resizeMode: 'cover'
    },
    textTitle: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        color: Color.color_primary
    },
    layoutHeader: {
        width: width,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
})