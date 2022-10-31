import React, { forwardRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Radio } from 'native-base'
import { ButtonOpacity, Gap, Input, Text } from '../../atoms'
import { colors, fonts } from '../../../utils'

const FilterByPrice = forwardRef(
    (
        {
            title,
            value,
            onChangeText,
            onSubmit,
            onBestSeller,
            onLowPrice,
            onHighPrice
        },
        ref
    ) => {
        return (
            <>
                <RBSheet
                    ref={ref}
                    height={350}
                    openDuration={350}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    customStyles={{ container: styles.container }}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.wrapper}>
                        <Text style={styles.label}>Harga</Text>
                        <View style={styles.inputWrapper}>
                            <View style={styles.input}>
                                <Input
                                    placeholder={'Rp Terendah'}
                                    value={value.min}
                                    onChangeText={val => onChangeText.min(val)}
                                    keyboardType={'numeric'}
                                />
                            </View>
                            <Gap width={10} />
                            <View style={styles.input}>
                                <Input
                                    placeholder={'Rp Tertinggi'}
                                    value={value.max}
                                    onChangeText={val => onChangeText.max(val)}
                                    keyboardType={'numeric'}
                                />
                            </View>
                        </View>
                        <Gap height={25} />
                        {/* <ButtonOpacity
                    title={'Terlaris'}
                    onPress={onBestSeller}
                />
                <Gap height={25} /> */}
                        <View style={styles.inputWrapper}>
                            <Radio.Group
                                name="myRadioGroup"
                                defaultValue=""
                                accessibilityLabel="favorite number"
                                value={value.order}
                                onChange={val => onChangeText.order(val)}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Radio value="desc" my={1}>
                                        <Text>Harga Tertinggi</Text>
                                    </Radio>
                                    <Gap width={10} />
                                    <Radio value="asc" my={1}>
                                        <Text>Harga Terendah</Text>
                                    </Radio>
                                </View>
                                <Radio value="sales" my={1}>
                                    <Text>Terlaris</Text>
                                </Radio>
                            </Radio.Group>
                        </View>
                        <Gap height={25} />
                        <ButtonOpacity
                            title={'Terapkan'}
                            onPress={() => onSubmit()}
                        />
                    </View>
                </RBSheet>
            </>
        )
    }
)

export default FilterByPrice

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
        padding: 15
    },
    label: {
        fontFamily: fonts.primary[500],
        fontSize: 14,
        lineHeight: 21,
        marginBottom: 5
    },
    inputWrapper: { flexDirection: 'row' },
    input: { flex: 1 }
})
