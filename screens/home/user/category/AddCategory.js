import { StyleSheet, Text, View, SafeAreaView, TextInput, Image, TouchableOpacity, Alert, ActivityIndicator, Dimensions, FlatList } from 'react-native'
import React, { useState, useRef } from 'react'
import { StyleTemplate, TextStyle, Color, ConstNumber, ConstString } from '../../../../styles'
import { DateTime } from '../../../../controller/index'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
const width = Dimensions.get('window').width


const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('')
    const [isLoading, setLoading] = useState(true)
    const url = `${ConstString.url}${ConstString.action_add_category}`
    const navigation = useNavigation()
    const flatListRef = useRef(null)
    const url_get = `${ConstString.url}${ConstString.action_get_all_category}`
    const [itemUpdate, setItemUpdate] = useState({})
    const [categories, setCategories] = useState([])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setCategoryName('')
        })
        return unsubscribe
    }, [])


    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoading(true)
            getData()
            setItemUpdate({})
        })

        return unsubscribe
    }, [navigation])

    const getData = () => {
        fetch(url_get)
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

    const handleAddCategory = async () => {
        if (!categoryName) {
            Alert.alert(ConstString.oops, ConstString.err_null_input)
            return
        }

        // show loading
        setLoading(true)

        if (itemUpdate.name == undefined) { // add
            const created_at = DateTime.getCurrentDateTime()
            const updated_at = created_at
            const objectAddCategory = {
                name: categoryName,
                created_at: created_at,
                updated_at: updated_at
            }

            fetch(url, {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(objectAddCategory)
            })
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    const code = data.flag
                    const message = data.message

                    if (code != ConstNumber.code_200) {
                        Alert.alert(ConstString.oops, message)
                    } else {
                        Alert.alert(ConstString.success, message)
                        setLoading(true)
                        getData()
                        // clear input
                        setCategoryName('')
                    }
                })
                .catch((er) => {
                    Alert.alert(String.oops, er.message)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else { // update
            const url = `${ConstString.url}${ConstString.action_update_category}`
            const objectUpdate = {
                id: itemUpdate.id,
                name: categoryName,
                updatedAt: DateTime.getCurrentDateTime()
            }

            fetch(url, {
                method: 'put',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(objectUpdate)
            })
                .then(res => { return res.json() })
                .then(json => {
                    const code = json.flag
                    const message = json.message
                    if (code == ConstNumber.code_200) {
                        Alert.alert(ConstString.congratulations, message)
                        getData()
                    } else {
                        Alert.alert(ConstString.oops, ConstString.update_fail)
                    }
                })
                .catch(err => {
                    Alert.alert(ConstString.oops, err.message)
                })
                .finally(() => {
                    setLoading(false)
                    setItemUpdate({})
                    setCategoryName('')
                })
        }
    }

    const onRefresh = React.useCallback(() => {
        setLoading(true)
        getData()
        setItemUpdate({})
        setCategoryName('')
    }, [])

    const handleDeleteCategory = async (item) => {
        Alert.alert(ConstString.confirm_delete, `Bạn có muốn xóa "${item.name}"?`, [
            {
                text: 'Có',
                onPress: async () => {
                    setLoading(true)
                    const urlDeleteCategory = `${ConstString.url}${ConstString.action_delete_category}/${item.id}`

                    fetch(urlDeleteCategory, {
                        method: 'delete',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(res => { return res.json() })
                        .then(json => {
                            const code = json.flag
                            const message = json.message

                            if (code == ConstNumber.code_200) {
                                getData()
                                Alert.alert(ConstString.congratulations, message)
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
            },
            {
                text: 'Không',
                style: 'cancel'
            }
        ])
    }

    return (
        <>
            {
                isLoading
                    ? (
                        <SafeAreaView style={StyleTemplate.container}>
                            <ActivityIndicator />
                        </SafeAreaView>
                    )
                    : (
                        <SafeAreaView style={[StyleTemplate.container, {
                            justifyContent: 'flex-start',
                            paddingTop: 20
                        }]}>
                            <View style={{
                                width: width - 20,
                                flexDirection: 'row',
                                marginBottom: 5,
                                marginTop: 10,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: Color.color_primary,
                                    marginStart: 5
                                }}>Thêm thể loại</Text>
                                <View style={{ flex: 1 }} />
                            </View>
                            <View style={[StyleTemplate.containerInput, { paddingVertical: 12 }]}>
                                <TextInput style={{ flex: 1, fontSize: 16, fontWeight: '400', marginEnd: 12 }}
                                    placeholder='Tên thể loại'
                                    value={categoryName}
                                    onChangeText={(text) => setCategoryName(text)} />
                                {
                                    categoryName && (
                                        <TouchableOpacity onPress={handleAddCategory}>
                                            <Image source={require('../../../../assets/images/icon_done.png')}
                                                style={{
                                                    height: 23,
                                                    width: 23,
                                                    resizeMode: 'cover'
                                                }}
                                            />
                                        </TouchableOpacity>
                                    )
                                }
                            </View>

                            <View style={{
                                width: width - 20,
                                flexDirection: 'row',
                                marginBottom: 5,
                                marginTop: 10,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: Color.color_primary,
                                    marginStart: 5
                                }}>Danh sách thể loại</Text>
                                <View style={{ flex: 1 }} />
                            </View>

                            <FlatList
                                style={{
                                    marginTop: 10
                                }}
                                refreshing={false}
                                ref={flatListRef}
                                onRefresh={onRefresh}
                                data={categories}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity onLongPress={() => { handleDeleteCategory(item) }}
                                            onPress={() => navigation.navigate(ConstString.tab_details_category, { item: item })}>
                                            <View style={styles.containerItem}>
                                                <Text style={styles.textItem}>{(index + 1)}.    {item.name}</Text>
                                                <View style={{ flex: 1 }} />
                                                <View>
                                                    <TouchableOpacity onPress={() => {
                                                        setItemUpdate(item)
                                                        setCategoryName(item.name)
                                                    }}>
                                                        <Ionicons name='sync-outline' size={23} color={Color.color_tint_icon_udpate} />
                                                    </TouchableOpacity>
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

export default AddCategory

const styles = StyleSheet.create({
    containerItem: {
        width: width - 20,
        paddingVertical: 7,
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: Color.color_black,
        marginBottom: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textItem: {
        fontSize: 16,
        fontWeight: '400',
        color: 'black'
    }
})