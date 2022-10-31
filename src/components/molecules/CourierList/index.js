import React, { forwardRef } from 'react'
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { BUCKET_URL, colors, fonts } from '../../../utils'
import { ImagePlaceholder } from '../../../assets'
import { Text } from '../../atoms'

const CourierList = forwardRef(({ title, data, itemOnPress }, ref) => {
    return (
        <RBSheet
            ref={ref}
            height={350}
            openDuration={250}
            closeOnDragDown={true}
            closeOnPressMask={true}
            customStyles={{ container: styles.container }}>
            <Text style={styles.title}>{title}</Text>
            <ScrollView>
                {data &&
                    data.map((item, index) => (
                        <TouchableOpacity
                            style={styles.wrapper}
                            onPress={() => itemOnPress(item)}
                            key={index}>
                            <Image
                                style={styles.image}
                                source={
                                    item.image
                                        ? { uri: `${BUCKET_URL}/${item.image}` }
                                        : ImagePlaceholder
                                }
                            />
                            <Text style={styles.label}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
        </RBSheet>
    )
})

export default CourierList

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    title: {
        fontFamily: fonts.primary[500],
        fontSize: 15,
        lineHeight: 22,
        paddingBottom: 10,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    wrapper: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    image: {
        width: 80,
        height: 20,
        marginRight: 15
    },
    label: {
        color: colors.text.label,
        fontFamily: fonts.primary[500],
        fontSize: 12
    }
})
