import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert, Dimensions, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState, useRef } from 'react'
import { Color, ConstNumber, ConstString, StyleTemplate } from '../../../../styles'
import { useNavigation } from '@react-navigation/native'
import DropDownPicker from 'react-native-dropdown-picker'
import { FlatGrid } from 'react-native-super-grid'

const width = Dimensions.get('window').width

const List = () => {
    const numColumns = 2
    const navigation = useNavigation()
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [items, setItems] = useState([
        { title: 'Tất cả', val: 0 },
        { title: 'Hoạt động', val: 1 },
        { title: 'Vô hiệu hóa', val: 2 },
    ])
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(1)
    const [keySearch, setKeySearch] = useState('')

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData(`${ConstString.url}${ConstString.action_get_admin_enable}`)
            setValue(1)
        })

        return unsubscribe
    }, [navigation])

    const getData = async (url) => {
        setLoading(true)
        setKeySearch(false)
        fetch(url)
            .then(res => { return res.json() })
            .then(res => {
                setData(res.thu_thus)
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
                getData(`${ConstString.url}${ConstString.action_get_admin}`)
                break
            } case 1: {
                getData(`${ConstString.url}${ConstString.action_get_admin_enable}`)
                break
            } default: {
                getData(`${ConstString.url}${ConstString.action_get_admin_disable}`)
            }
        }
    }

    const formatData = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns)

        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns)
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true })
            numberOfElementsLastRow++
        }

        return data
    }

    const handleSearchAdmin = async () => {
        setLoading(true)
        setValue(0)
        if (!keySearch) {
            setValue(1)
            getData(`${ConstString.url}${ConstString.action_get_admin_enable}`)
        } else {
            const object_search = {
                keySearch: keySearch
            }
            const urlSearchAdmin = `${ConstString.url}${ConstString.action_search_admin_by_user_name}`
            fetch(urlSearchAdmin, {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(object_search)
            })
                .then(res => { return res.json() })
                .then(res => {
                    setData(res.admins)
                })
                .catch(err => {
                    Alert.alert(ConstString.oops, err.message)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    const handleDisableAdmin = async (item) => {
        const urlDelete = `${ConstString.url}${ConstString.action_disable_admin}`
        Alert.alert(item.is_active == 1 ? ConstString.confirm_disable_admin : ConstString.confirm_enable_admin, item.is_active == 1 ? ConstString.title_disable_admin : ConstString.title_enable_admin, [
            {
                text: 'Không',
                style: 'cancel'
            }, {
                text: 'Có',
                onPress: async () => {
                    setLoading(true)
                    setValue(1)
                    setKeySearch('')

                    const object_update = {
                        id: item.id
                    }

                    fetch(urlDelete, {
                        method: 'put',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(object_update)
                    })
                        .then(res => { return res.json() })
                        .then(res => {
                            const code = res.flag
                            const message = res.message
                            Alert.alert(code == ConstNumber.code_200 ? ConstString.congratulations : ConstString.oops, message)
                        })
                        .catch(err => {
                            Alert.alert(ConstString.oops, err.message)
                        })
                        .finally(() => {
                            getData(`${ConstString.url}${ConstString.action_get_admin_enable}`)
                            setLoading(false)
                        })
                }
            }
        ])
    }

    return (
        <SafeAreaView style={[StyleTemplate.container]}>

            <View style={{
                width: width - 20,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                padding: 12,
                marginBottom: 10
            }}>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: Color.color_primary,
                    flex: 1,
                    textAlign: 'center'
                }}>Danh sách thủ thư</Text>
                <TouchableOpacity onPress={() => navigation.navigate(ConstString.add_thu_thu)}>
                    <Image source={require('../../../../assets/images/icon_next.png')}
                        style={{
                            height: 23,
                            width: 23,
                            resizeMode: 'cover'
                        }}
                    />
                </TouchableOpacity>
            </View>

            <View style={[StyleTemplate.containerButtonOutline, { paddingHorizontal: 12, marginBottom: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                <TouchableOpacity onPress={handleSearchAdmin}>
                    <Image source={require('../../../../assets/images/icon_search.png')}
                        style={{
                            height: 23,
                            width: 23,
                            tintColor: Color.color_primary
                        }}
                    />
                </TouchableOpacity>
                <TextInput style={{
                    flex: 1,
                    paddingHorizontal: 12,
                    fontSize: 16,
                }}
                    placeholder='Tìm kiếm....'
                    value={keySearch}
                    onChangeText={(text) => setKeySearch(text)} />
            </View>

            <View style={{
                width: width - 20,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: 10,
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
                        width: Dimensions.get('window').width - 20,
                    }}
                />
            </View>

            <View style={{
                flexDirection: 'row',
                width: width - 20,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={{ flex: 1 }} />
            </View>

            {
                isLoading
                    ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator />
                        </View>
                    )
                    : (
                        <FlatGrid data={formatData(data, numColumns)}
                            keyExtractor={(item, index) => item.id}
                            itemDimension={130}
                            spacing={5}
                            renderItem={({ item }) => {
                                return (
                                    <>
                                        {
                                            item.id
                                            && (
                                                <TouchableOpacity style={{
                                                    padding: 12,
                                                    borderRadius: 12,
                                                    borderWidth: 1,
                                                    borderColor: item.is_active == 1 ? Color.color_enable_true : Color.color_enable_fail,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                                    onPress={() => navigation.navigate(ConstString.update_thu_thu, { item })}
                                                    onLongPress={() => handleDisableAdmin(item)}>
                                                    <View style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        flexDirection: 'row'
                                                    }}>
                                                        <View style={{ flex: 1 }} />
                                                        <Image source={require('../../../../assets/images/avatar_default.png')}
                                                            style={{
                                                                height: 75,
                                                                width: 75,
                                                                borderRadius: 100,
                                                                marginBottom: 12
                                                            }}
                                                        />
                                                        <View style={{ flex: 1 }} />
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 14,
                                                            fontWeight: '500',
                                                            color: Color.color_primary,
                                                            marginEnd: 7
                                                        }}>{item.user_name}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }
                                    </>
                                )
                            }} />
                    )
            }
        </SafeAreaView>
    )
}

export default List

const styles = StyleSheet.create({})