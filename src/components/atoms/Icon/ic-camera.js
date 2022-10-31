import React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'
import { colors } from '../../../utils'

const IconCamera = ({ filled, size, color }) =>
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
                <Circle cx="256" cy="272" r="64"/>
                <Path d="M432 144h-59c-3 0-6.72-1.94-9.62-5l-25.94-40.94a15.52 15.52 0 00-1.37-1.85C327.11 85.76 315 80 302 80h-92c-13 0-25.11 5.76-34.07 16.21a15.52 15.52 0 00-1.37 1.85l-25.94 41c-2.22 2.42-5.34 5-8.62 5v-8a16 16 0 00-16-16h-24a16 16 0 00-16 16v8h-4a48.05 48.05 0 00-48 48V384a48.05 48.05 0 0048 48h352a48.05 48.05 0 0048-48V192a48.05 48.05 0 00-48-48zM256 368a96 96 0 1196-96 96.11 96.11 0 01-96 96z"/>
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
            strokeWidth="32"
        >
            <Path d="M350.54 148.68l-26.62-42.06C318.31 100.08 310.62 96 302 96h-92c-8.62 0-16.31 4.08-21.92 10.62l-26.62 42.06C155.85 155.23 148.62 160 140 160H80a32 32 0 00-32 32v192a32 32 0 0032 32h352a32 32 0 0032-32V192a32 32 0 00-32-32h-59c-8.65 0-16.85-4.77-22.46-11.32z" strokeLinecap="round" strokeLinejoin="round"/>
            <Circle cx="256" cy="272" r="80" strokeMiterlimit="10"/>
            <Path strokeLinecap="round" strokeLinejoin="round" d="M124 158v-22h-24v22"/>
        </Svg>
    )
}

export default IconCamera