import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors } from '../../../utils'

const IconChevronForward = ({ filled, size, color }) =>
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="48"
            >
                <Path d="M184 112l144 144-144 144"/>
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
            strokeWidth="48"
        >
            <Path d="M184 112l144 144-144 144"/>
        </Svg>
    )
}

export default IconChevronForward