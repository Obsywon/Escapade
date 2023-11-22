import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import ErrorText from './ErrorText';

interface PasswordInputProps {
  label?: string | undefined;
  value: string | undefined;
  setPassword(password: string): void;
  errorMsg?: string;
  isValid?(valid: boolean): void;
}

const PasswordInput = ({label, value, setPassword, isValid}: PasswordInputProps) => {
  const [isSecured, setSecured] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  function toggleSecure(): void {
    setSecured(s => !s);
  }

  function onFocusLost(): void {
    if (value != null && value.length < 8) {
      setErrorMessage('Mot de passe trop court.');
      isValid && isValid(false);
    }
    if (value == null || value.length === 0 || value.length >= 8) {
      setErrorMessage('');
      isValid && isValid(true);
    }
  }

  useEffect(() => {
    if (value == null || value.length < 8){
      console.log("Erreur password");
    }
  }, [value]);

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label={label != null ? label : 'Mot de passe'}
        value={value}
        onChangeText={setPassword}
        style={styles.textInput}
        secureTextEntry={isSecured}
        right={<TextInput.Icon icon="eye" onPress={toggleSecure} />}
        onBlur={onFocusLost}
      />
      {errorMessage.length !== 0 ? (
        <ErrorText>{errorMessage}</ErrorText>
      ) : (
        <></>
      )}
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

export default PasswordInput;
