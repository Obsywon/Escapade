import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Control, Controller} from 'react-hook-form';
import Validator from 'validator';
import ErrorText from './ErrorText';
import { CustomColors } from '../../themes/CustomColors';

interface EmailInputProps {
  control: Control<any>;
  name: string;
}

const EmailInput = ({control, name}: EmailInputProps) => {
  const isEmailValid = (email: string): boolean => {
    return Validator.isEmail(email);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={{
          validate: {
            valid: v => isEmailValid(v) || 'E-mail invalide.',
          },
          required: true,
        }}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <>
            <TextInput
              mode="outlined"
              label="E-mail"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
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
  outline: {
    borderColor: CustomColors.inputOutline,
    borderWidth: 2,
  },
  content: {
    color: CustomColors.inputOutline,
  },
});

export default EmailInput;
