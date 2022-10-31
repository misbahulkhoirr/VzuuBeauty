import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import CurrencyFormat from 'react-currency-format'
import { BUCKET_URL, colors, fonts, truncate } from '../../../utils'

const ProductItem = ({ id, image, name, price, discount, navigation }) => {
    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('ProductDetail', { id })}>
            <Image
                style={styles.imageContent}
                source={{ uri: `${BUCKET_URL}/${image}` }}
            />
            <Text style={styles.itemName}>{truncate(name, 35)}</Text>
            <CurrencyFormat
                value={price && price}
                displayType={'text'}
                thousandSeparator={'.'}
                decimalSeparator={','}
                prefix={'Rp '}
                renderText={value => (
                    <Text style={styles.itemCode}>{value}</Text>
                )}
            />
            {discount ? (
                <Text style={styles.itemDiscount}>Rp. {discount}</Text>
            ) : (
                <Text style={styles.itemDiscount}></Text>
            )}
        </TouchableOpacity>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    itemContainer: {
        justifyContent: 'flex-end',
        padding: 7
    },
    imageContent: {
        height: undefined,
        aspectRatio: 1 / 1,
        borderRadius: 5
    },
    itemName: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 14,
        color: colors.text.secondary,
        fontFamily: fonts.primary[300]
    },
    itemCode: {
        fontFamily: fonts.primary[500],
        fontSize: 12,
        color: colors.text.subTitle
    },
    itemDiscount: {
        fontFamily: fonts.primary[500],
        fontSize: 12,
        color: '#E0E0E0',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },
    reviewerWrapper: {
        marginVertical: 5,
        justifyContent: 'space-between'
    },
    imageStar: {
        marginRight: 5,
        width: 15,
        height: 15
    },
    reviewers: {
        fontSize: 12,
        fontWeight: '800'
    }
})
