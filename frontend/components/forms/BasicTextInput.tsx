import React from 'react';
import {GestureResponderEvent, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import ErrorText from './ErrorText';
import {Control, Controller, RegisterOptions} from 'react-hook-form';

interface BasicTextInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  rules?:
    | Omit<
        RegisterOptions<any, string>,
        'disabled' | 'setValueAs' | 'valueAsNumber' | 'valueAsDate'
      >
    | undefined;
  disabled?: boolean;
  placeholder?: string;
  clickHandler?(event: GestureResponderEvent): void;
  showKeyboardOnTouch?: boolean;
  isRequired?: boolean;
}

const BasicTextInput = ({
  control,
  name,
  label = '',
  rules,
  disabled = false,
  placeholder = '',
  clickHandler,
  showKeyboardOnTouch = true,
}: BasicTextInputProps) => {
  function handleClick(event: GestureResponderEvent): void {
    if (clickHandler != null) {
      clickHandler(event);
    }
  }
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={rules != null ? rules : undefined}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <>
            <TextInput
              mode="outlined"
              label={label != null ? label : ''}
              value={value}
              disabled={disabled != null ? disabled : false}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.textInput}
              placeholder={placeholder != null ? placeholder : ''}
              onTouchStart={handleClick}
              showSoftInputOnFocus={showKeyboardOnTouch}
              error={error != null}
            />
            {error && <ErrorText>{error.message}</ErrorText>}
          </>
        )}
      />
      {/*errorMsg.length !== 0 ? <ErrorText>{errorMsg}</ErrorText> : <></>*/}
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
