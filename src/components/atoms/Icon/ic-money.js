import React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'
import { colors } from '../../../utils'

const IconMoney = ({ filled, size, color }) =>
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
                <Path d="M95.5 104h320a87.73 87.73 0 0111.18.71 66 66 0 00-77.51-55.56L86 94.08h-.3a66 66 0 00-41.07 26.13A87.57 87.57 0 0195.5 104zM415.5 128h-320a64.07 64.07 0 00-64 64v192a64.07 64.07 0 0064 64h320a64.07 64.07 0 0064-64V192a64.07 64.07 0 00-64-64zM368 320a32 32 0 1132-32 32 32 0 01-32 32z"/>
                <Path d="M32 259.5V160c0-21.67 12-58 53.65-65.87C121 87.5 156 87.5 156 87.5s23 16 4 16-18.5 24.5 0 24.5 0 23.5 0 23.5L85.5 236z" />
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
            strokeLinejoin="round"
            strokeWidth="32"
        >
            <Rect x="48" y="144" width="416" height="288" rx="48" ry="48"/>
            <Path d="M411.36 144v-30A50 50 0 00352 64.9L88.64 109.85A50 50 0 0048 159v49"/>
            <Path d="M368 320a32 32 0 1132-32 32 32 0 01-32 32z" />
        </Svg>
    )
}

export default IconMoney