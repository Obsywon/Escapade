import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Control, Controller} from 'react-hook-form';
import Validator from 'validator';
import ErrorText from './ErrorText';

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
        }}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
          <>
            <TextInput
              mode="outlined"
              label="E-mail"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.textInput}
              error={error != null}
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
});

export default EmailInput;
