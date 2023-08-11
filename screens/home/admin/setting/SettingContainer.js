import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MainSetting from "./MainSetting"
import UpdateProfile from "./UpdateProfile"
import { ConstString } from "../../../../styles"
import InformationScreen from "./InformationScreen"
import GuideScreen from "./GuideScreen"
import HelpCenterScreen from "./HelpCenterScreen"
import GuideAdmin from "./GuideAdmin"
import GuideBoss from "./GuideBoss"

const SettingContainer = () => {

    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator initialRouteName={ConstString.main_setting} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ConstString.main_setting} component={MainSetting} />
            <Stack.Screen name={ConstString.update_profile_admin} component={UpdateProfile} />
            <Stack.Screen name={ConstString.information_app_screen} component={InformationScreen} />
            <Stack.Screen name={ConstString.guide_app_screen} component={GuideScreen} />
            <Stack.Screen name={ConstString.help_center} component={HelpCenterScreen} />
            <Stack.Screen name={ConstString.guide_admin} component={GuideAdmin} />
            <Stack.Screen name={ConstString.guide_boss} component={GuideBoss} />
        </Stack.Navigator>
    )
}

export default SettingContainer