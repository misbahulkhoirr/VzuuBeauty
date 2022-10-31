import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Gap, IconPencil, IconTrashBin, Text } from '../../atoms'
import { colors, fonts } from '../../../utils'

const AddressCardList = ({ defaultAddressId, data, onPress, renderItems }) =>
{   
    const [ activeOption, setActiveOption ] = useState(0)

    const updateActiveOption = (active) =>
    {
        onPress(active)
        setActiveOption(active.id)
    }

    useEffect(() => setActiveOption(defaultAddressId), [defaultAddressId])

    return (
        <>
            {data &&
                data.map((item, index) => (
                    <TouchableOpacity
                        style={styles.container(activeOption, item.id, data.length, index, item.default)}
                        key={index}
                        onPress={() => updateActiveOption(item)}
                    >
                        {renderItems(item)}
                    </TouchableOpacity>
                ))}
        </>
    )
}

const Item = ({ addressType, isMain, recipient, phone, addressDetail, editOnPress, deleteOnPress }) =>
{
    return (
        <>
            <View style={styles.content}>
                <View style={styles.labelWrapper}>
                    <Text style={styles.label}>{addressType}</Text>
                    {isMain && <Text style={styles.badge}>Utama</Text>}
                </View>
                <Gap height={5} />
                <Text style={styles.headerText}>{recipient}</Text>
                <Gap height={3} />
                <Text style={styles.text}>{phone}</Text>
                <Gap height={3} />
                <Text style={styles.text}>{addressDetail}</Text>
            </View>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={editOnPress}
                >
                    <IconPencil size={18} />
                </TouchableOpacity>
                <Gap height={10} />
                {!isMain && 
                    <TouchableOpacity
                        style={styles.button}
                        onPress={deleteOnPress}
                    >
                        <IconTrashBin size={18} />
                    </TouchableOpacity>
                }
            </View>
        </>
    )
}

AddressCardList.Item = Item
export default AddressCardList

const styles = StyleSheet.create({
    container: (active, current, totalData, currPosition, isDefault) => ({
        backgroundColor: active === current ? '#F3E1E1' : colors.white,
        borderRadius: 8,
        padding: 15,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: active === current ? colors.primary : colors.white,
        marginBottom: totalData !== currPosition ? 15 : 0
    }),
    content: { flex: 1 },
    labelWrapper:
    {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label:
    {
        fontFamily: fonts.primary[500],
        fontSize: 12
    },
    badge:
    {
        fontFamily: fonts.primary[500],
        fontSize: 11,
        backgroundColor: colors.disable,
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 3,
        marginLeft: 10
    },
    headerText:
    {
        fontFamily: fonts.primary[500],
        fontSize: 14,
        lineHeight: 21
    },
    text:
    {
        fontFamily: fonts.primary[400],
        fontSize: 12,
        lineHeight: 19
    },
    buttonWrapper:
    {
        width: 50,
        alignItems: 'flex-end',
        // borderWidth: 1
    },
    button:
    {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 5,
        backgroundColor: colors.textInput.enable.background,
        justifyContent: 'center',
        alignItems: 'center'
    }
})