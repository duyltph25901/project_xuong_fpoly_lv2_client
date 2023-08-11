import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ThongKe from './thong_ke/ThongKe'
import SettingContainer from './setting/SettingContainer'
import ListContainer from './danh_sach_thu_thu/ListContainer'
import { Color, ConstString } from '../../../styles/index'
import Ionic from 'react-native-vector-icons/Ionicons'

const HomeContainer = () => {

    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator initialRouteName={ConstString.thong_ke}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName = ''
                    if (route.name == ConstString.thong_ke) {
                        iconName = focused ? 'analytics' : 'analytics-outline'
                        size = focused ? size + 7 : size + 3
                    } else if (route.name == ConstString.list_thu_thu) {
                        iconName = focused ? 'list' : 'list-outline'
                        size = focused ? size + 7 : size + 3
                    } else if (route.name == ConstString.setting) {
                        iconName = focused ? 'options' : 'options-outline'
                        size = focused ? size + 7 : size + 3
                    }
                    return <Ionic name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: '#8B008B',
                tabBarInactiveTintColor: '#CCCCCC',
                tabBarShowLabel: false,
                headerShown: false
            })}>
            <Tab.Screen name={ConstString.thong_ke} component={ThongKe} />
            <Tab.Screen name={ConstString.list_thu_thu} component={ListContainer} />
            <Tab.Screen name={ConstString.setting} component={SettingContainer} />
        </Tab.Navigator>
    )
}

export default HomeContainer