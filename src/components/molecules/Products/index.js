import React from 'react'
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Gap, ProductItem, Text, ButtonOpacity } from '../../atoms'
import { colors, screenWidth, fonts } from '../../../utils'
import { ILEmptyProduct } from '../../../assets'

const Products = ({
    headerComponent,
    data,
    aspectRatio,
    columns,
    columnSpacing,
    disableSpacing,
    containerPadding,
    navigation,
    paginate,
    paginateOnPress,
    hiddebutton
}) => {
    const currAspRatio = aspectRatio ? aspectRatio : 1 / 1
    const currColumns = columns ? (columns > 6 ? 6 : columns) : 2
    const currSpacing = columnSpacing ? columnSpacing : 10
    const columnWidth =
        (containerPadding ? screenWidth - containerPadding * 2 : screenWidth) /
            currColumns -
        (currSpacing - currSpacing / currColumns)

    return (
        <>
            {data && data.length > 0 ? (
                <>
                    <FlatList
                        style={{
                            padding: containerPadding ? containerPadding : 0
                        }}
                        ListHeaderComponent={headerComponent}
                        data={data}
                        renderItem={({ item, index }) => (
                            <>
                                <View
                                    style={styles.columnWrapper(
                                        columnWidth,
                                        currAspRatio,
                                        currColumns,
                                        currSpacing,
                                        disableSpacing,
                                        index
                                    )}>
                                    <ProductItem
                                        id={item.id}
                                        image={
                                            item.product_image &&
                                            item.product_image.image
                                        }
                                        name={item.name}
                                        price={item && item.price}
                                        discount={item.discount}
                                        navigation={navigation}
                                    />
                                </View>
                            </>
                        )}
                        keyExtractor={item => item.id}
                        numColumns={currColumns}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        ListFooterComponent={<Gap height={20} />}
                    />
                    {hiddebutton ? (
                        <>
                            <Gap height={10} />
                            <View style={styles.buttonLoad}>
                                <ButtonOpacity
                                    onPress={() =>
                                        paginateOnPress(paginate.page)
                                    }
                                    title={'Load More'}
                                />
                            </View>
                            <Gap height={10} />
                        </>
                    ) : null}
                </>
            ) : (
                <View style={styles.emptyCartWrapper}>
                    <ILEmptyProduct width={150} height={150} />
                    <Text style={styles.emptyCartText}>
                        Produk tidak ditemukan.
                    </Text>
                </View>
            )}
        </>
    )
}

export default Products

const styles = StyleSheet.create({
    columnWrapper: (width, aspRatio, cols, spacing, disableSpacing, index) => ({
        width: width,
        // height: undefined,
        // aspectRatio: aspRatio,
        marginRight: disableSpacing
            ? 0
            : (index + 1) % cols !== 0
            ? spacing
            : 0,
        marginBottom: disableSpacing ? 0 : spacing,
        borderWidth: 1,
        borderColor: '#f3f3f3',
        borderRadius: 8,
        backgroundColor: colors.white
    }),
    emptyCartWrapper: { alignItems: 'center', paddingTop: 50 },
    emptyCartText: {
        color: colors.text.secondary,
        fontFamily: fonts.primary[400],
        fontSize: 16,
        marginTop: 10
    },
    buttonLoad: {
        marginHorizontal: 20
    }
})
