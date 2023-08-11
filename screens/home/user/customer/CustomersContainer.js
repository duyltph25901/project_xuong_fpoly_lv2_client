import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Customer from "./Customer"
import DetailsCustomer from "./DetailsCustomer"
import EditCustomer from "./EditCustomer"
import { ConstString } from "../../../../styles"

const CustomersContainer = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator initialRouteName={ConstString.list_customer} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ConstString.list_customer} component={Customer} />
            <Stack.Screen name={ConstString.details_customer} component={DetailsCustomer} />
            <Stack.Screen name={ConstString.update_customer} component={EditCustomer} />
        </Stack.Navigator>
    )
}

export default CustomersContainer