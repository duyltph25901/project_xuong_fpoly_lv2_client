import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Color, ConstNumber, ConstString, StyleTemplate, TextStyle } from '../../../../styles/index'
import AddDiscount from './AddDiscount'
import Discount from './Discount'
import DiscountsContainer from './DiscountsContainer'

const DiscountContainer = () => {

    const Tab = createMaterialTopTabNavigator()

    return (
        <Tab.Navigator initialRouteName={ConstString.add_discount}>
            <Tab.Screen name={ConstString.add_discount} component={AddDiscount} />
            <Tab.Screen name={ConstString.list_discount} component={DiscountsContainer} />
        </Tab.Navigator>
    )
}

export default DiscountContainer

const styles = StyleSheet.create({})