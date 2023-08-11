import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Alert, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color, ConstNumber, ConstString, StyleTemplate, TextStyle } from '../../../../styles/index'
import { useNavigation } from '@react-navigation/native'

const width = Dimensions.get('window').width

const BookDetails = ({ route }) => {
    const navigation = useNavigation()
    const [book, setBook] = useState(route.params.item)

    const deleteBook = () => {
        Alert.alert(ConstString.confirm_delete, `Bạn có muốn xóa '${book.name}' không?`, [
            {
                text: 'Không',
                style: 'cancel'
            },
            {
                text: 'Có',
                onPress: async () => {
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
                            navigation.goBack()
                        })
                }
            }
        ])
    }

    const getDate = (dateTime) => { return String(dateTime).slice(0, 11) }

    return (
        <View style={StyleTemplate.container}>
            <View style={styles.layoutHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../../../assets/images/icon_back.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.textTitle}>{book.name}</Text>
                </View>
            </View>

            <View style={{ flex: 1, marginTop: 20, width: width - 20, flexDirection: 'row' }}>
                <Image style={{ height: 250, width: 150, resizeMode: 'cover', borderRadius: 12 }}
                    source={{ uri: book.image }} />
                <View style={{ flex: 1, marginStart: 12, flexDirection: 'column', paddingVertical: 5 }}>
                    <Text style={styles.textInformation}>Tồn kho: <Text style={styles.textHighLine}>{book.quantity}</Text> cuốn</Text>
                    <Text style={styles.textInformation}>Lượt thuê: <Text style={styles.textHighLine}>{book.purchases}</Text> lần</Text>
                    <Text style={styles.textInformation}>Thể loại: <Text style={styles.textHighLine}>{book.category_name}</Text></Text>
                    <Text style={styles.textInformation}>Tạo lúc: <Text style={styles.textHighLine}>{getDate(book.created_at)}</Text></Text>
                    <Text style={styles.textInformation}>Cập nhật lúc: <Text style={styles.textHighLine}>{getDate(book.updated_at)}</Text></Text>
                    <Text style={styles.textInformation}>Giá thuê: <Text style={styles.textHighLine}>{Number(book.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text></Text>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate(ConstString.update_book, { book })}>
                            <Image source={require('../../../../assets/images/icon_edit.png')}
                                style={{ height: 30, width: 30, resizeMode: 'cover', marginHorizontal: 7 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={deleteBook}>
                            <Image source={require('../../../../assets/images/icon_trash.png')}
                                style={{ height: 30, width: 30, resizeMode: 'cover', marginHorizontal: 7 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default BookDetails

const styles = StyleSheet.create({
    layoutHeader: {
        width: width,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    icon: {
        height: 23,
        width: 23,
        resizeMode: 'cover'
    },
    textTitle: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        textDecorationLine: 'underline',
        color: Color.color_primary
    },
    textInformation: {
        fontSize: 16,
        fontWeight: '300',
        marginBottom: 7
    },
    textHighLine: {
        fontWeight: '500',
        fontSize: 16,
        color: Color.color_primary
    }
})