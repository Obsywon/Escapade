import React from 'react';
import { StyleSheet } from 'react-native';
import {Text} from 'react-native-paper';
import { CustomColors } from '../themes/CustomColors';

interface MainTitleProps {
  title: string;
}

const MainTitle = ({title}: MainTitleProps) => {
  return (
    <Text variant="headlineLarge" style={styles.title}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    padding: 16,
    flex: 1,
    textAlign: 'center',
    color: CustomColors.MainTitleColor,
  },
});

export default MainTitle;
