import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image, FlatList, ActivityIndicator, Dimensions, Alert } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Color, ConstNumber, ConstString, StyleTemplate, TextStyle } from '../../../../styles/index'
import { useNavigation } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker'

const width = Dimensions.get('window').width

const Book = () => {
    const navigation = useNavigation()
    const [books, setBooks] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [keySearch, setKeySearch] = useState('')
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(null)
    const [items, setItems] = useState([
        { title: 'Mặc định', val: 0 },
        { title: 'Lượt mua tăng dần', val: 1 },
        { title: 'Lượt mua giảm dần', val: 2 },
        { title: 'Tồn kho tăng dần', val: 3 },
        { title: 'Tồn kho giảm dần', val: 4 },
    ])
    const flatListRef = useRef(null)

    const getData = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(res => {
                const code = res.flag

                if (code == ConstNumber.code_200) {
                    setBooks(res.books)
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
            getData(`${ConstString.url}${ConstString.action_get_book}`)
            setKeySearch('')
            setValue(0)
        })

        return unsubscribe
    }, [navigation])

    const getDate = (time) => { return String(time).slice(0, 11) }

    const handleSelectedItem = (item) => {
        switch (item.val) {
            case 0: {
                getData(`${ConstString.url}${ConstString.action_get_book}`)
                break
            } case 1: {
                getData(`${ConstString.url}${ConstString.action_sort_book_purchases_asc}`)
                break
            } case 2: {
                getData(`${ConstString.url}${ConstString.action_sort_book_purchases_desc}`)
                break
            } case 3: {
                getData(`${ConstString.url}${ConstString.action_sort_book_quantity_asc}`)
                break
            } default: {
                getData(`${ConstString.url}${ConstString.action_sort_book_quantity_desc}`)
                break
            }
        }
    }

    const handleSearchBook = async () => {
        if (!keySearch) {
            getData
        } else {
            setLoading(true)

            const url = `${ConstString.url}${ConstString.action_search_book_by_name}`
            setKeySearch(String(keySearch).trim())
            const objectSearch = {
                keySearch: keySearch
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
                .then(data => {
                    const code = data.flag
                    const books = data.books

                    setBooks(books)
                })
                .catch(err => Alert.alert(ConstString.oops, err.message))
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    const deleteBook = (book) => {
        Alert.alert(ConstString.confirm_delete, `Bạn có muốn xóa '${book.name}?'`, [
            {
                text: 'Không',
                style: 'cancel'
            },
            {
                text: 'Có',
                onPress: async () => {
                    setLoading(true)
                    const url = `${ConstString.url}${ConstString.action_delete_book}/${book.id}`
                    fetch(url, {
                        method: 'delete',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(res => res.json())
                        .then(res => {
                            const code = res.flag
                            if (code == ConstNumber.code_200) {
                                Alert.alert(ConstString.success, res.message)
                            } else {
                                Alert.alert(ConstString.oops, res.message)
                            }
                        })
                        .catch(err => Alert.alert(ConstString.oops, err.message))
                        .finally(() => {
                            setLoading(false)
                        })
                }
            }
        ])
    }

    const onRefresh = React.useCallback(() => {
        setLoading(true)
        getData(`${ConstString.url}${ConstString.action_get_book}`)
    }, [])

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
                        <TouchableWithoutFeedback onPress={() => {
                            Keyboard.dismiss()
                            setOpen(false)
                        }}>
                            <SafeAreaView style={StyleTemplate.container}>
                                <View style={[StyleTemplate.containerSearchOutline, { flexDirection: 'row', marginTop: 12 }]}>
                                    <TouchableOpacity onPress={handleSearchBook}>
                                        <Image source={require('../../../../assets/images/icon_search.png')}
                                            style={[StyleTemplate.iconInput]} />
                                    </TouchableOpacity>
                                    <TextInput style={{ flex: 1, marginHorizontal: 12, fontSize: 16, fontWeight: '500', color: Color.color_black }}
                                        placeholder={ConstString.place_input_search_book}
                                        value={keySearch}
                                        onChangeText={(text) => setKeySearch(text)} />
                                    {
                                        keySearch
                                            ? (
                                                <TouchableOpacity onPress={() => setKeySearch('')}>
                                                    <Image source={require('../../../../assets/images/icon_clear.png')}
                                                        style={[StyleTemplate.iconInput]} />
                                                </TouchableOpacity>
                                            )
                                            : (<></>)
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

                                <View style={{ flex: 1, width: width - 20, paddingTop: 12 }}>
                                    <FlatList data={books}
                                        refreshing={false}
                                        ref={flatListRef}
                                        onRefresh={onRefresh}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item }) => {
                                            return (
                                                <TouchableOpacity style={styles.containerItem}
                                                    onPress={() => navigation.navigate(ConstString.book_detail, { item })}
                                                    onLongPress={() => deleteBook(item)}>
                                                    <Image source={{ uri: item.image }}
                                                        style={styles.image_book} />
                                                    <View style={styles.view_main_information_book}>
                                                        <Text style={styles.text_book_name}>{
                                                            String(item.name).length > 22
                                                                ? String(item.name).slice(0, 22) + '...'
                                                                : String(item.name)
                                                        }</Text>
                                                        <Text style={styles.text_price}>Giá thuê: {Number(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text>
                                                        <Text style={styles.text_quantity}>Số lượng tồn kho: {item.quantity}</Text>
                                                        <Text style={styles.text_quantity}>Cập nhật lần cuối: {getDate(item.updated_at)}</Text>
                                                        <View style={{ flex: 1 }} />
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }} />
                                </View>
                            </SafeAreaView>
                        </TouchableWithoutFeedback>
                    )
            }
        </>
    )
}

export default Book

const styles = StyleSheet.create({
    containerItem: {
        flex: 1,
        padding: 12,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Color.color_primary,
        marginBottom: 12
    },
    image_book: {
        height: 100,
        width: 80,
        borderRadius: 12,
        resizeMode: 'cover',
    },
    view_main_information_book: {
        flex: 1,
        justifyContent: 'center',
        marginStart: 12,
        flexDirection: 'column'
    },
    text_book_name: {
        fontSize: 18,
        fontWeight: '600',
        color: Color.color_primary,
        fontStyle: 'italic',
        textDecorationLine: 'underline'
    },
    text_price: {
        fontSize: 14,
        color: 'red',
        marginTop: 5,
        fontWeight: '500'
    },
    text_quantity: {
        fontSize: 13,
        fontWeight: '300',
        color: 'black',
        marginTop: 5
    }
})