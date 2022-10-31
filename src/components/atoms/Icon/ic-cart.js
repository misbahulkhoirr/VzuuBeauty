import React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'
import { colors } from '../../../utils'

const IconCart = ({ filled, size, color }) =>
{
    const actualSize = size ? size : '24'
    let actualColor  = color ? color : colors.text.secondary

    if(filled === true)
    {
        actualColor = color ? color : colors.primary

        return (
            <Svg
                width={actualSize}
                height={actualSize}
                viewBox="0 0 512 512"
                fill={actualColor}
            >
                <Circle cx="176" cy="416" r="32"/>
                <Circle cx="400" cy="416" r="32"/>
                <Path d="M456.8 120.78a23.92 23.92 0 00-18.56-8.78H133.89l-6.13-34.78A16 16 0 00112 64H48a16 16 0 000 32h50.58l45.66 258.78A16 16 0 00160 368h256a16 16 0 000-32H173.42l-5.64-32h241.66A24.07 24.07 0 00433 284.71l28.8-144a24 24 0 00-5-19.93z"/>
            </Svg>
        )
    }

    return (
        <Svg
            width={actualSize}
            height={actualSize}
            viewBox="0 0 512 512"
            fill="none"
            stroke={actualColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
        >
            <Circle cx="176" cy="416" r="16" />
            <Circle cx="400" cy="416" r="16" />
            <Path d="M48 80h64l48 272h256"/>
            <Path d="M160 288h249.44a8 8 0 007.85-6.43l28.8-144a8 8 0 00-7.85-9.57H128" />
        </Svg>
    )
}

export default IconCart