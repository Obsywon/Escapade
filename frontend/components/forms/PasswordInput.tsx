import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';

interface PasswordInputProps {
  label?: string | undefined;
  value: string | undefined;
  setPassword(password: string): void;
  isValid: boolean;
}

const PasswordInput = ({
  label,
  value,
  setPassword,
  isValid,
}: PasswordInputProps) => {
  const [isSecured, setSecured] = useState<boolean>(true);
  function toggleSecure(): void {
    setSecured(s => !s);
  }
  function setPasswordTrimmed(value: string): void {
    const result = value.trim();
    setPassword(result);
  }

  function onLostFocus(): void {
    setSecured(true);
  }

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label={label != null ? label : 'Mot de passe'}
        value={value}
        onChangeText={setPasswordTrimmed}
        style={styles.textInput}
        secureTextEntry={isSecured}
        right={<TextInput.Icon icon="eye" onPress={toggleSecure} />}
        error={isValid}
        onBlur={onLostFocus}
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

export default PasswordInput;
