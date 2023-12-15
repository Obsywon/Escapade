import React from 'react';
import {Text} from 'react-native-paper';
import { CustomColors } from '../themes/CustomColors';
import { StyleSheet } from 'react-native';

interface AppTitleProps {
  title: string;
}

const AppTitle = ({title}: AppTitleProps) => {
  return (
    <Text variant="displayLarge" style={styles.title}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    padding: 16,
    flex: 1,
    textAlign: 'center',
    color: CustomColors.AppTitleColor,
    fontWeight: 'bold',
  },
});

export default AppTitle;
