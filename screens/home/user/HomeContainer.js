import { ActivityIndicator, Alert, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BookContainer from './book/BookContainer'
import CategoryContainer from './category/CategoryContainer'
import DiscountContainer from './discount/DiscountContainer'
import 'react-native-gesture-handler'
import { DrawerContentScrollView, createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'
import String from '../../../styles/String'
import Color from '../../../styles/Color'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { ConstString } from '../../../styles/index'
import CustomerCotainer from './customer/CustomerCotainer'
import LoanContaner from './loan/LoanContaner'

const HomeContainer = () => {

    const Drawer = createDrawerNavigator()

    return (
        <Drawer.Navigator initialRouteName={String.book_admin_screen}
            drawerContent={props => <CustomNavigationDrawer {...props} />}
            screenOptions={{
                headerShown: true,
                drawerActiveTintColor: Color.color_second_dary,
                drawerLabelStyle: {
                    fontSize: 14,
                },
            }}>
            <Drawer.Screen name={String.book} component={BookContainer}
                options={{
                    drawerIcon: ({ color }) => {
                        return <Ionicons name='book-outline' size={22} color={color} />
                    }
                }} />
            <Drawer.Screen name={String.category} component={CategoryContainer}
                options={{
                    drawerIcon: ({ color }) => {
                        return <Ionicons name='reorder-three-outline' size={22} color={color} />
                    }
                }} />
            <Drawer.Screen name={String.discount} component={DiscountContainer}
                options={{
                    drawerIcon: ({ color }) => {
                        return <Ionicons name='clipboard-outline' size={22} color={color} />
                    }
                }} />
            <Drawer.Screen name={String.loan_container} component={LoanContaner}
                options={{
                    drawerIcon: ({ color }) => {
                        return <Ionicons name='calendar-outline' size={22} color={color} />
                    }
                }} />
            <Drawer.Screen name={String.customer_container} component={CustomerCotainer}
                options={{
                    drawerIcon: ({ color }) => {
                        return <Ionicons name='people-outline' size={22} color={color} />
                    }
                }} />
        </Drawer.Navigator>
    )
}

const CustomNavigationDrawer = (props) => {
    const navigation = useNavigation()
    const [adminCurrent, setAdminCurrent] = useState('')
    const [isLoading, setLoading] = useState(true)

    const removeObject = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
            console.log('Data removed successfully!');
        } catch (e) {
            console.log('Error removing data: ' + e);
        }
    }

    const getAdminCurrent = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null) {
                console.log('Value retrieved successfully:', value)
                setAdminCurrent(value)
            } else {
                console.log('No data found for this key')
            }
            setLoading(false)
        } catch (e) {
            console.log('Error retrieving data: ' + e)
        }
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAdminCurrent(ConstString.key_admin_current)
        })

        return unsubscribe
    }, [navigation])

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}
                contentContainerStyle={{
                    backgroundColor: Color.color_primary
                }}>
                <ImageBackground source={require('../../../assets/images/bg_navigation_drawer.png')}
                    style={{ padding: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        isLoading
                            ? <View>
                                <ActivityIndicator />
                            </View>
                            : (
                                <>
                                    <Image source={require('../../../assets/images/avatar_default.png')}
                                        style={{
                                            height: 80,
                                            width: 80,
                                            borderRadius: 100,
                                            resizeMode: 'cover'
                                        }} />
                                    <View style={{ flexDirection: 'column', marginStart: 12 }}>
                                        <Text style={{
                                            fontSize: 14,
                                            fontWeight: '300',
                                            color: Color.color_text_light,
                                            marginBottom: 5
                                        }}>Xin chào</Text>
                                        <Text style={{
                                            fontSize: 18,
                                            fontWeight: '500',
                                            color: Color.color_text_light
                                        }}>{JSON.parse(JSON.parse(adminCurrent)).user_name}</Text>
                                    </View>
                                    <View style={{ flex: 1 }} />
                                </>
                            )
                    }
                </ImageBackground>

                <View style={{ backgroundColor: Color.color_white, flex: 1, paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>

            </DrawerContentScrollView>

            <View style={{
                padding: 20,
                borderTopWidth: 1,
                borderTopColor: Color.color_black
            }}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
                    onPress={() => {
                        Alert.alert(ConstString.confirm_log_out, ConstString.content_log_out, [
                            {
                                text: 'Không',
                                style: 'cancel'
                            },
                            {
                                text: 'Có',
                                onPress: async () => {
                                    removeObject(ConstString.key_admin_current)
                                    navigation.goBack()
                                }
                            }
                        ])
                    }}>
                    <Ionicons name='log-out-outline' size={30} color={Color.color_primary} />
                    <Text style={{
                        fontSize: 18,
                        marginStart: 35,
                        color: Color.color_primary,
                        fontWeight: 'bold'
                    }}>{String.log_out}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeContainer

const styles = StyleSheet.create({})