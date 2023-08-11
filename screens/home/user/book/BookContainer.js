import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import String from '../../../../styles/String'
import AddBook from './AddBook'
import BooksContainer from './BooksContainer'

const Tab = createMaterialTopTabNavigator()

function BookContainer() {
    return (
        <Tab.Navigator>
            <Tab.Screen name={String.tab_add_book} component={AddBook} />
            <Tab.Screen name={String.tab_list_book} component={BooksContainer} />
        </Tab.Navigator>
    )
}

export default BookContainer