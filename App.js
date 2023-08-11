import { Splash, Boarding1, Boarding2, Boarding3 } from './screens/boarding/index'
import { Login, SignUp, LoginBoss } from './screens/auth/index'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import String from './styles/String'
import { HomeContainerBoss } from './screens/home/admin/index'
import { HomeContainerAdmin } from './screens/home/user/index'

const App = () => {
  const Tab = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={String.splash} screenOptions={{
        headerShown: false
      }}>
        <Tab.Screen name={String.splash} component={Splash} />
        <Tab.Screen name={String.boarding1} component={Boarding1} />
        <Tab.Screen name={String.boarding2} component={Boarding2} />
        <Tab.Screen name={String.boarding3} component={Boarding3} />
        <Tab.Screen name={String.login_screen} component={Login} />
        <Tab.Screen name={String.sign_up_screen} component={SignUp} />
        <Tab.Screen name={String.login_screen_boss} component={LoginBoss} />
        <Tab.Screen name={String.home_container_boss} component={HomeContainerBoss} />
        <Tab.Screen name={String.home_container_admin} component={HomeContainerAdmin} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App