import React from 'react';
import {GestureResponderEvent, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import { ColorScheme } from '../../themes/CustomColors';

interface BasicButtonProps {
  onPress?: (e: GestureResponderEvent) => void;
  handleLongPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  uppercase?: boolean;
  label?: string | undefined;
  color?: string;
}

const BasicButton = ({
  label = '',
  onPress,
  handleLongPress,
  disabled = false,
  loading = false,
  uppercase = false,
  color=ColorScheme.primary,
}: BasicButtonProps) => {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        disabled={disabled}
        loading={loading}
        onPress={onPress}
        onLongPress={handleLongPress}
        style={[styles.button, { backgroundColor: color }]}
        uppercase={uppercase}
        labelStyle={styles.label}
        >
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
  label: {
    fontWeight: "600",
    fontSize: 16,
  }
});

export default BasicButton;
