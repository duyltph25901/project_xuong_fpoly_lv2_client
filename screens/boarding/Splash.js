import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import AnimatedLottieView from 'lottie-react-native'
import Style from '../../styles/Styles'
import String from '../../styles/String'
import TextStyle from '../../styles/Text'
import { useNavigation } from '@react-navigation/native'
import Time from '../../styles/Number'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Splash = () => {

    const navigation = useNavigation()

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setTimeout(() => {
                navigation.navigate(String.boarding1)
            }, Time.time_delay_splash_screen)
        })

        return unsubscribe
    }, [navigation])

    return (
        <View style={Style.container}>
            <AnimatedLottieView source={require('../../assets/anims/anim_splash.json')}
                autoPlay={true}
                loop={true}
                style={styles.size_anim} />

            <ActivityIndicator style={{ marginVertical: 10 }} />

            <Text style={TextStyle.text_app_name}>{String.app_name}</Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    size_anim: {
        width: width - 20,
        height: 250,
    },
})