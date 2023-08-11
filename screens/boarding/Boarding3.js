import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AnimatedLottieView from 'lottie-react-native'
import Style from '../../styles/Styles'
import String from '../../styles/String'
import TextStyle from '../../styles/Text'

const width = Dimensions.get('window').width

const Boarding3 = () => {
    const navigation = useNavigation()

    const handleNext = () => {
        navigation.navigate(String.login_screen)
    }

    return (
        <SafeAreaView style={Style.container}>
            <AnimatedLottieView source={require('../../assets/anims/boarding_3.json')}
                style={styles.anim}
                autoPlay={true}
                loop={true} />

            <Text style={TextStyle.text_boarding}>{String.content_boarding_3}</Text>

            <TouchableOpacity style={[Style.containerButton, styles.containerButton]} onPress={handleNext}>
                <Text style={TextStyle.text_button}>{String.login}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Boarding3

const styles = StyleSheet.create({
    anim: {
        width: width - 20,
        height: 100,
        marginBottom: 30
    },
    containerButton: {
        marginVertical: 20
    }
})