import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
    IconChevronForward,
    IconHelpBuoy,
    IconHelpCircle,
    IconHistory,
    IconKey,
    IconLogout,
    IconLove,
    IconNotification,
    IconPencil,
    IconSettings,
    IconStoreFront,
    IconMoney,
    IconCoin
} from '../Icon'
import { colors, fonts } from '../../../utils'

const SectionMenuItem = ({ icon, label, totalItem, index, onPress }) =>
{
    const Icon = () =>
    {
        if(icon === 'help-buoy')
        {
            return <IconHelpBuoy size={20} color={colors.text.menuInactive} />
        }

        if(icon === 'help-circle')
        {
            return <IconHelpCircle size={20} color={colors.text.menuInactive} />
        }

        if(icon === 'history')
        {
            return <IconHistory size={20} color={colors.text.menuInactive} />
        }

        if(icon === 'key')
        {
            return <IconKey size={20} color={colors.text.menuInactive} />
        }

        if(icon === 'logout')
        {
            return <IconLogout size={20} color={colors.text.menuInactive} />
        }

        if(icon === 'love')
        {
            return <IconLove size={20} color={colors.text.menuInactive} />
        }

        if(icon === 'notification')
        {
            return <IconNotification size={20} color={colors.text.menuInactive} />
        }

        if(icon === 'pencil')
        {
            return <IconPencil size={20} color={colors.text.menuInactive} />
        }

        if(icon === 'setting')
        {
            return <IconSettings size={20} color={colors.text.menuInactive} />
        }

        if(icon === 'store-front')
        {
            return <IconStoreFront size={20} color={colors.text.menuInactive} />
        }

        if(icon === 'money')
        {
            return <IconMoney size={20} color={colors.text.menuInactive} />
        }

        if(icon === 'coin')
        {
            return <IconCoin size={30} color={colors.text.menuInactive} />
        }

        return <IconSettings size={20} color={colors.text.menuInactive} />
    }
    
    return (
        <TouchableOpacity
            style={styles.wrapper(totalItem, index+1)}
            onPress={onPress}
        >
            <View style={styles.menuItemLeft}>
                <Icon />
                <Text style={styles.label}>{label}</Text>
            </View>
            <IconChevronForward size={15} />
        </TouchableOpacity>
    )
}

export default SectionMenuItem

const styles = StyleSheet.create({
    wrapper: (totalItem, currItem) => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderBottomWidth: totalItem !== currItem ? 1 : 0,
        borderBottomColor: colors.border
    }),
    menuItemLeft:
    {
        flexDirection: 'row',
        alignItems: 'center'
    },
    label:
    {
        color: colors.text.menuInactive,
        fontFamily: fonts.primary[400],
        marginLeft: 15
    }
})