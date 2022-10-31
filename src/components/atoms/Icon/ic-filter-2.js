import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors } from '../../../utils'

const IconFilter2 = ({ filled, size, color }) => {
    console.log('color', color)
    const actualSize = size ? size : '24'
    let actualColor = color ? color : colors.text.secondary
    console.log('actualColor', actualColor)
    if (filled === true) {
        actualColor = color ? color : colors.primary

        return (
            <Svg
                width={actualSize}
                height={actualSize}
                viewBox="0 0 20 20"
                fill={actualColor}>
                <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                />
            </Svg>
        )
    }

    return (
        <Svg
            width={actualSize}
            height={actualSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke={actualColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2">
            <Path
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
        </Svg>
    )
}

export default IconFilter2
