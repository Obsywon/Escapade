import React from 'react';
import {GestureResponderEvent, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import ErrorText from './ErrorText';
import {Control, Controller, RegisterOptions} from 'react-hook-form';
import { CustomColors } from '../../themes/CustomColors';

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
  multiline?: boolean;
  numberOfLines?: number;
}

export default function BasicTextInput ({
  control,
  name,
  label = '',
  rules,
  disabled = false,
  placeholder = '',
  clickHandler,
  showKeyboardOnTouch = true,
  multiline = false,
  numberOfLines = 3,
}: BasicTextInputProps) {
  //console.log(rules);
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
        rules={rules || undefined}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <>
            <TextInput
              mode="outlined"
              multiline={multiline}
              numberOfLines={numberOfLines}
              label={label ?? ''}
              value={value}
              disabled={disabled ?? false}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder ?? ''}
              onTouchStart={handleClick}
              showSoftInputOnFocus={showKeyboardOnTouch}
              error={error != null}
              style={styles.textInput}
              contentStyle={styles.content}
              outlineStyle={styles.outline}
              theme={{
                colors: {
                     onSurfaceVariant: CustomColors.inputOutline,
                }
            }}
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
    color: CustomColors.inputOutline,
  },
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
  },
  outline: {
    borderColor: CustomColors.inputOutline,
    borderWidth: 2,
  },
  content: {
    color: CustomColors.inputOutline,
  },
});
