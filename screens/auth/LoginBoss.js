import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Style from '../../styles/Styles'
import TextStyle from '../../styles/Text'
import String from '../../styles/String'
import { TouchableOpacity } from 'react-native'
import Color from '../../styles/Color'
import { useNavigation } from '@react-navigation/native'
import { Alert } from 'react-native'
import Time from '../../styles/Number'

const width = Dimensions.get('window').width

const LoginBoss = () => {
    const url = `${String.url}${String.action_login_boss}`
    const navigation = useNavigation()
    const [email, setEmail] = useState('duyltph25901@fpt.edu.vn')
    const [password, setPassword] = useState('123')

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert(String.oops, String.err_null_input)
            return
        }

        const objectBossLogin = {
            email: email,
            password: password
        }

        fetch(url, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objectBossLogin)
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                const code = data.flag
                const message = data.message

                switch (code) {
                    case Time.code_201: {
                        navigation.navigate(String.home_container_boss)
                        break
                    }
                    default: {
                        Alert.alert(String.oops, message)
                        break
                    }
                }
            })
            .catch(err => {
                Alert.alert(String.oops, err.message)
            })
            .finally(() => { })
    }

    return (
        <SafeAreaView style={Style.container}>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                width: width - 20
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={(require('../../assets/images/icon_back.png'))}
                        style={{
                            height: 30,
                            width: 30,
                            tintColor: Color.color_primary
                        }} />
                </TouchableOpacity>

                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: Color.color_text_primary
                }}>{String.boss}</Text>
            </View>

            <View style={[Style.containerInput, { marginBottom: 12 }]}>
                <Image source={require('../../assets/images/icon_email.png')}
                    style={Style.iconInput} />

                <TextInput style={[{ flex: 1, marginHorizontal: 12 }, TextStyle.input]}
                    placeholder={String.place_input_email}
                    value={email}
                    onChangeText={(text) => setEmail(email)} />
            </View>
            <View style={[Style.containerInput, { marginBottom: 12 }]}>
                <Image source={require('../../assets/images/icon_lock.png')}
                    style={Style.iconInput} />

                <TextInput style={[{ flex: 1, marginHorizontal: 12 }, TextStyle.input]}
                    placeholder={String.place_input_password}
                    value={password}
                    onChangeText={(text) => setPassword(password)}
                    secureTextEntry={true} />
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: width - 20,
                marginVertical: 12,
            }}>
                {/* <TouchableOpacity style={{
                    marginStart: 3
                }}>
                    <Text style={{
                        fontSize: 14,
                        fontStyle: 'italic',
                        fontWeight: '500'
                    }}>{String.forgot_password}</Text>
                </TouchableOpacity> */}

                <View style={{ flex: 1 }} />

                <TouchableOpacity style={{
                    paddingHorizontal: 12,
                    paddingVertical: 12,
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: Color.color_primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}
                    onPress={handleLogin}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: Color.color_text_primary,
                        marginEnd: 12
                    }}>{String.login}</Text>

                    <Image source={require('../../assets/images/icon_next.png')}
                        style={{
                            height: 30,
                            width: 30,
                            tintColor: Color.color_primary
                        }} />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }} />
        </SafeAreaView>
    )
}

export default LoginBoss

const styles = StyleSheet.create({})