import AddCategory from './AddCategory'
import { ConstString, ConstNumber, StyleTemplate, TextStyle, Color } from '../../../../styles/index'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DetailsCategory from './DetailsCategory'

const Stack = createNativeStackNavigator()

const CategoryContainer = () => {
    return (
        <Stack.Navigator initialRouteName={ConstString.tab_add_category} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ConstString.tab_add_category} component={AddCategory} />
            <Stack.Screen name={ConstString.tab_details_category} component={DetailsCategory} />
        </Stack.Navigator>
    )
}

export default CategoryContainer