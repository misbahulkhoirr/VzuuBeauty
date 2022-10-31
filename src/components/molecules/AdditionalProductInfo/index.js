import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { colors, fonts } from '../../../utils'
import { Gap, IconStar, Text } from '../../atoms'

const AdditionalProductInfo = ({ productSold, rating }) =>
{
    return (
        <View style={styles.container}>
            <Text style={styles.sold}>Terjual {productSold}</Text>
            <Gap width={5} />
            <Pressable style={styles.ratingSummary} onPress={rating.onPress}>
                <IconStar size={12} filled color="#FFEB3B" />
                <Text style={styles.ratingPoint}>{rating.point} ({rating.total})</Text>
            </Pressable>
        </View>
    )
}

export default AdditionalProductInfo

const styles = StyleSheet.create({
    container:
    {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sold:
    {
        fontFamily: fonts.primary[400],
        fontSize: 12
    },
    ratingSummary:
    {
        padding: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center'
    },
    ratingPoint:
    {
        fontSize: 12,
        marginLeft: 5
    }
})