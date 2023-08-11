import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, ActivityIndicator, } from 'react-native'
import React, { useState } from 'react'
import Style from '../../styles/Styles'
import String from '../../styles/String'
import TextStyle from '../../styles/Text'
import { TextInput } from 'react-native'
import Color from '../../styles/Color'
import { Alert } from 'react-native'
import ConstNumber from '../../styles/Number'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const width = Dimensions.get('window').width

const Login = () => {
    const urlLogin = `${String.url}${String.action_login_admin}`
    const [userName, setUserName] = useState('nguyenThiC')
    const [password, setPassword] = useState('123')
    const [isLoading, setLoading] = useState(false)
    const navigation = useNavigation()

    const handleLogin = async () => {
        if (!userName || !password) {
            Alert.alert(String.oops, String.err_null_input)
            return
        }

        console.log(
            `
            \n>>>>> Check Login Admin:
            User name: ${userName}
            Password: ${password}\n
            `
        )

        const objectAdminLogin = {
            userName: userName,
            password: password
        }

        setLoading(true)

        fetch(urlLogin, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objectAdminLogin)
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                const code = data.flag
                const message = data.message
                const objectCurrent = data.object_current

                if (code != ConstNumber.code_201) {
                    Alert.alert(String.oops, message)
                } else {
                    removeObject(String.key_admin_current)
                    saveObject(String.key_admin_current, objectCurrent)
                }
            })
            .catch((er) => {
                Alert.alert(String.oops, er.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const saveObject = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue)
            console.log('Object saved successfully!')

            navigation.navigate(String.home_container_admin)
        } catch (e) {
            console.log('Error saving object: ' + e)
        }
    }

    const removeObject = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            console.log('Data removed successfully!');
        } catch (e) {
            console.log('Error removing data: ' + e);
        }
    }

    return (
        <SafeAreaView style={Style.container}>
            {
                isLoading
                    ? (
                        <ActivityIndicator />
                    )
                    : (
                        <>
                            <View style={{ flex: 1 }} />

                            <View style={{ width: width - 30 }}>
                                <Text style={TextStyle.text_title_auth}>{String.login}</Text>
                                <Text style={[TextStyle.text_guide, { marginVertical: 10 }]}>{String.content_login}</Text>
                            </View>

                            <View>

                                <View style={[Style.containerInput, { marginVertical: 12 }]}>
                                    <Image source={require('../../assets/images/icon_user.png')}
                                        style={Style.iconInput} />

                                    <TextInput style={[{ flex: 1, marginHorizontal: 12 }, TextStyle.input]}
                                        placeholder={String.place_input_user}
                                        value={userName}
                                        onChangeText={(text) => setUserName(text)} />
                                </View>

                                <View style={[Style.containerInput, { marginBottom: 12 }]}>
                                    <Image source={require('../../assets/images/icon_lock.png')}
                                        style={Style.iconInput} />

                                    <TextInput style={[{ flex: 1, marginHorizontal: 12 }, TextStyle.input]}
                                        placeholder={String.place_input_password}
                                        value={password}
                                        onChangeText={(text) => setPassword(text)}
                                        secureTextEntry={true} />
                                </View>

                                <View style={{ width: width - 20, flexDirection: 'row' }}>
                                    <View style={{ flex: 1 }} />

                                    <TouchableOpacity style={[Style.containerButtonLogin, { flexDirection: 'row' }]}
                                        onPress={handleLogin}>
                                        <Text style={[TextStyle.text_button, { marginEnd: 12 }]}>{String.login}</Text>
                                        <Image source={require('../../assets/images/icon_next.png')}
                                            style={{
                                                width: 30,
                                                height: 30,
                                                tintColor: 'white'
                                            }} />
                                    </TouchableOpacity>
                                </View>

                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.navigate(String.login_screen_boss)}>
                                    <Text style={{ fontStyle: 'italic', fontWeight: '500', color: Color.color_text_primary }}>{String.login_by_boss}</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )
            }
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container_input: {

    }
})