import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Book from './Book'
import BookDetails from './BookDetails'
import UpdateBook from './UpdateBook'
import { ConstString } from '../../../../styles/index'

const BooksContainer = () => {
    const Stack = createNativeStackNavigator()


    return (
        <Stack.Navigator initialRouteName={ConstString.list_book} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ConstString.list_book} component={Book} />
            <Stack.Screen name={ConstString.book_detail} component={BookDetails} />
            <Stack.Screen name={ConstString.update_book} component={UpdateBook} />
        </Stack.Navigator>
    )
}

export default BooksContainer

const styles = StyleSheet.create({})