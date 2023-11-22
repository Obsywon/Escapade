import React from 'react';
import {GestureResponderEvent, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import ErrorText from './ErrorText';

interface BasicTextInputProps {
  value: string | undefined;
  label: string | undefined;
  setValue?(value: string): void;
  disabled?: boolean | undefined;
  placeholder?: string | undefined;
  clickHandler?(event: GestureResponderEvent): void | undefined;
  showKeyboardOnTouch?: boolean | undefined;
  errorMsg?: string;
}

const BasicTextInput = ({
  value,
  label,
  setValue,
  disabled = false,
  placeholder = '',
  clickHandler,
  showKeyboardOnTouch = true,
  errorMsg = '',
}: BasicTextInputProps) => {
  function handleClick(event: GestureResponderEvent): void {
    if (clickHandler != null) {
      clickHandler(event);
    }
  }
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
        onTouchStart={handleClick}
        showSoftInputOnFocus={showKeyboardOnTouch}
        error={errorMsg.length !== 0}
      />
      {errorMsg.length !== 0 ? <ErrorText>{errorMsg}</ErrorText> : <></>}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
  },
});

export default BasicTextInput;
