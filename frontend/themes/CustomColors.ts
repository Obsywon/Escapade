export type CustomColorsType = {
    inputOutline: string;
    AppTitleColor: string;
    MainTitleColor: string;
}

export type ColorSchemeType = {
    primary: string;
    secondary: string;
}

export const ColorScheme : ColorSchemeType = {
    primary: 'rgb(8, 2, 171)',
    secondary: 'rgb(28, 186, 0)',
}

export const CustomColors : CustomColorsType = {
    inputOutline: ColorScheme.primary,
    AppTitleColor: ColorScheme.primary,
    MainTitleColor: ColorScheme.secondary,
};