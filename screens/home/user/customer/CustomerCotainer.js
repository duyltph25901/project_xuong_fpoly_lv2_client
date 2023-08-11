import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import AddCustomer from "./AddCustomer"
import CustomersContainer from "./CustomersContainer"
import { ConstString } from "../../../../styles"

const CustomerCotainer = () => {

    const Tab = createMaterialTopTabNavigator()

    return (
        <Tab.Navigator initialRouteName={ConstString.add_customer}>
            <Tab.Screen name={ConstString.add_customer} component={AddCustomer} />
            <Tab.Screen name={ConstString.customer} component={CustomersContainer} />
        </Tab.Navigator>
    )
}

export default CustomerCotainer