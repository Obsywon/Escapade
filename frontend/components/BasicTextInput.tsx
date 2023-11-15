import React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';

interface BasicTextInputProps {
  value: string | undefined;
  label: string | undefined;
  setValue(password: string): void;
  disabled?: boolean | undefined;
  placeholder?: string | undefined;
}

const BasicTextInput = ({
  value,
  label,
  setValue,
  disabled = false,
  placeholder = '',
}: BasicTextInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label={label != null ? label : ''}
        value={value}
        disabled={disabled != null ? disabled : false}
        onChangeText={setValue}
        style={styles.textInput}
        placeholder={placeholder != null ? placeholder : ''}
      />
    </View>
  );
};

const styles = {
  textInput: {
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
  },
};

export default BasicTextInput;
