import React, { useState, useEffect } from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { colors, fonts } from '../../../utils'

const TopTabNavigator = ({ tabNavigator, setLabel }) => {
    const [active, setActive] = useState(tabNavigator.initialTabName)

    useEffect(() => {
        if (tabNavigator.initialName === true) {
            setActive(tabNavigator.initialTabName)
        }
    }, [tabNavigator.initialName === true ? tabNavigator : null])

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.content}>
                    {tabNavigator &&
                        tabNavigator.tabList &&
                        tabNavigator.tabList.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setActive(item.label)
                                        tabNavigator.onTabItemPress(item.id)
                                        tabNavigator.setLabel(item.label)
                                    }}
                                    key={index}
                                    style={styles.button(active, item.label)}>
                                    <Text
                                        style={styles.text(active, item.label)}>
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                </View>
            </ScrollView>
        </View>
    )
}

export default TopTabNavigator

const styles = StyleSheet.create({
    container: {
        height: 45,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: colors.border,
        borderTopColor: colors.border,
        backgroundColor: colors.white
    },
    content: { flexDirection: 'row' },
    button: (active, thisMenu) => ({
        borderBottomWidth: 3,
        borderBottomColor:
            active === thisMenu ? colors.text.menuActive : 'transparent',
        backgroundColor:
            active === thisMenu ? colors.primaryLight : 'transparent',
        paddingHorizontal: 25,
        justifyContent: 'center'
    }),
    text: (active, thisMenu) => ({
        color:
            active === thisMenu
                ? colors.text.menuActive
                : colors.text.secondary,
        fontFamily: fonts.primary[500],
        fontSize: 12,
        textAlign: 'center'
    })
})
