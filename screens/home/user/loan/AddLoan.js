import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { Color, ConstNumber, ConstString, StyleTemplate, TextStyle } from '../../../../styles/index'
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SelectList } from 'react-native-dropdown-select-list'

const width = Dimensions.get('window').width

const AddLoan = () => {
    const navigation = useNavigation()
    const [isLoading, setLoading] = useState(false)
    const [discounts, setDiscounts] = useState([])
    const [customers, setCustomers] = useState([])
    const [books, setBooks] = useState([])
    const [book, setBook] = useState(null)
    const [discount, setDiscount] = useState(null)
    const [customer, setCustomer] = useState(null)
    const [now, setNow] = useState(new Date())
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState()
    const [adminCurrent, setAdminCurrent] = useState('')
    const [bookDefault, setBookDefault] = useState({})
    const [customerDefault, setCustomerDefault] = useState({})
    const [discountDefault, setDiscountDefault] = useState({})
    const [loadingCaculator, setLoadingCaculator] = useState(false)
    const [objectBook, setObjectBook] = useState({})
    const [objectDiscount, setObjectDiscount] = useState({})
    const [show, setShow] = useState(false)

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getData()
            getAdminCurrent(ConstString.key_admin_current)
        })

        return unsubscribe
    }, [navigation])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            clearInput()
        })

        return unsubscribe
    }, [navigation])

    const getAdminCurrent = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null) {
                console.log('Value retrieved successfully:', value)
                setAdminCurrent(value)
            } else {
                console.log('No data found for this key')
            }
        } catch (e) {
            console.log('Error retrieving data: ' + e)
        }
    }

    const getData = async () => {
        setLoading(true)
        const url_get_discounts = `${ConstString.url}${ConstString.action_get_discount_enable_for_spinner}`
        const url_get_customers = `${ConstString.url}${ConstString.action_get_customer_for_spinner}`
        const url_get_books = `${ConstString.url}${ConstString.action_get_book_for_spinner}`

        // get discount
        fetch(url_get_discounts)
            .then(res => { return res.json() })
            .then(res => {
                const code = res.flag
                setDiscounts(res.discounts)
                setDiscountDefault(res.discounts[0])
            })
            .catch(err => {
                Alert.alert(ConstString.oops, `Error get all discounts: ${err.message}`)
            })
            .finally(() => {
                setLoading(false)
            })

        fetch(url_get_customers)
            .then(res => { return res.json() })
            .then(res => {
                const code = res.flag
                setCustomers(res.customers)
                setCustomerDefault(res.customers[0])
            })
            .catch(err => {
                Alert.alert(ConstString.oops, `Error get all customers: ${err.message}`)
            })
            .finally(() => {
                setLoading(false)
            })

        fetch(url_get_books)
            .then(res => { return res.json() })
            .then(res => {
                const code = res.flag
                setBooks(res.books)
                setBookDefault(res.books[0])
            })
            .catch(err => {
                Alert.alert(ConstString.oops, `Error get all books: ${err.message}`)
            })
            .finally(() => {
                setLoading(false)

            })
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateEnd
        setShow(Platform.OS == 'ios')
        setDate(currentDate)
    }

    const convertDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed
        const year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
    }

    const compareDates = (dateStr1, dateStr2) => {
        const date1 = new Date(dateStr1.split('/').reverse().join('-'));
        const date2 = new Date(dateStr2.split('/').reverse().join('-'));

        if (date1.getTime() === date2.getTime()) {
            return -1 // Cùng một ngày
        } else if (date1 < date2) {
            return -1 // Ngày thứ nhất trước ngày thứ hai
        } else {
            return 1 // Ngày thứ nhất sau ngày thứ hai
        }
    }

    const getCurrentDateTime = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const seconds = String(today.getSeconds()).padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    const handleDone = async () => {

        console.log(
            `
            \n>>>>> Check Book: ${book}
            Check Discount: ${discount}
            Check Customer: ${customer}\n
            `
        )

        let idAdmin = JSON.parse(JSON.parse(adminCurrent)).id
        idAdmin = String(idAdmin).trim()
        const url_add_loan = `${ConstString.url}${ConstString.action_add_loan}`

        console.log(
            `
            \n>>>>> Check Add Loan Slip:
            Id Admin current: ${idAdmin}
            Created at: ${getCurrentDateTime()}
            Pay day: ${convertDate(date)}
            ID book: ${book}
            ID customer: ${customer}
            ID discount: ${discount}
            Price: ${handleCaculator()}\n
            `
        )

        if (!customer || !book) {
            Alert.alert(ConstString.oops, ConstString.err_null_input)
            return
        } if (compareDates(convertDate(date), convertDate(now)) == -1) {
            Alert.alert(ConstString.oops, 'Thời gian trả sách không hợp lệ!')
            return
        }

        const loanSlip = {
            createdAt: getCurrentDateTime(),
            payDay: convertDate(date),
            idBook: book,
            idDiscount: discount,
            endPrice: handleCaculator(),
            idCustomer: customer,
            createdBy: idAdmin
        }

        setLoading(true)

        fetch(url_add_loan, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loanSlip)
        })
            .then(res => { return res.json() })
            .then(res => {
                const message = res.message
                const code = res.flag
                if (code != ConstNumber.code_200) {
                    Alert.alert(ConstString.oops, message)
                } else {
                    Alert.alert(ConstString.congratulations, message)
                    clearInput()
                }
            })
            .catch(err => {
                Alert.alert(ConstString.oops, err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const clearInput = () => {
        setCustomer(null)
        setBook(null)
        setDiscount(null)
        setDate(new Date)
        setNow(new Date)
    }

    const handleCaculator = () => {
        if (objectDiscount == null || objectDiscount == undefined || objectDiscount.value_discount == undefined) {
            return objectBook.price
        } else {
            const result = objectBook.price - (objectBook.price * objectDiscount.value_discount / 100)
            return result
        }
    }

    return (
        <>
            {
                isLoading
                    ? (
                        <SafeAreaView style={[StyleTemplate.container]}>
                            <ActivityIndicator />
                        </SafeAreaView>
                    )
                    : (
                        <SafeAreaView style={[StyleTemplate.container]}>
                            <View style={{ flexDirection: 'column', width: width - 20, marginTop: 20, zIndex: 30 }}>
                                <Text style={{
                                    marginStart: 20,
                                    marginBottom: 10,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: Color.color_primary
                                }}>Chọn sách</Text>
                                <SelectList
                                    setSelected={(val) => setBook(val)}
                                    data={books}
                                    save="key"
                                    defaultOption={bookDefault}
                                    boxStyles={{ width: width - 20, fontSize: 14 }}
                                    inputStyles={{ fontSize: 16, color: 'black', }}
                                    maxHeight={150}
                                    onSelect={() => {
                                        console.log(
                                            `
                                            \n>>>>> Check selected Book: ${book}\n
                                            `
                                        )

                                        if (book == null || book == undefined) {
                                            return
                                        } else {
                                            // search book by id
                                            setLoadingCaculator(true)
                                            const url = `${ConstString.url}${ConstString.action_search_book_by_id}/${book}`
                                            fetch(url)
                                                .then(res => { return res.json() })
                                                .then(res => {
                                                    setObjectBook(res.book)
                                                    console.log(
                                                        `
                                                        \n>>>>> Check search book by id: 
                                                        Book: ${objectBook}\n
                                                        `
                                                    )
                                                })
                                                .catch(err => {
                                                    Alert.alert(ConstString.oops, err.message)
                                                })
                                                .finally(() => {
                                                    setLoadingCaculator(false)
                                                })
                                        }
                                    }}
                                />
                            </View>

                            <View style={{ flexDirection: 'column', width: width - 20, marginTop: 10, zIndex: 30 }}>
                                <Text style={{
                                    marginStart: 20,
                                    marginBottom: 10,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: Color.color_primary
                                }}>Chọn khách hàng</Text>
                                <SelectList
                                    setSelected={(val) => setCustomer(val)}
                                    data={customers}
                                    save="key"
                                    defaultOption={customerDefault}
                                    boxStyles={{ width: width - 20, fontSize: 14 }}
                                    inputStyles={{ fontSize: 16, color: 'black', }}
                                    maxHeight={150}
                                    onSelect={() => {
                                        console.log(
                                            `
                                            \n>>>>> Check selected Customer: ${customer}\n
                                            `
                                        )
                                    }}
                                />
                            </View>

                            <View style={{ flexDirection: 'column', width: width - 20, marginTop: 10, zIndex: 30 }}>
                                <Text style={{
                                    marginStart: 20,
                                    marginBottom: 10,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: Color.color_primary
                                }}>Chọn mã giảm giá</Text>
                                <SelectList
                                    setSelected={(val) => setDiscount(val)}
                                    data={discounts}
                                    save="key"
                                    defaultOption={discountDefault}
                                    boxStyles={{ width: width - 20, fontSize: 14 }}
                                    inputStyles={{ fontSize: 16, color: 'black', }}
                                    maxHeight={150}
                                    placeholder='Tìm kiếm mã giảm giá'
                                    onSelect={() => {
                                        console.log(
                                            `
                                            \n>>>>> Check selected Discount: ${discount}\n
                                            `
                                        )

                                        if (discount == null || discount == undefined) {
                                            return
                                        } else {
                                            setLoadingCaculator(true)
                                            const url = `${ConstString.url}${ConstString.action_search_discount_by_id}/${discount}`
                                            fetch(url)
                                                .then(res => { return res.json() })
                                                .then(res => {
                                                    setObjectDiscount(res.discount)
                                                })
                                                .catch(err => {
                                                    Alert.alert(ConstString.oops, err.message)
                                                })
                                                .finally(() => {
                                                    setLoadingCaculator(false)
                                                })
                                        }
                                    }}
                                />
                            </View>

                            <View style={{
                                width: width - 20,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 10
                            }}>
                                <Text style={{
                                    marginStart: 20,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: Color.color_primary,
                                    marginBottom: 10
                                }}>Ngày hẹn trả</Text>
                                <View style={{ flex: 1 }} />
                            </View>
                            <View style={[StyleTemplate.containerInput, { marginBottom: 15, height: 50, justifyContent: 'center', alignItems: 'center' }]}>
                                <Text style={{ flex: 1 }}>Ngày trả sách</Text>
                                <DateTimePicker testID='dateTimePicker'
                                    value={date}
                                    mode={'date'}
                                    is24Hour={true}
                                    display='default'
                                    onChange={onChange}
                                    locale='vi'
                                />
                            </View>
                            <View style={{ flexDirection: 'row', width: width - 30, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    {
                                        loadingCaculator
                                            ? (
                                                <ActivityIndicator />
                                            )
                                            : (
                                                <>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={{
                                                            fontSize: 16,
                                                            fontWeight: '300',
                                                            color: 'red'
                                                        }}>Thành tiền: <Text style={{
                                                            fontSize: 16,
                                                            textDecorationLine: 'underline',
                                                            fontWeight: 'bold',
                                                            fontStyle: 'italic'
                                                        }}>{Number(handleCaculator()).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</Text></Text>
                                                    </View>
                                                    <TouchableOpacity style={{ width: 70, justifyContent: 'center', height: 40, borderRadius: 100, borderWidth: 1, borderColor: Color.color_primary, justifyContent: 'center', alignItems: 'center' }}
                                                        onPress={handleDone}>
                                                        <Text style={{ fontSize: 17, fontWeight: '500', color: Color.color_primary }}>Tạo</Text>
                                                        <Image />
                                                    </TouchableOpacity>
                                                </>
                                            )
                                    }
                                </View>
                            </View>

                            <View style={{ flex: 1 }} />
                        </SafeAreaView>
                    )
            }
        </>
    )
}

export default AddLoan

const styles = StyleSheet.create({})