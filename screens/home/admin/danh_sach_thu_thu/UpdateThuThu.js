import { StyleSheet, Text, View, SafeAreaView, TextInput, Dimensions, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Color, ConstNumber, ConstString, StyleTemplate } from '../../../../styles'
import { useNavigation } from '@react-navigation/native'

const width = Dimensions.get('window').width

const UpdateThuThu = ({ route }) => {
    const navigation = useNavigation()
    const { item } = route.params
    const [userName, setUserName] = useState(item.user_name)
    const [password, setPassword] = useState(item.password)
    const [isLoading, setLoading] = useState(false)

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    const handleDone = async () => {
        if (!userName || !password) {
            Alert.alert(ConstString.oops, ConstString.err_null_input)
            return
        } if (String(password).length < 6) {
            Alert.alert(ConstString.oops, ConstString.err_password_sign_up)
            return
        }

        setLoading(true)

        const now = new Date()
        const updated_at = formatDate(now)
        const urlUpdateAdmin = `${ConstString.url}${ConstString.action_update_admin}`

        const object = {
            userName: userName,
            password: password,
            updatedAt: updated_at,
            idAdmin: item.id
        }

        fetch(urlUpdateAdmin, {
            method: 'put',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
            .then(res => { return res.json() })
            .then(res => {
                const code = res.flag
                const message = res.message
                if (code == ConstNumber.code_200) {
                    Alert.alert(ConstString.congratulations, message)

                    // clear input
                    setUserName('')
                    setPassword('')
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

    return (
        <SafeAreaView style={[StyleTemplate.container]}>
            <View style={{
                flexDirection: 'row',
                padding: 12,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../../../assets/images/icon_back.png')}
                        style={{
                            height: 23,
                            width: 23,
                            resizeMode: 'cover',
                            tintColor: Color.color_primary
                        }}
                    />
                </TouchableOpacity>
                <Text style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: Color.color_primary
                }}>Cập nhật thủ thư</Text>
                <TouchableOpacity onPress={handleDone}>
                    <Image source={require('../../../../assets/images/icon_done.png')}
                        style={{
                            height: 23,
                            width: 23,
                            resizeMode: 'cover',
                        }}
                    />
                </TouchableOpacity>
            </View>

            <View style={{
                flex: 1,
                marginTop: 20
            }}>
                <TextInput style={[StyleTemplate.containerInput, { fontSize: 16, marginBottom: 12 }]}
                    placeholder='Tên đăng nhập*'
                    keyboardType='default'
                    value={userName}
                    onChangeText={(text) => setUserName(text)} />
                <TextInput style={[StyleTemplate.containerInput, { fontSize: 16, marginBottom: 12 }]}
                    placeholder='Mật khẩu'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)} />

                {
                    isLoading
                    && (
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator />
                        </View>
                    )
                }
            </View>
        </SafeAreaView>
    )
}

export default UpdateThuThu