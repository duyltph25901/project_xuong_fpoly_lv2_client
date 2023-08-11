import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, Dimensions, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { Color, ConstNumber, ConstString, StyleTemplate } from '../../../../styles'
import { useNavigation } from '@react-navigation/native'

const width = Dimensions.get('window').width

const UpdateProfile = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('duyltph25901@fpt.edu.vn')
    const [password, setPassword] = useState('123123')
    const [isLoading, setLoading] = useState(false)

    const validateEmail = (email) => {
        // Biểu thức chính quy để kiểm tra email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Kiểm tra định dạng email
        return emailRegex.test(email);
    }

    const handleDone = async () => {
        if (!email || !password) {
            Alert.alert(ConstString.oops, ConstString.err_null_input)
            return
        } if (!validateEmail(email)) {
            Alert.alert(ConstString.oops, ConstString.err_email)
            return
        } if (String(password).length < 6) {
            Alert.alert(ConstString.oops, ConstString.err_password_sign_up)
            return
        }

        setLoading(true)
        const object = {
            email: email,
            password: password
        }
        const urlUpdateBoss = `${ConstString.url}${ConstString.action_update_boss}`
        fetch(urlUpdateBoss, {
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
                Alert.alert(code == ConstNumber.code_200 ? ConstString.congratulations : ConstString.oops, message)
            })
            .catch(err => {
                Alert.alert(ConstString.oops, err.message)
            })
            .finally(() => {
                setLoading(false)
                setEmail('')
                setPassword('')
            })

    }

    return (
        <SafeAreaView style={[StyleTemplate.container]}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 12,
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../../../assets/images/icon_back.png')}
                        style={{
                            height: 23,
                            width: 23,
                            resizeMode: 'cover'
                        }}
                    />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: Color.color_primary,
                    flex: 1,
                    textAlign: 'center'
                }}>Cập nhật thông tin</Text>
                {
                    !isLoading
                    && (
                        <TouchableOpacity onPress={handleDone}>
                            <Image source={require('../../../../assets/images/icon_done.png')}
                                style={{
                                    height: 23,
                                    width: 23,
                                    resizeMode: 'cover',
                                }}
                            />
                        </TouchableOpacity>
                    )
                }
            </View>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                marginTop: 20
            }}>
                <TextInput style={[StyleTemplate.containerInput, { marginBottom: 15 }]}
                    placeholder='Email *'
                    value={email}
                    onChangeText={(text) => setEmail(text)} />
                <TextInput style={[StyleTemplate.containerInput]}
                    placeholder='Mật khẩu *'
                    value={password}
                    onChangeText={(text) => setPassword(text)} />
            </View>
            <>
                {
                    isLoading
                    && (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator />
                        </View>
                    )
                }
            </>
        </SafeAreaView>
    )
}

export default UpdateProfile

const styles = StyleSheet.create({})