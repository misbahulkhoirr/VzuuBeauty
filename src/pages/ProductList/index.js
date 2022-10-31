import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { FilterByPrice, Products, TopbarHeader, Text } from '../../components'
import { colors, useForm, API_URL_V2, Gap } from '../../utils'
import { countCartAction } from '../../redux/actions/v2'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProductList = ({ navigation, route }) => {
    const isFocused = useIsFocused()
    console.log('isFocused', isFocused)
    const cartCountReducer = useSelector(state => state.countCartReducer.data)

    const filterRef = useRef()
    const dispatch = useDispatch()

    const FromSearch = route.params && route.params.FromSearch
    const listCategory = route.params && route.params.id
    const [data, setData] = useState([])
    const [paginate, setPaginate] = useState()
    const [bestseller, setBestSeller] = useState('')
    const [hiddebutton, setHiddeButton] = useState(true)

    // const [pages, setPages] = useState()
    // console.log('pages', pages)
    const [form, setForm] = useForm({
        min: '',
        max: '',
        sortBy: '',
        order: '',
        keyword: FromSearch,
        category_id: listCategory
    })
    // console.log('Category_ID', form.category_id)
    useEffect(() => {
        dispatch(countCartAction())
    }, [form ? form : null])

    const Urls = (form, bestseller, pages) => {
        console.log('CallAPIPages:', pages, 'CallAPIform:', form)
        if (form || bestseller || pages) {
            if (form.category_id) {
                console.log('1')
                return `${API_URL_V2}/products?category_id=${form.category_id}`
            } else if (form.min && form.max) {
                console.log('2')
                return `${API_URL_V2}/products?min=${form.min}&max=${form.max}`
            } else if (form.keyword) {
                console.log('3')
                return `${API_URL_V2}/products?keyword=${form.keyword}`
            } else if (pages) {
                console.log('4')
                return `${API_URL_V2}/products?page=${pages}`
            } else if (form.order === 'asc' || form.order === 'desc') {
                console.log('5')
                return `${API_URL_V2}/products?sortBy=price&order=${form.order}`
            } else if (bestseller) {
                console.log('6')
                return `${API_URL_V2}/products?sortBy=${bestseller}`
            }
        }
        // else
        // {
        return `${API_URL_V2}/products`
        // }
    }

    const CallAPI = async (form, pages) => {
        console.log('pages2', form, pages)
        const accessToken = await AsyncStorage.getItem('access_token')
        axios({
            method: 'GET',
            url: Urls(form, bestseller, pages),
            // url: `${API_URL_V2}/products?sortBy=${form.sortBy}&order=${form.order}&min=${form.min}&max=${form.max}` ,
            headers: {
                Authorization: 'Bearer ' + JSON.parse(accessToken)
            }
        })
            .then(response => {
                console.log(response)
                setPaginate(response.data.pagination)

                if (
                    response.data.pagination.pageCount ===
                    response.data.pagination.page
                ) {
                    setHiddeButton(false)
                }
                if (response.data.pagination.page > 1 && data) {
                    setData(oldData => [...oldData, ...response.data.datas])
                } else {
                    setData(response.data.datas)
                }
            })
            .catch(error => {
                console.log('eror', error.response)
            })
    }

    const filterPrice = () => {
        if (form.order === 'sales') {
            setBestSeller('sales')
        }
        CallAPI(form)
        filterRef.current.close()
    }
    const handlePaginate = page => {
        console.log('pages0', page)
        const pages = page + 1
        console.log('pages1', pages)
        CallAPI(form, pages)
    }

    const back = () => {
        navigation.navigate('Beranda')
    }

    useEffect(() => {
        CallAPI(form)
        dispatch(countCartAction())
        setForm('reset')
        if (isFocused) {
            CallAPI(form)
        }
    }, [prevPage, isFocused])
    // console.log('DataProduct', data)
    const prevPage = route.params?.fromPage
    console.log('prevPage', prevPage)
    return (
        <View style={section.container}>
            <TopbarHeader
                title="Daftar Produk"
                useLogo={true}
                prevPage={prevPage}
                goBack={form.keyword || form.category_id ? back : null}
                cart={{ onPress: () => navigation.navigate('CartPage') }}
                cartCount={cartCountReducer.total}
                useFilter={() => filterRef.current.open()}
            />
            <Products
                headerComponent={
                    <>
                        {/* Jangan dihapus */}
                        {/* <Box ml={-5}>
                            <TouchableOpacity
                                style={{ marginLeft: 20 }}
                                onPress={() => filterRef.current.open()}>
                                <IconFilter color="#9D9D9D" />
                            </TouchableOpacity>
                        </Box>

                        <Gap height={20} /> */}
                    </>
                }
                navigation={navigation}
                data={data}
                paginate={paginate}
                hiddebutton={hiddebutton}
                paginateOnPress={page => handlePaginate(page)}
                aspectRatio={1 / 1.15}
                containerPadding={15}
            />
            {/* {Paginated()} */}
            <FilterByPrice
                ref={filterRef}
                title={'Filter Produk'}
                value={{
                    min: form.min,
                    max: form.max,
                    order: form.order,
                    sortBy: form.sortBy
                }}
                onChangeText={{
                    min: value => setForm('min', value),
                    max: value => setForm('max', value),
                    order: value => setForm('order', value),
                    sortBy: value => setForm('sortBy', value)
                }}
                onSubmit={filterPrice}
                // onBestSeller={BestSeller}
            />
        </View>
    )
}

const section = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.background
    }
})

export default ProductList
