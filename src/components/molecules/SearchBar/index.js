import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '../../atoms'
import { HStack } from 'native-base'
import { LogoSearch } from '../../../assets'
import { colors, fonts } from '../../../utils'

const SearchBar = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <HStack style={styles.container}>
                <Image style={styles.searchIcon} source={LogoSearch} />
                <View style={styles.input}>
                    <Text style={styles.textPlaceholder}>Telusuri ...</Text>
                </View>
            </HStack>
        </TouchableOpacity>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.white,
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10
    },
    subcontainer: {
        width: '80%',
        height: 40,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black'
    },
    input: {
        width: '100%',
        justifyContent: 'center'
    },
    subinput: {
        width: '100%',
        height: 40,
        marginLeft: 10,
        justifyContent: 'center'
    },
    searchIcon: {
        width: 25,
        height: 25,
        marginRight: 5
    },
    textPlaceholder: {
        color: colors.text.secondary,
        fontFamily: fonts.primary[400],
        fontSize: 14
    }
})
