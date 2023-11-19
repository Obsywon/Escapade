import React from 'react';
import {GestureResponderEvent, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

interface BasicButtonProps {
  handlePress?: (e: GestureResponderEvent) => void;
  handleLongPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  uppercase?: boolean;
  label?: string | undefined;
}

const BasicButton = ({
  label = '',
  handlePress,
  handleLongPress,
  disabled = false,
  loading = false,
  uppercase = false,
}: BasicButtonProps) => {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        disabled={disabled}
        loading={loading}
        onPress={handlePress}
        onLongPress={handleLongPress}
        style={styles.button}
        uppercase={uppercase}>
        {label}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 8,
  },
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
  },
});

export default BasicButton;
