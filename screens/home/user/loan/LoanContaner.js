import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import AddLoan from './AddLoan'
import ContainerLoans from "./ContainerLoans"
import { ConstString } from "../../../../styles"

const LoanContaner = () => {

    const Tab = createMaterialTopTabNavigator()

    return (
        <Tab.Navigator>
            <Tab.Screen name={ConstString.add_loan} component={AddLoan} />
            <Tab.Screen name={ConstString.container_loans} component={ContainerLoans} />
        </Tab.Navigator>
    )
}

export default LoanContaner