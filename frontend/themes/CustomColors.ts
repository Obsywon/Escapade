import { ColorValue } from "react-native";

export type CustomColorsType = {
    [x: string]: any | ColorValue | undefined;
    secondary: string;
    inputOutline: string;
    AppTitleColor: string;
    MainTitleColor: string;
}

export type ColorSchemeType = {
    primary: string;
    secondary: string;
    black: string;
    gray: string;
    white: string;
    yellow: string;
    dark_gray: string;
    blue : string;
}

export const ColorScheme : ColorSchemeType = {
    primary: 'rgb(8, 2, 171)',
    secondary: 'rgb(28, 186, 0)',
    black: '#000',
    gray: '#f0f0f0',
    white: '#fff',
    yellow: '#fabd07',
    dark_gray:'#a1a09f',
    blue : 'blue',
}

export const CustomColors : CustomColorsType = {
    inputOutline: ColorScheme.primary,
    AppTitleColor: ColorScheme.primary,
    MainTitleColor: ColorScheme.secondary,
    secondary: ColorScheme.secondary,
};