const mainColors =
{
    green1: '#0BCAD4',
    green2: '#EDFCFD',
    green3: '#5AA897',
    dark1: '#112340',
    dark2: '#495A75',
    dark3: '#8092AF',
    dark4: '#403F48',
    grey1: '#7D8797',
    grey2: '#E9E9E9',
    grey3: '#EDEEF0',
    grey4: '#B1B7C2',
    grey5: '#F2EFEB',
    grey6: '#CCCCCC',
    grey7: '#BEBEBE',
    grey8: '#DEDEDE',
    grey9: '#F9F9F9',
    grey10: '#999999',
    blue1: '#0066CB',
    black1: '#000000',
    black2: 'rgba(0, 0, 0, 0.5)',
    red1: '#E06379',
    red2: '#F44336',
    pink1: '#FF33F8',
    pink2: '#E6B0AA',
    pink3: '#FF9999',
    yellow1: '#FFE082'
}

export const colors =
{
    primary: mainColors.pink2,
    secondary: mainColors.grey2,
    tertiary: mainColors.blue1,
    white: 'white',
    black: 'black',
    disable: mainColors.grey8,
    card: mainColors.grey5,
    text:
    {
        primary: mainColors.dark1,
        secondary: mainColors.grey1,
        menuInactive: mainColors.dark2,
        menuActive: mainColors.pink2,
        subTitle: mainColors.dark3,
        placeholder: mainColors.grey7,
        label: mainColors.grey10
    },
    textInput:
    {
        enable:
        {
            background: mainColors.grey9,
            text: mainColors.dark1
        },
        disable:
        {
            background: mainColors.grey8,
            text: mainColors.grey1
        }
    },
    button:
    {
        primary:
        {
            background: mainColors.green1,
            text: 'white'
        },
        secondary:
        {
            background: 'white',
            text: mainColors.dark1
        },
        tertiary:
        {
            text: mainColors.grey6
        },
        disable:
        {
            background: mainColors.grey3,
            text: mainColors.grey4
        }
    },
    border: mainColors.grey2,
    cardLight: mainColors.green2,
    loadingBackground: mainColors.black2,
    error: mainColors.red1,
    background: mainColors.grey5,
    notifTick: mainColors.red2,
    success: mainColors.green3,
    warning: mainColors.yellow1
}