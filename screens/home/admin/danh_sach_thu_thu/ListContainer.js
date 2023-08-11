import { createNativeStackNavigator } from "@react-navigation/native-stack"
import List from "./List"
import UpdateThuThu from "./UpdateThuThu"
import AddThuThu from "./AddThuThu"
import DetailsThuThu from "./DetailsThuThu"
import { ConstString } from "../../../../styles"

const ListContainer = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator initialRouteName={ConstString.list_thu_thu_main} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ConstString.list_thu_thu_main} component={List} />
            <Stack.Screen name={ConstString.update_thu_thu} component={UpdateThuThu} />
            <Stack.Screen name={ConstString.details_thu_thu} component={DetailsThuThu} />
            <Stack.Screen name={ConstString.add_thu_thu} component={AddThuThu} />
        </Stack.Navigator>
    )
}

export default ListContainer