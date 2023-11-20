import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import ErrorText from './ErrorText';

interface EmailInputProps {
  email: string;
  setEmail(value: string): void;
  errorMsg?: string;
  isValid: boolean;
}

const EmailInput = ({email, setEmail, errorMsg, isValid}: EmailInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
        error={!isValid}
      />
      {errorMsg != null && errorMsg.length !== 0 ? (
        <ErrorText>{errorMsg}</ErrorText>
      ) : null}
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
