import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Gap, TopbarHeader, WishlistItem } from '../../components'
import {
    countCartAction,
    removeWishlistAction,
    wishlistAction,
    cartAddAction
} from '../../redux/actions/v2'
import { colors, showSuccess } from '../../utils'

const Wishlist = ({ navigation }) => {
    const dispatch = useDispatch()
    const { data: cart } = useSelector(state => state.countCartReducer)
    const wishlist = useSelector(state => state.wishlistReducer.data)
    const removeDataWishlist = useSelector(
        state => state.removeWishlistReducer.data
    )
    const [status, setStatus] = useState(false)

    useEffect(() => {
        if (status === true) {
            setStatus(false)
        }
        dispatch(countCartAction())
        dispatch(wishlistAction())
    }, [status == true ? wishlist : null])

    const dummyData = [
        {
            id: 1,
            image: false,
            product_name: 'Produk ABC',
            current_price: 85256,
            original_price: 149999
        },
        {
            id: 2,
            image: false,
            product_name: 'Produk ABC',
            current_price: 85256,
            original_price: 149999
        },
        {
            id: 3,
            image: false,
            product_name: 'Produk DEF',
            current_price: 85256,
            original_price: 85256
        },
        {
            id: 4,
            image: false,
            product_name: 'Produk GHI',
            current_price: 75256,
            original_price: 75256
        },
        {
            id: 5,
            image: false,
            product_name: 'Produk JKL',
            current_price: 85256,
            original_price: 149999
        }
    ]
    const success = () => showSuccess('Produk berhasil dihapus dari wishlist')
    const removeWishlist = id => {
        dispatch(removeWishlistAction(id, { success }))
        setStatus(true)
    }

    const addCart = async (id) => {
        // console.log('cart',id)
        await dispatch(cartAddAction(id))
        await dispatch(countCartAction())
    }


    
    return (
        <View style={styles.container}>
            <TopbarHeader
                title="Wishlist"
                goBack={() => navigation.goBack()}
                cart={{ onPress: () => navigation.navigate('CartPage') }}
                cartCount={cart.total}
            />

            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Gap height={15} />
                    {wishlist &&
                        wishlist.map((item, index) => (
                            <WishlistItem
                                image={item.image}
                                productName={item.product_name}
                                currentPrice={item.current_price}
                                originalPrice={item.original_price}
                                addToCartOnPress={() =>
                                    addCart({product_id: item.product_id})
                                }
                                removeItemOnPress={() =>
                                    removeWishlist(item.id)
                                }
                                key={index}
                            />
                        ))}
                </ScrollView>
            </View>
        </View>
    )
}

export default Wishlist

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.background
    },
    content: { paddingHorizontal: 15, flex: 1 }
})
