import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { HStack } from 'native-base'
import {
    CategoryMenu,
    Gap,
    ImageSlider,
    Products,
    SearchBar,
    SectionTitle,
    TopbarHeader,
    Text,
    Wallet
} from '../../components'
import { colors, fonts, screenWidth, showSuccess } from '../../utils'
import { HomeAction, countCartAction, topuplistAction } from '../../redux/actions/v2'

const Home = ({ navigation, route }) => {
   
    const dispatch = useDispatch()
    const home = useSelector(state => state.homeReducer.data)
    const cartCountReducer = useSelector(state => state.countCartReducer.data)
    const topuplistReducer = useSelector(state => state.topuplistReducer.data)
    console.log('topuplistReducer',topuplistReducer)
    useEffect(() => {
        if(route && route.params && route.params.Payment === "Success")
        {
            showSuccess("Transaksi Produk Berhasil")
        }
        dispatch(topuplistAction())
        dispatch(countCartAction())
        dispatch(HomeAction())
    }, [route])
    return (
        <View style={styles.container}>
            <TopbarHeader
                title="Vzuu Beauty"
                useLogo={true}
                cart={{ onPress: () => navigation.navigate('CartPage') }}
                cartCount={cartCountReducer.total}
            />
            <Products
                headerComponent={
                    <>
                        <Wallet BadgeWallet 
                        onPress={{
                            saldo: () => navigation.navigate("TopupList"),
                            point: () => navigation.navigate("PointList")
                        }} 
                        saldo={{
                            saldoWallet :topuplistReducer.balance,
                            saldoPoints: 0
                        }}
                        title={{
                            titleWallet:"Saldo",
                            titlePoint: "Loyalty"
                        }}  />
                        <Gap height={15} />
                        <SearchBar navigation={navigation} />
                        <Gap height={30} />
                        <ImageSlider
                            data={home && home.datas.get_banners}
                            imageWrapperStyle={styles.bannerImageWrapper}
                            imageStyle={styles.bannerImage}
                            sliderWidth={screenWidth - 30}
                            itemWidth={screenWidth - 30}
                            autoplay={true}
                            loop={true}
                        />
                        <Gap height={30} />
                        <SectionTitle text="Kategori" />
                        <Gap height={10} />
                        <CategoryMenu
                            data={home && home.datas.get_categories}
                            navigation={navigation}
                        />
                        <Gap height={30} />
                        <HStack justifyContent="space-between">
                            <SectionTitle text="Semua Produk" />
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('ProductList')
                                }>
                                <Text style={styles.link}>Lihat Semua</Text>
                            </TouchableOpacity>
                        </HStack>
                        <Gap height={10} />
                    </>
                }
                data={home && home.datas.latest_products}
                aspectRatio={1 / 1.15}
                containerPadding={15}
                navigation={navigation}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.background
    },
    link: {
        color: colors.primary,
        fontFamily: fonts.primary[500],
        fontSize: 14
    },
    bannerImageWrapper: {
        height: 155,
        backgroundColor: colors.white,
        borderRadius: 8
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 8
    },
})

export default Home
