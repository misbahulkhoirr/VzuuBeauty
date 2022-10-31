import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors } from '../../../utils'

const IconSwapHorizontal = ({ filled, size, color }) =>
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
                stroke={actualColor}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
            >
                <Path d="M304 48l112 112-112 112M398.87 160H96M208 464L96 352l112-112M114 352h302"/>
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
            <Path d="M304 48l112 112-112 112M398.87 160H96M208 464L96 352l112-112M114 352h302"/>
        </Svg>
    )
}

export default IconSwapHorizontal