import { View } from 'react-native'
import React from 'react'
import { CustomColors } from '../../themes/CustomColors';

export default function HorizontalLine() {
    return (
        <View>
            <View style={{
                borderWidth: 0.3,
                marginTop: 10,
                borderColor: CustomColors.gray
            }}></View>

        </View>
    )
}