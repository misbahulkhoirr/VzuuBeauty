import React, { forwardRef } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import CurrencyFormat from 'react-currency-format'
import { colors, fonts } from '../../../utils'
import { Gap, Text } from '../../atoms'

const CourierTypeList = forwardRef(({ title, data, itemOnPress }, ref) =>
{
    return (
        <RBSheet
            ref={ref}
            height={350}
            openDuration={250}
            closeOnDragDown={true}
            closeOnPressMask={true}
            customStyles={{ container: styles.container }}
        >
            <Text style={styles.title}>{title}</Text>
            <ScrollView>
                {data &&
                    data.map((item, index) => (
                        <TouchableOpacity
                            style={styles.wrapper}
                            onPress={() => itemOnPress(item)}
                            key={index}
                        >
                            <View style={styles.labelWrapper}>
                                <Text style={styles.label}>{item.service}</Text>
                                <Gap width={5} />
                                <CurrencyFormat
                                    value={item.cost[0].value}
                                    displayType={'text'}
                                    thousandSeparator={'.'}
                                    decimalSeparator={','}
                                    prefix={'Rp '}
                                    renderText={value => <Text style={styles.label}>({value})</Text>}
                                />
                            </View>
                            <Text style={styles.desc}>
                                Estimasi tiba {item.cost[0].etd === '1-1' ? 1 : item.cost[0].etd} hari
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </RBSheet>
    )
})

export default CourierTypeList

const styles = StyleSheet.create({
    container:
    {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    title:
    {
        fontFamily: fonts.primary[500],
        fontSize: 15,
        lineHeight: 22,
        paddingBottom: 10,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    wrapper:
    {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    image:
    {
        width: 80,
        height: 20,
        marginRight: 15
    },
    labelWrapper:
    {
        flexDirection: 'row',
        marginBottom: 3
    },
    label:
    {
        color: colors.text.label,
        fontFamily: fonts.primary[500],
        fontSize: 12
    },
    desc:
    {
        color: colors.text.label,
        fontFamily: fonts.primary[400],
        fontSize: 12
    }
})