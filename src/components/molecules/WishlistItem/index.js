import React from 'react'
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ImagePlaceholder } from '../../../assets'
import { BUCKET_URL, colors, fonts, truncate } from '../../../utils'
import { ButtonOpacity, Gap, IconTrashBin, PriceLabel } from '../../atoms'

const WishlistItem = ({
    image,
    productName,
    currentPrice,
    originalPrice,
    addToCartOnPress,
    removeItemOnPress
}) => {
    return (
        <Pressable
            style={styles.container}
            onPress={() => alert('Test go to product detail.')}
        >
            <Image
                style={styles.image}
                source={
                    image ? { uri: `${BUCKET_URL}/${image}` } : ImagePlaceholder
                }
            />
            <View style={styles.flexItemFull}>
                <Text style={styles.productName}>
                    {truncate(productName, 32)}
                </Text>
                <View style={styles.flexRow}>
                    {/* <PriceLabel value={currentPrice} />
                    <Gap width={5} />
                    {currentPrice !== originalPrice && (
                        <PriceLabel
                            value={originalPrice}
                            textType="light"
                            textStrikeThrough
                        />
                    )} */}
                </View>
                <Gap height={10} />
                <View style={styles.flexRow}>
                    <View style={styles.flexItemFull}>
                        <ButtonOpacity
                            title="+ Keranjang"
                            type="secondary"
                            size="small"
                            onPress={addToCartOnPress}
                        />
                    </View>
                    <Gap width={8} />
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={removeItemOnPress}>
                        <IconTrashBin size={15} />
                    </TouchableOpacity>
                </View>
            </View>
        </Pressable>
    )
}

export default WishlistItem

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 85,
        height: 85,
        borderRadius: 5,
        marginRight: 10
    },
    productName: {
        fontFamily: fonts.primary[400],
        fontSize: 14,
        marginBottom: 5
    },
    flexRow: { flexDirection: 'row' },
    flexItemFull: {
        flex: 1,
        justifyContent: 'center'
    },
    removeButton: {
        width: 28,
        height: 28,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 5,
        backgroundColor: colors.textInput.enable.background,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
