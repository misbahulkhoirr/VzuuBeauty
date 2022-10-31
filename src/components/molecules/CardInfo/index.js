import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { colors, fonts, screenWidth } from '../../../utils'
import { Gap, Text } from '../../atoms'

const CardInfo = ({ title, desc, action, data, gridData }) =>
{
    gridData && gridData.map(item => console.log(item.label))
    return (
        <View style={styles.container}>
            <View style={styles.header(desc)}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.label}>{desc}</Text>
                {action && action.onPress && (
                    <TouchableOpacity onPress={action.onPress}>
                        <Text style={styles.action('Touchable')}>
                            {action.name}
                        </Text>
                    </TouchableOpacity>
                )}
                {action && !action.onPress && action.name && (
                    <Text style={styles.action('Non-Touchable')}>
                        {action.name}
                    </Text>
                )}
            </View>

            {data && (
                <View>
                    <Text style={styles.labelBold}>{data.label}</Text>
                    <Gap height={5} />
                    <Text style={styles.label}>
                        {data.textRow1 === 'undefined (undefined)'
                            ? null
                            : data.textRow1}
                    </Text>
                    <Text style={styles.label}>{data.textRow2}</Text>
                </View>
            )}
            {gridData && (
                <View style={styles.gridContainer}>
                    {gridData &&
                        gridData.map((item, index) => (
                            <View
                                style={styles.gridItem(
                                    gridData.length,
                                    index + 1
                                )}
                                key={index}>
                                <Text style={styles.labelLight}>
                                    {item.label}
                                </Text>
                                {/* <Gap height={2} /> */}
                                <Text style={styles.label}>
                                    {item.textData}
                                </Text>
                            </View>
                        ))}
                </View>
            )}
        </View>
    )
}

export default CardInfo

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8
    },
    header: desc => ({
        flexDirection: desc ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: desc ? 'flex-start' : 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingTop: 5,
        paddingBottom: 10,
        marginBottom: 10
    }),
    title: {
        fontFamily: fonts.primary[500],
        fontSize: 14
    },
    action: type => ({
        color: type === 'Touchable' ? colors.primary : '#757575',
        fontFamily: fonts.primary[400],
        fontSize: 12
    }),
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10
    },
    label: {
        color: colors.text.label,
        fontFamily: fonts.primary[400],
        fontSize: 12,
        lineHeight: 17
    },
    labelBold: {
        fontFamily: fonts.primary[500],
        fontSize: 12,
        lineHeight: 17
    },
    labelLight: {
        color: '#bebebe',
        fontFamily: fonts.primary[400],
        fontSize: 12,
        lineHeight: 17
    },
    desc: {
        fontFamily: fonts.primary[400],
        fontSize: 12,
        lineHeight: 19
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    gridItem: (totalData, currItem) => ({
        width: (screenWidth - 60) / 2,
        marginBottom:
            currItem === totalData || currItem === totalData - 1 ? 0 : 8
    })
})
