import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ConstString } from "../../../../styles"
import Loan from "./Loan"

const ContainerLoans = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator initialRouteName={ConstString.list_loan} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ConstString.list_loan} component={Loan} />
        </Stack.Navigator>
    )
}

export default ContainerLoans