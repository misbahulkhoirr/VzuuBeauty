import React from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '../../atoms'
import { Center, HStack, VStack } from 'native-base'
import { ImagePlaceholder } from '../../../assets'
import { BUCKET_URL, colors, fonts, truncate } from '../../../utils'

const CategoryMenu = ({ data, navigation }) => {
    return (
        <>
            <VStack>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <HStack>
                        {data &&
                            data.map((item, index) => (
                                <VStack style={section.container} key={index}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate('ProductList', {
                                                id: item.id,
                                                fromPage: "Home"
                                            })
                                        }>
                                        <Center style={section.wrapperMenu}>
                                            <Image
                                                style={section.image(
                                                    item.image
                                                )}
                                                source={
                                                    item.image
                                                        ? {
                                                              uri: `${BUCKET_URL}/${item.image}`
                                                          }
                                                        : ImagePlaceholder
                                                }
                                            />
                                        </Center>

                                        <Center>
                                            <Text style={section.desc}>
                                                {truncate(item.name, 14)}
                                            </Text>
                                        </Center>
                                    </TouchableOpacity>
                                </VStack>
                            ))}
                    </HStack>
                </ScrollView>
            </VStack>
        </>
    )
}

const section = StyleSheet.create({
    container: {
        width: 50,
        marginRight: 10
    },
    wrapperMenu: {
        height: 50,
        width: 50,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        backgroundColor: '#e9eef1'
    },
    image: image => ({
        width: image ? 30 : 42,
        height: image ? 30 : 42
    }),
    desc: {
        color: colors.text.secondary,
        fontSize: 11,
        fontFamily: fonts.primary[400],
        textAlign: 'center',
        marginTop: 5
    }
})

export default CategoryMenu
