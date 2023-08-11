import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ConstNumber, Color, ConstString, StyleTemplate, TextStyle } from '../../../../styles/index'
import Discount from "./Discount"

const DiscountsContainer = () => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator initialRouteName={ConstString.list_discount_container} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ConstString.list_discount_container} component={Discount} />
        </Stack.Navigator>
    )
}

export default DiscountsContainer