import React, { useEffect, useState } from 'react'
import {
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import { Text } from '../../atoms'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { Avatar } from 'native-base'
import { GoBack, DefaultAvatar, Logo } from '../../../assets'
import { IconCart, IconSearch, IconFilter, IconFilter2, Gap } from '../../atoms'
import { colors, fonts } from '../../../utils'
import { cartAction, countCartAction } from '../../../redux/actions/v2'

const TopbarHeader = ({
    title,
    profile,
    goBack,
    cart,
    cartCount,
    useSearch,
    useFilter,
    useLogo,
    prevPage
}) => {
    const [photo, setPhoto] = useState('')
    const dispatch = useDispatch()
    const cartCountReducer = useSelector(state => state.countCartReducer.data)
    const isFocused = useIsFocused()
    const [count, setCount] = useState(cartCountReducer.total)

    useEffect(() => {
        dispatch(countCartAction())
        dispatch(cartAction())
    }, [isFocused])
    return (
        <View style={styles.container}>
            {profile && (
                <View style={styles.profileWrapper}>
                    <Avatar
                        source={
                            photo
                                ? userData.photo != photo
                                    ? { uri: photo }
                                    : { uri: `${bucketURL}/${photo}` }
                                : DefaultAvatar
                        }
                        size="sm"
                    />
                </View>
            )}

            {goBack && (
                <TouchableOpacity style={styles.goBackWrapper} onPress={goBack}>
                    <Image style={styles.goBack} source={GoBack} />
                </TouchableOpacity>
            )}

            {useLogo === true && prevPage != 'Home' && prevPage != 'Search' && (
                // <TouchableOpacity style={styles.goBackWrapper} onPress={goBack}>
                    <Image style={styles.useLogo} source={Logo} />
                // </TouchableOpacity>
            )}

            {!useSearch && (
                <View style={styles.titleWrapper(profile, goBack, cart)}>
                    <Text style={styles.title(goBack, cart)}>{title}</Text>
                </View>
            )}

            {useSearch && (
                <View style={styles.searchInputWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={
                            useSearch.placeholder
                                ? useSearch.placeholder
                                : 'Search ...'
                        }
                        placeholderTextColor={colors.text.placeholder}
                        defaultValue={useSearch.isValueExist}
                        onChangeText={value => useSearch.onChangeText(value)}
                    />
                    {useSearch.isValueExist !== '' && (
                        <TouchableOpacity
                            style={styles.searchButton}
                            onPress={useSearch.onPress}>
                            <IconSearch
                                filled
                                size={20}
                                color={colors.text.secondary}
                            />
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {cart && cart.onPress && (
                <TouchableOpacity
                    style={styles.cartButton}
                    onPress={cart.onPress}>
                    <IconCart size={28} color={colors.text.menuInactive} />
                    {cartCount > 0 && (
                        <View style={styles.itemCountWrapper}>
                            <Text style={styles.itemCount}>{cartCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            )}

            {cart && !cart.onPress && (
                <View style={styles.cartButton}>
                    <IconCart size={28} color={colors.text.menuInactive} />
                    {cartCount > 0 && (
                        <View style={styles.itemCountWrapper}>
                            <Text style={styles.itemCount}>{cartCount}</Text>
                        </View>
                    )}
                </View>
            )}

            {useFilter && (
                <>
                    <Gap width={5} />
                    <TouchableOpacity onPress={useFilter}>
                        {/* <IconFilter color="#9D9D9D" /> */}
                        <IconFilter2 color="#495A75" />
                    </TouchableOpacity>
                </>
            )}
        </View>
    )
}

export default TopbarHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: colors.white
    },
    profileWrapper: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    goBackWrapper: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    useLogo: {
        width:50,
        aspectRatio: 2/1,
        height:undefined,
        marginRight: -50
    }, 
    goBack: {
        width: 25,
        height: 25
    },
    titleWrapper: (profile, goBack, cart) => ({
        flex: 1,
        height: 40,
        marginLeft: profile
            ? 0
            : !profile && !cart
            ? 0
            : goBack && cart
            ? 0
            : 40,
        justifyContent: 'center'
    }),
    title: (goBack, cart) => ({
        color: colors.text.secondary,
        fontFamily: fonts.primary[400],
        fontSize: 16,
        textAlign: goBack ? (goBack && cart ? 'center' : 'left') : 'center'
    }),
    cartButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 28,
        height: 28
    },
    itemCountWrapper: {
        width: 20,
        height: 20,
        backgroundColor: colors.error,
        borderRadius: 20 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -3,
        right: -3
    },
    itemCount: {
        color: colors.white,
        fontFamily: fonts.primary[400],
        fontSize: 8
    },
    searchInputWrapper: {
        flex: 1,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 1,
        color: '#757575',
        fontFamily: fonts.primary[400],
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.white,
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    searchButton: {
        width: 45,
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor: '#F3E1E1',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5
    }
})
