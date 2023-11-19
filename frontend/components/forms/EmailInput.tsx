import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import ErrorText from './ErrorText';
import Validator from 'validator';

interface EmailInputProps {
  setActualEmail(value: string): void;
  errorMsg?: string;
  isValid?(valid: boolean): void;
}

const EmailInput = ({setActualEmail, isValid}: EmailInputProps) => {
  const [email, setEmail] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  function onFocusLost(): void {
    if (Validator.isEmail(email)) {
      setErrorMessage('');
      isValid && isValid(true);
      setActualEmail(email);
    } else {
      setErrorMessage('E-mail invalide.');
      isValid && isValid(false);
      setActualEmail('');
    }
  }

  /* useEffect(() => {
    if (email == null || email.length < 8) {
      console.log('Erreur e-mail');
    }
  }, [email]); */

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
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

export default EmailInput;
