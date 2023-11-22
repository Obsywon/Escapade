import React from 'react';
import {Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';

interface ErrorTextProps {
  children: React.ReactElement | string;
}

const ErrorText = ({children}: ErrorTextProps) => {
  return (
    <Text variant="bodySmall" style={styles.error}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    paddingBottom: 0,
    paddingTop: 8,
  },
});

export default ErrorText;
