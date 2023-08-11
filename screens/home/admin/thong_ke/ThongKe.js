import { StyleSheet, Text, View, Dimensions, SafeAreaView, ActivityIndicator, Alert, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { Color, ConstString } from '../../../../styles'
import { useNavigation } from '@react-navigation/native'

const ThongKe = () => {
    const navigation = useNavigation()
    const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    const [isLoading, setLoading] = useState(false)

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData(`${ConstString.url}${ConstString.action_get_doanh_thu}`)
        })
        return unsubscribe
    }, [navigation])

    const getData = async (url) => {
        fetch(url)
            .then(res => { return res.json() })
            .then(res => {
                setData(res.doanh_thu)
            })
            .catch(err => {
                Alert.alert(ConstString.oops, err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <SafeAreaView style={{
            width: Dimensions.get('window').width,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'white',
            flex: 1
        }}>

            <View style={{
                width: Dimensions.get('window').width - 20,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 12,
                marginBottom: 10
            }}>
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: Color.color_primary,
                    flex: 1,
                    textAlign: 'center'
                }}>Thống kê doanh thu</Text>

                <TouchableOpacity onPress={() => getData(`${ConstString.url}${ConstString.action_get_doanh_thu}`)}>
                    <Image source={require('../../../../assets/images/icon_refresh.png')}
                        style={{
                            height: 23,
                            width: 23,
                            resizeMode: 'cover'
                        }}
                    />
                </TouchableOpacity>
            </View>
            {
                isLoading
                    ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator />
                        </View>
                    )
                    : (
                        <LineChart
                            data={{
                                labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
                                datasets: [
                                    {
                                        data: data
                                    }
                                ],
                                legend: ["Doanh thu"]
                            }}
                            width={Dimensions.get("window").width - 20} // from react-native
                            height={300}
                            yAxisSuffix="k"
                            yAxisInterval={3} // optional, defaults to 1
                            chartConfig={{
                                backgroundGradientFrom: "#BA55D3",
                                backgroundGradientTo: "#DDA0DD",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "4",
                                    strokeWidth: "1.5",
                                    stroke: "#9932CC"
                                }
                            }}
                            style={{
                                flex: 1,
                                borderRadius: 12
                            }}
                        />
                    )
            }
        </SafeAreaView>
    )
}

export default ThongKe

const styles = StyleSheet.create({})