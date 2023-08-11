import Color from "./Color"
import { Dimensions } from "react-native"

const width = Dimensions.get('window').width

const container = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.color_back_ground
}

const containerButton = {
    width: width - 20,
    height: 50,
    borderRadius: 12,
    backgroundColor: Color.color_bg_button_fill,
    justifyContent: 'center',
    alignItems: 'center'
}

const containerInput = {
    width: width - 20,
    height: 45,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row'
}

const iconInput = {
    width: 23,
    height: 23,
    tintColor: Color.color_primary
}

const containerButtonLogin = {
    paddingHorizontal: 21,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.color_bg_button_fill,
    borderRadius: 100
}

const containerButtonOutline = {
    width: width - 20,
    height: 50,
    borderRadius: 12,
    backgroundColor: Color.color_white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.color_primary
}

containerSearchOutline = {
    width: width - 20,
    height: 45,
    borderRadius: 12,
    borderColor: Color.color_primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1
}

const Style = {
    container,
    containerButton,
    containerInput,
    iconInput,
    containerButtonLogin,
    containerButtonOutline,
    containerSearchOutline
}

export default Style